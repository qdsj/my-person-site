import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const config = {
	host: normalizeHost(process.env.MILVUS_REMOTE_HOST ?? process.env.MILVUS_HOST ?? "106.14.161.76"),
	port: process.env.MILVUS_REMOTE_PORT ?? process.env.MILVUS_PORT ?? "8999",
	username: process.env.MILVUS_REMOTE_USERNAME ?? process.env.MILVUS_TEST_USERNAME ?? "test_user",
	password: process.env.MILVUS_REMOTE_PASSWORD ?? process.env.MILVUS_TEST_PASSWORD ?? "test_user_password",
};

const address = `${config.host}:${config.port}`;

function normalizeHost(value) {
	return value.replace(/^[a-z]+:\/\//i, "").replace(/\/+$/g, "");
}

const client = new MilvusClient({
	address,
	username: config.username,
	password: config.password,
});

const run = async () => {
	console.log(`Connecting to Milvus at ${address} as ${config.username}...`);

	const health = await client.checkHealth();
	const collections = await client.showCollections();

	console.log(
		JSON.stringify(
			{
				address,
				username: config.username,
				health,
				collections,
			},
			null,
			2,
		),
	);

	// 创建索引
	// client.createIndex({
	// 	collection_name: "debug_person_site_demo",
	// 	field_name: "embedding",
	// 	index_name: "embedding_index",
	// 	index_type: "IVF_FLAT",
	// });
};

run().catch((error) => {
	console.error("Milvus remote test failed.");
	console.error(error);
	process.exit(1);
});
