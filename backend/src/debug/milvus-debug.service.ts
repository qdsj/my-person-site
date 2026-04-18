import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
	ServiceUnavailableException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DataType, MilvusClient, type ResStatus } from "@zilliz/milvus2-sdk-node";
import {
	DEFAULT_SEARCH_VECTOR,
	MILVUS_INDEX_NAME,
	MILVUS_OUTPUT_FIELDS,
	MILVUS_VECTOR_DIMENSION,
	MILVUS_VECTOR_FIELD,
	MOCK_MILVUS_ITEMS,
	type MilvusDebugItem,
} from "./milvus-debug.data";

type CreateMilvusItemInput = {
	id: string;
	title: string;
	category: string;
	summary: string;
	embedding: number[];
};

type UpdateMilvusItemInput = Partial<CreateMilvusItemInput>;

type SearchMilvusInput = {
	vector?: number[];
	limit?: number;
};

type MilvusConfig = {
	address: string;
	username: string;
	password: string;
	collectionName: string;
};

@Injectable()
export class MilvusDebugService {
	constructor(private readonly configService: ConfigService) {}

	async checkConnection() {
		return this.withMilvusClient(async (client, config) => {
			const [versionResult, healthResult, collectionsResult] = await Promise.all([
				client.getVersion(),
				client.checkHealth(),
				client.showCollections(),
			]);

			this.assertMilvusStatus(collectionsResult.status, "Failed to list Milvus collections.");

			return {
				ok: true,
				address: config.address,
				username: config.username,
				collectionName: config.collectionName,
				version: versionResult.version,
				healthy: healthResult.isHealthy,
				collectionCount: collectionsResult.data.length,
			};
		});
	}

	async bootstrapCollection() {
		return this.withMilvusClient(async (client, config) => {
			const collectionCreated = await this.ensureMilvusCollection(client, config.collectionName);
			const indexCreated = await this.ensureMilvusIndex(client, config.collectionName);

			await this.loadMilvusCollection(client, config.collectionName);

			const mutation = await client.upsert({
				collection_name: config.collectionName,
				data: MOCK_MILVUS_ITEMS,
			});

			this.assertMilvusStatus(mutation, "Failed to bootstrap Milvus mock data.");
			await this.flushMilvusCollection(client, config.collectionName);

			return {
				ok: true,
				collectionName: config.collectionName,
				collectionCreated,
				indexCreated,
				count: MOCK_MILVUS_ITEMS.length,
				items: MOCK_MILVUS_ITEMS,
			};
		});
	}

	async listItems() {
		return this.withMilvusClient(async (client, config) => {
			await this.loadMilvusCollection(client, config.collectionName);
			const items = await this.queryMilvusItems(client, config.collectionName);

			return {
				ok: true,
				count: items.length,
				items,
			};
		});
	}

	async createItem(input: CreateMilvusItemInput) {
		const item = this.normalizeMilvusItemInput(input);

		return this.withMilvusClient(async (client, config) => {
			await this.loadMilvusCollection(client, config.collectionName);

			const existing = await this.getMilvusItemById(client, config.collectionName, item.id);
			if (existing) {
				throw new ConflictException({
					ok: false,
					message: `Milvus item ${item.id} already exists.`,
					errorCode: "MILVUS_DUPLICATE_ID",
				});
			}

			const mutation = await client.insert({
				collection_name: config.collectionName,
				data: [item],
			});

			this.assertMilvusStatus(mutation, "Failed to create Milvus item.");
			await this.flushMilvusCollection(client, config.collectionName);

			return {
				ok: true,
				item,
			};
		});
	}

