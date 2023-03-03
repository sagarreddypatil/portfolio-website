<script>
	import '../app.css';
</script>

<div class="bg-white dark:bg-black text-black dark:text-white h-screen overflow-hidden">
	<div class="w-8/12 mx-auto">
		<!-- Nav with name -->
		<div class="flex items-center justify-between p-3">
			<h1 class="text-6xl font-bold animate-in-left">Sagar Patil</h1>
		</div>
		<hr class="my-4 animate-open" />
		<slot />
	</div>
</div>

<style>
	@keyframes open-left {
		0% {
			width: 0;
		}
		100% {
			width: 100%;
		}
	}

	@keyframes in-left {
		0% {
			opacity: 0;
			transform: translateX(-10%);
		}
		100% {
			opacity: 1;
			transform: translateX(0);
		}
	}

	.animate-open {
		animation: open-left 0.5s ease-in-out;
	}

	.animate-in-left {
		animation: in-left 0.25s ease-in-out;
	}
</style>
