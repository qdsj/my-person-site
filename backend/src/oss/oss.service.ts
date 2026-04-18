import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as OSS2 from "ali-oss";

@Injectable()
export class OssService {
	constructor(private readonly configService: ConfigService) {}

	async getTempSignature() {
		const config = {
			accessKeyId: this.configService.get<string>("OSS_ACCESS_KEY") ?? "",
			accessKeySecret: this.configService.get<string>("OSS_ACCESS_KEY_SECRET") ?? "",
			bucket: this.configService.get<string>("BUCKET_NAME") ?? "",
		};
		// @ts-ignore
		const client = new OSS2(config);
		const date = new Date();
		date.setSeconds(date.getSeconds() + 60);

		const policy = {
			expiration: date.toISOString(),
			conditions: [["content-length-range", 0, 1048576000], { bucket: client.options.bucket }],
		};

		const formData = await client.calculatePostSignature(policy);
		const location = await client.getBucketLocation();
		const host = `http://${config.bucket}.${location.location}.aliyuncs.com`;

		return {
			policy: formData.policy,
			signature: formData.Signature,
			ossAccessKeyId: formData.OSSAccessKeyId,
			host,
		};
	}
}
