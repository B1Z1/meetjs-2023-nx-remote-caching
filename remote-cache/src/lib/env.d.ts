declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NX_CACHE_VERBOSE_LOGGING: boolean;
		}
	}
}