	async updateItem(id: string, input: UpdateMilvusItemInput) {
		const targetId = id.trim();
		if (!targetId) {
			throw new BadRequestException({
				ok: false,
				message: "Milvus item id is required.",
			});
		}

		return this.withMilvusClient(async (client, config) => {
			await this.loadMilvusCollection(client, config.collectionName);
			const existing = await this.getMilvusItemById(client, config.collectionName, targetId);

			if (!existing) {
				throw new NotFoundException({
					ok: false,
					message: `Milvus item ${targetId} was not found.`,
					errorCode: "MILVUS_ITEM_NOT_FOUND",
				});
			}

			const item = this.normalizeMilvusItemInput(
				{
					id: targetId,
					title: input.title ?? existing.title,
					category: input.category ?? existing.category,
					summary: input.summary ?? existing.summary,
					embedding: input.embedding ?? existing.embedding,
				},
				{
					id: targetId,
				},
			);

			const mutation = await client.upsert({
				collection_name: config.collectionName,
				data: [item],
			});

			this.assertMilvusStatus(mutation, "Failed to update Milvus item.");
			await this.flushMilvusCollection(client, config.collectionName);

			return {
				ok: true,
				item,
			};
		});
	}

	async deleteItem(id: string) {
		const targetId = id.trim();
		if (!targetId) {
			throw new BadRequestException({
				ok: false,
				message: "Milvus item id is required.",
			});
		}

		return this.withMilvusClient(async (client, config) => {
			await this.loadMilvusCollection(client, config.collectionName);
			const existing = await this.getMilvusItemById(client, config.collectionName, targetId);

			if (!existing) {
				throw new NotFoundException({
					ok: false,
					message: `Milvus item ${targetId} was not found.`,
					errorCode: "MILVUS_ITEM_NOT_FOUND",
				});
			}

			const mutation = await client.delete({
				collection_name: config.collectionName,
				ids: [targetId],
			});

			this.assertMilvusStatus(mutation, "Failed to delete Milvus item.");
			await this.flushMilvusCollection(client, config.collectionName);

			return {
				ok: true,
				id: targetId,
			};
		});
	}

	async search(input: SearchMilvusInput) {
		const vector = this.normalizeEmbedding(input.vector ?? DEFAULT_SEARCH_VECTOR);
		const limit = this.normalizeLimit(input.limit);

		return this.withMilvusClient(async (client, config) => {
			await this.loadMilvusCollection(client, config.collectionName);
			const result = await client.search({
				collection_name: config.collectionName,
				anns_field: MILVUS_VECTOR_FIELD,
				data: vector,
				limit,
				metric_type: "L2",
				params: {
					nprobe: 10,
				},
				output_fields: MILVUS_OUTPUT_FIELDS,
			});

			this.assertMilvusStatus(result.status, "Failed to search Milvus items.");

			return {
				ok: true,
				vector,
				limit,
				count: Array.isArray(result.results) ? result.results.length : 0,
				results: result.results,
			};
		});
	}

	private getMilvusConfig(): MilvusConfig {
		const host = this.normalizeMilvusHost(this.configService.get<string>("MILVUS_HOST") ?? "127.0.0.1");
		const port = Number(this.configService.get<string>("MILVUS_PORT") ?? "8999");
		const username = this.configService.get<string>("MILVUS_TEST_USERNAME") ?? "test_user";
		const password = this.configService.get<string>("MILVUS_TEST_PASSWORD") ?? "test_user_password";
		const collectionName = this.configService.get<string>("MILVUS_DEBUG_COLLECTION") ?? "debug_person_site_demo";

		if (!Number.isFinite(port) || port <= 0) {
			throw new ServiceUnavailableException({
				ok: false,
				message: "MILVUS_PORT is invalid.",
				errorCode: "MILVUS_INVALID_PORT",
			});
		}

		if (!username || !password) {
			throw new ServiceUnavailableException({
				ok: false,
				message: "Milvus credentials are missing.",
				errorCode: "MILVUS_MISSING_CREDENTIALS",
			});
		}

		return {
			address: `${host}:${port}`,
			username,
			password,
			collectionName,
		};
	}

