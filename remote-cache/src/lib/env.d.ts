declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NX_CACHE_VERBOSE_LOGGING: boolean;
			NX_CACHE_AWS_BUCKET_NAME: string;
			NX_CACHE_AWS_REGION: string;
			NX_CACHE_AWS_ACCESS_KEY_ID: string;
			NX_CACHE_AWS_SECRET_ACCESS_KEY: string;
		}
	}
}