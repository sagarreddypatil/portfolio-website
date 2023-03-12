<script>
	export let title;
	export let image;
	export let animDelay = 0;
</script>

<div
	class="rounded-none flex flex-col shadow-md slidein transition duration-250 hover:scale-110"
	style="animation-delay: {animDelay}s"
>
	<img
		class="flex-grow aspect-[4/3] object-cover object-center"
		src="https://v1.tailwindcss.com/img/card-top.jpg"
		alt="Sunset in the mountains"
	/>
	<div class="flex-none px-6 py-4 text-xl bg-white text-black text-center font-bold">
		The Coldest Sunset
	</div>
</div>

<style>
	.slidein {
		animation: slidein-left 0.5s ease-in-out;
		animation-fill-mode: backwards;
	}
</style>
