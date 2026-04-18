export type DemoPanel = "mysql-connection" | "user-table" | "milvus-debug" | "oss-upload";

export type ApiErrorState = {
  statusCode: number;
  message: string;
  errorCode?: string | number;
};

export type MysqlConnectionSuccess = {
  ok: boolean;
  databaseName: string | null;
  currentUser: string;
  mysqlVersion: string;
  serverTime: string;
};

export type MysqlConnectionFailure = {
  ok: false;
  message: string;
  errorCode?: string;
};

export type DemoUser = {
  username: string;
  gender: string;
};

export type DebugUsersSuccess = {
  ok: true;
  count: number;
  users: DemoUser[];
};

export type DebugUsersFailure = {
  ok: false;
  message: string;
  errorCode?: string;
};

export type MilvusDebugItem = {
  id: string;
  title: string;
  category: string;
  summary: string;
  embedding: number[];
};

export type MilvusConnectionSuccess = {
  ok: true;
  address: string;
  username: string;
  collectionName: string;
  version: string;
  healthy: boolean;
  collectionCount: number;
};

export type MilvusItemsSuccess = {
  ok: true;
  count: number;
  items: MilvusDebugItem[];
};

export type MilvusMutationSuccess = {
  ok: true;
  item: MilvusDebugItem;
};

export type MilvusBootstrapSuccess = {
  ok: true;
  collectionName: string;
  collectionCreated: boolean;
  indexCreated: boolean;
  count: number;
  items: MilvusDebugItem[];
};

export type MilvusSearchResult = {
  id: string;
  score: number;
  title?: string;
  category?: string;
  summary?: string;
};

export type MilvusSearchSuccess = {
  ok: true;
  vector: number[];
  limit: number;
  count: number;
  results: MilvusSearchResult[];
};

export type MilvusDeleteSuccess = {
  ok: true;
  id: string;
};

export type MilvusFailure = {
  ok: false;
  message: string;
  errorCode?: string | number;
};

export type OssTempSignatureData = {
  policy: string;
  signature: string;
  ossAccessKeyId: string;
  host: string;
};

export type OssTempSignatureSuccess = {
  status: number;
  message: string;
  data: OssTempSignatureData;
};

export type OssTempSignatureFailure = {
  status: number;
  message: string;
  data: null;
};

export type OssDirectUploadResult = {
  ok: true;
  key: string;
  host: string;
  directUrl: string;
  previewUrl: string;
  extension: string;
  isImage: boolean;
  statusCode: number;
};

export const DEFAULT_MILVUS_EDITOR = {
  id: "",
  title: "",
  category: "",
  summary: "",
  embedding: "0.3, 0.8, 0.2, 0.6",
};
