import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);
	const nodeEnv = configService.get<string>("NODE_ENV") ?? process.env.NODE_ENV;
	const isLocalDevelopment = nodeEnv !== "production";

	app.enableCors({
		origin: isLocalDevelopment
			? true
			: (configService.get<string>("FRONTEND_ORIGIN") ?? false),
		credentials: true,
	});

	const port = Number(configService.get<string>("PORT") ?? "3002");
	await app.listen(port);
}

void bootstrap();
