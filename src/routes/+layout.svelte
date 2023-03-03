<script>
	import '../app.css';
</script>

<div class="bg-white dark:bg-black text-black dark:text-white h-screen overflow-hidden">
	<div class="w-8/12 mx-auto">
		<!-- Nav with name -->
		<div class="flex items-center justify-between p-3">
			<h1 class="text-5xl font-bold animate-slidein-left">Sagar Patil</h1>
			<div class="text-4xl flex justify-end">
				<i class="bi bi-github px-1" />
				<i class="bi bi-linkedin px-1" />
			</div>
		</div>
		<hr class="my-4 animate-[reveal-left_1s_ease-in-out_normal_forwards]" />
		<slot />
	</div>
</div>

<style>
</style>
