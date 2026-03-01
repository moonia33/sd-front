// Optional plugins
import $ from 'jquery';
import _ from 'lodash';
import noUiSlider from 'nouislider';
import 'datatables.net';
import 'dropzone/dist/dropzone-min.js';
import * as VanillaCalendarPro from 'vanilla-calendar-pro';

if (typeof window !== 'undefined') {
	window._ = _;
	window.$ = $;
	window.jQuery = $;
	window.DataTable = ($ as unknown as { fn: { dataTable: unknown } }).fn.dataTable;
	window.noUiSlider = noUiSlider;
	window.VanillaCalendarPro = VanillaCalendarPro;
}

// Preline UI (docs-like globals)
import * as Preline from 'preline/non-auto';

if (typeof window !== 'undefined') {
	Object.assign(window as unknown as Record<string, unknown>, Preline);
}

// Preline plugins (explicit to avoid tree-shaking/import-order issues)
import '@preline/theme-switch';
