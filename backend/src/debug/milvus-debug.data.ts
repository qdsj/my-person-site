export const MILVUS_VECTOR_DIMENSION = 4;
export const MILVUS_INDEX_NAME = "embedding";
export const MILVUS_VECTOR_FIELD = "embedding";
export const MILVUS_OUTPUT_FIELDS = ["id", "title", "category", "summary"];

export type MilvusDebugItem = {
	id: string;
	title: string;
	category: string;
	summary: string;
	embedding: number[];
};

export const MOCK_MILVUS_ITEMS: MilvusDebugItem[] = [
	{
		id: "mock-project-alpha",
		title: "Project Alpha",
		category: "project",
		summary: "A mock portfolio project focused on vector search integration.",
		embedding: [0.91, 0.12, 0.44, 0.08],
	},
	{
		id: "mock-note-beta",
		title: "Knowledge Note Beta",
		category: "note",
		summary: "A mock knowledge-base note that describes semantic retrieval ideas.",
		embedding: [0.13, 0.82, 0.27, 0.64],
	},
	{
		id: "mock-profile-gamma",
		title: "Profile Gamma",
		category: "profile",
		summary: "A mock profile entry used to verify debug collection CRUD flows.",
		embedding: [0.34, 0.29, 0.88, 0.41],
	},
];

export const DEFAULT_SEARCH_VECTOR = [0.3, 0.8, 0.2, 0.6];
