import { marked } from 'marked';

marked.use({
	breaks: true,
	gfm: true
});

export function renderMarkdownToHtml(markdown: string | null | undefined) {
	if (!markdown) return '';
	const html = marked.parse(markdown) as string;
	return `<div class="markdown">${html}</div>`;
}
