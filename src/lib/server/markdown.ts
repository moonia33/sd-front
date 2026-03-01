import { marked } from 'marked';

const UL_CLASS =
	'marker:text-gray-900 list-disc ps-5 space-y-4 pt-3 text-gray-900 dark:text-neutral-200';

marked.use({
	breaks: true,
	gfm: true
});

export function renderMarkdownToHtml(markdown: string | null | undefined) {
	if (!markdown) return '';
	const html = marked.parse(markdown) as string;
	return html.replace(/<ul>/g, `<ul class="${UL_CLASS}">`);
}
