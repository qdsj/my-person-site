import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const config = {
  host:
    process.env.MILVUS_REMOTE_HOST ??
    process.env.MILVUS_HOST ??
    "106.14.161.76",
  port:
    process.env.MILVUS_REMOTE_PORT ??
    process.env.MILVUS_PORT ??
    "8999",
  username:
    process.env.MILVUS_REMOTE_USERNAME ??
    process.env.MILVUS_TEST_USERNAME ??
    "test_user",
  password:
    process.env.MILVUS_REMOTE_PASSWORD ??
    process.env.MILVUS_TEST_PASSWORD ??
    "test_user_password",
};

const address = `${config.host}:${config.port}`;

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
};

run().catch((error) => {
  console.error("Milvus remote test failed.");
  console.error(error);
  process.exit(1);
});
