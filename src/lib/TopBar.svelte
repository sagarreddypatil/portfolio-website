<script>
	export let title;
</script>

<div class="flex items-center justify-between py-3">
	<h1 class="text-5xl font-bold animate-slidein-left">{title}</h1>
	<slot />
</div>
<hr
	class="my-2 animate-[reveal-left_1s_ease-in-out_normal_forwards] border-black dark:border-white"
/>
