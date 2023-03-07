<script>
	export let title;
	export let image;
	export let animDelay = 0;
</script>

<div
	class="m-1 rounded-none overflow-hidden shadow-md dark:shadow-inner slidein my-4"
	style="animation-delay: {animDelay}s"
>
	<img
		class="w-full"
		src="https://v1.tailwindcss.com/img/card-top.jpg"
		alt="Sunset in the mountains"
	/>
	<div
		class="px-6 py-4 text-xl bg-black dark:bg-white text-white dark:text-black text-center font-bold"
	>
		The Coldest Sunset
	</div>
</div>

<style>
	.slidein {
		animation: slidein-left 0.5s ease-in-out;
		animation-fill-mode: backwards;
	}
</style>
