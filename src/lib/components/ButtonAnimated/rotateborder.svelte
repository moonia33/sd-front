<button
	class="group relative grid overflow-hidden rounded-xl px-4 py-2 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200"
>
	<span>
		<span
			class="spark mask-gradient animate-flip before:animate-kitrotate absolute inset-0 h-[100%] w-[100%] overflow-hidden rounded-xl [mask:linear-gradient(white,_transparent_50%)] before:absolute before:[inset:0_auto_auto_50%] before:aspect-square before:w-[200%] before:[translate:-50%_-15%] before:rotate-[-90deg] before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-['']"
		></span>
	</span>
	<span
		class="backdrop absolute inset-px rounded-[11px] bg-neutral-950 transition-colors duration-200 group-hover:bg-neutral-900"
	></span>
	<span class="z-10 text-sm font-medium text-neutral-400">
		<slot>Button</slot>
	</span>
</button>
