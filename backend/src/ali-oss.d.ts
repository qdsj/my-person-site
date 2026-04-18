declare module "ali-oss" {
	type OssConstructorOptions = {
		accessKeyId: string;
		accessKeySecret: string;
		bucket: string;
		endpoint?: string;
		region?: string;
		secure?: boolean;
	};

	type OssPostSignatureResult = {
		policy: string;
		Signature: string;
		OSSAccessKeyId: string;
	};

	type OssBucketLocationResult = {
		location: string;
	};

	export default class OSS {
		options: {
			bucket: string;
		};
		constructor(options: OssConstructorOptions);
		calculatePostSignature(policy: unknown): Promise<OssPostSignatureResult>;
		getBucketLocation(): Promise<OssBucketLocationResult>;
	}
}
