import type { JQueryStatic } from 'jquery';

type HSStaticMethodsType = typeof import('preline/non-auto').HSStaticMethods;
// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	interface Window {
		// Optional plugins
		_: unknown;
		$: JQueryStatic;
		jQuery: JQueryStatic;
		DataTable: unknown;
		Dropzone: unknown;
		VanillaCalendarPro: typeof import('vanilla-calendar-pro');
		noUiSlider: unknown;

		// Preline UI
		HSStaticMethods: HSStaticMethodsType;
	}
	namespace App {
		interface Platform {
			env: Env;
			ctx: ExecutionContext;
			caches: CacheStorage;
			cf?: IncomingRequestCfProperties;
		}

		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
	}
}

export {};
