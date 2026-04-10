import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);

	app.enableCors({
		origin: configService.get<string>("FRONTEND_ORIGIN") ?? true,
		credentials: true,
	});

	const port = Number(configService.get<string>("PORT") ?? "3002");
	await app.listen(port);
}

void bootstrap();