	private normalizeMilvusHost(value: string) {
		const normalized = value.replace(/^[a-z]+:\/\//i, "").replace(/\/+$/g, "");

		if (!normalized) {
			throw new ServiceUnavailableException({
				ok: false,
				message: "MILVUS_HOST is invalid.",
				errorCode: "MILVUS_INVALID_HOST",
			});
		}

		return normalized;
	}

	private async withMilvusClient<T>(callback: (client: MilvusClient, config: MilvusConfig) => Promise<T>) {
		const config = this.getMilvusConfig();
		const client = new MilvusClient({
			address: config.address,
			username: config.username,
			password: config.password,
		});

		try {
			return await callback(client, config);
		} catch (error) {
			if (
				error instanceof BadRequestException ||
				error instanceof ConflictException ||
				error instanceof NotFoundException ||
				error instanceof ServiceUnavailableException
			) {
				throw error;
			}

			const message = error instanceof Error ? error.message : "Milvus request failed.";
			throw new ServiceUnavailableException({
				ok: false,
				message,
				errorCode: "MILVUS_REQUEST_FAILED",
			});
		} finally {
			await client.closeConnection().catch(() => undefined);
		}
	}

	private async ensureMilvusCollection(client: MilvusClient, collectionName: string) {
		const hasCollection = await client.hasCollection({
			collection_name: collectionName,
		});

		this.assertMilvusStatus(hasCollection.status, "Failed to inspect Milvus collection.");

		if (hasCollection.value) {
			return false;
		}

		const createCollection = await client.createCollection({
			collection_name: collectionName,
			description: "Debug-only collection for Milvus integration checks.",
			fields: [
				{
					name: "id",
					data_type: DataType.VarChar,
					is_primary_key: true,
					max_length: 128,
				},
				{
					name: "title",
					data_type: DataType.VarChar,
					max_length: 256,
				},
				{
					name: "category",
					data_type: DataType.VarChar,
					max_length: 128,
				},
				{
					name: "summary",
					data_type: DataType.VarChar,
					max_length: 1024,
				},
				{
					name: MILVUS_VECTOR_FIELD,
					data_type: DataType.FloatVector,
					dim: MILVUS_VECTOR_DIMENSION,
				},
			],
		});

		this.assertMilvusStatus(createCollection, "Failed to create Milvus collection.");
		return true;
	}

	private async ensureMilvusIndex(client: MilvusClient, collectionName: string) {
		const indexList = await client.listIndexes({
			collection_name: collectionName,
		});

		this.assertMilvusStatus(indexList.status, "Failed to inspect Milvus indexes.");

		console.log("Existing Milvus indexes:", indexList.indexes);

		if (indexList.indexes.includes(MILVUS_INDEX_NAME)) {
			return false;
		}

		const createIndex = await client.createIndex({
			collection_name: collectionName,
			field_name: MILVUS_VECTOR_FIELD,
			index_name: MILVUS_INDEX_NAME,
			index_type: "AUTOINDEX",
			metric_type: "L2",
		});

		this.assertMilvusStatus(createIndex, "Failed to create Milvus index.");
		return true;
	}

	private async loadMilvusCollection(client: MilvusClient, collectionName: string) {
		await this.ensureMilvusCollection(client, collectionName);
		await this.ensureMilvusIndex(client, collectionName);

		const result = await client.loadCollection({
			collection_name: collectionName,
		});

		this.assertMilvusStatus(result, "Failed to load Milvus collection.");
	}

	private async flushMilvusCollection(client: MilvusClient, collectionName: string) {
		const result = await client.flushSync({
			collection_names: [collectionName],
		});

		this.assertMilvusStatus(result.status, "Failed to flush Milvus collection.");
	}

	private async queryMilvusItems(client: MilvusClient, collectionName: string) {
		const result = await client.query({
			collection_name: collectionName,
			filter: 'id != ""',
			limit: 200,
			output_fields: [...MILVUS_OUTPUT_FIELDS, MILVUS_VECTOR_FIELD],
		});

		this.assertMilvusStatus(result.status, "Failed to query Milvus items.");

		return result.data
			.map((row) => this.toMilvusDebugItem(row))
			.sort((left, right) => left.id.localeCompare(right.id));
	}

	private async getMilvusItemById(client: MilvusClient, collectionName: string, id: string) {
		const result = await client.get({
			collection_name: collectionName,
			ids: [id],
			output_fields: [...MILVUS_OUTPUT_FIELDS, MILVUS_VECTOR_FIELD],
		});

		this.assertMilvusStatus(result.status, "Failed to read Milvus item.");

		const [row] = result.data;
		return row ? this.toMilvusDebugItem(row) : null;
	}

	private toMilvusDebugItem(row: Record<string, unknown>): MilvusDebugItem {
		return {
			id: this.normalizeStringField(row.id, "id"),
			title: this.normalizeStringField(row.title, "title"),
			category: this.normalizeStringField(row.category, "category"),
			summary: this.normalizeStringField(row.summary, "summary"),
			embedding: this.normalizeEmbedding(row.embedding),
		};
	}

	private normalizeMilvusItemInput(
		input: CreateMilvusItemInput,
		defaults?: Partial<CreateMilvusItemInput>,
	): MilvusDebugItem {
		const item = {
			id: (input.id ?? defaults?.id ?? "").trim(),
			title: (input.title ?? defaults?.title ?? "").trim(),
			category: (input.category ?? defaults?.category ?? "").trim(),
			summary: (input.summary ?? defaults?.summary ?? "").trim(),
			embedding: input.embedding ?? defaults?.embedding ?? [],
		};

		if (!item.id || !item.title || !item.category || !item.summary) {
			throw new BadRequestException({
				ok: false,
				message: "Milvus item requires id, title, category, summary, and embedding.",
				errorCode: "MILVUS_INVALID_ITEM",
			});
		}

		return {
			...item,
			embedding: this.normalizeEmbedding(item.embedding),
		};
	}

	private normalizeStringField(value: unknown, fieldName: string) {
		if (typeof value !== "string") {
			throw new ServiceUnavailableException({
				ok: false,
				message: `Milvus field ${fieldName} is missing.`,
				errorCode: "MILVUS_INVALID_FIELD",
			});
		}

		return value;
	}

	private normalizeEmbedding(value: unknown) {
		if (!Array.isArray(value) || value.length !== MILVUS_VECTOR_DIMENSION) {
			throw new BadRequestException({
				ok: false,
				message: `Milvus embedding must contain ${MILVUS_VECTOR_DIMENSION} numbers.`,
				errorCode: "MILVUS_INVALID_EMBEDDING",
			});
		}

		const embedding = value.map((entry) => Number(entry));
		if (embedding.some((entry) => Number.isNaN(entry))) {
			throw new BadRequestException({
				ok: false,
				message: "Milvus embedding must be numeric.",
				errorCode: "MILVUS_INVALID_EMBEDDING",
			});
		}

		return embedding;
	}

	private normalizeLimit(value: unknown) {
		if (value === undefined) {
			return 3;
		}

		const limit = Number(value);
		if (!Number.isFinite(limit) || limit <= 0 || limit > 10) {
			throw new BadRequestException({
				ok: false,
				message: "Milvus search limit must be between 1 and 10.",
				errorCode: "MILVUS_INVALID_LIMIT",
			});
		}

		return Math.floor(limit);
	}

	private assertMilvusStatus(status: ResStatus | { status: ResStatus }, fallbackMessage: string) {
		const resolvedStatus = "status" in status ? status.status : status;
		const errorCode = resolvedStatus.error_code;

		if (errorCode === 0 || errorCode === "0" || errorCode === "Success") {
			return;
		}

		throw new ServiceUnavailableException({
			ok: false,
			message: resolvedStatus.reason || fallbackMessage,
			errorCode: typeof errorCode === "string" || typeof errorCode === "number" ? errorCode : undefined,
		});
	}
}
