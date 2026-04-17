import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { MilvusDebugService } from "./milvus-debug.service";
import { MysqlDebugService } from "./mysql-debug.service";
import { UsersDebugService } from "./users-debug.service";

type CreateDebugUserPayload = {
  username: string;
  gender: string;
};

type CreateMilvusItemPayload = {
  id: string;
  title: string;
  category: string;
  summary: string;
  embedding: number[];
};

type UpdateMilvusItemPayload = Partial<CreateMilvusItemPayload>;

type SearchMilvusPayload = {
  vector?: number[];
  limit?: number;
};

@Controller("debug")
export class DebugController {
  constructor(
    private readonly mysqlDebugService: MysqlDebugService,
    private readonly usersDebugService: UsersDebugService,
    private readonly milvusDebugService: MilvusDebugService,
  ) {}

  @Get("mysql-connection")
  checkMysqlConnection() {
    return this.mysqlDebugService.checkConnection();
  }

  @Get("users")
  listUsers() {
    return this.usersDebugService.listUsers();
  }

  @Post("users")
  createUser(@Body() payload: CreateDebugUserPayload) {
    return this.usersDebugService.createUser(payload);
  }

  @Get("milvus/connection")
  checkMilvusConnection() {
    return this.milvusDebugService.checkConnection();
  }

  @Post("milvus/bootstrap")
  bootstrapMilvusCollection() {
    return this.milvusDebugService.bootstrapCollection();
  }

  @Get("milvus/items")
  listMilvusItems() {
    return this.milvusDebugService.listItems();
  }

  @Post("milvus/items")
  createMilvusItem(@Body() payload: CreateMilvusItemPayload) {
    return this.milvusDebugService.createItem(payload);
  }

  @Patch("milvus/items/:id")
  updateMilvusItem(@Param("id") id: string, @Body() payload: UpdateMilvusItemPayload) {
    return this.milvusDebugService.updateItem(id, payload);
  }

  @Delete("milvus/items/:id")
  deleteMilvusItem(@Param("id") id: string) {
    return this.milvusDebugService.deleteItem(id);
  }

  @Post("milvus/search")
  searchMilvus(@Body() payload: SearchMilvusPayload) {
    return this.milvusDebugService.search(payload);
  }
}
