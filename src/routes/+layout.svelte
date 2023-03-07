<script>
	import '../app.css';
</script>

<div class="h-screen">
	<div class="w-8/12 mx-auto">
		<!-- Nav with name -->
		<div class="flex items-center justify-between p-3">
			<h1 class="text-5xl font-bold animate-slidein-left">Sagar Patil</h1>
			<div class="text-4xl flex justify-end items-center">
				<i
					class="bi bi-github px-1 animate-[slidein-right_0.5s_ease-in-out_0.5s_normal_backwards]"
				/>
				<i
					class="bi bi-linkedin px-1 animate-[slidein-right_0.5s_ease-in-out_0.25s_normal_backwards]"
				/>
				<a
					href="https://raw.githubusercontent.com/sagarreddypatil/resume/main/resume.pdf"
					class="text-2xl ml-2 bg-black hover:bg-white text-white hover:text-black px-2 py-1 px-3 rounded-none border border-white animate-[slidein-right_0.5s_ease-in-out_0s_normal_backwards]"
				>
					Resume
				</a>
			</div>
		</div>
		<hr
			class="my-2 animate-[reveal-left_1s_ease-in-out_normal_forwards] border-black dark:border-white"
		/>
		<slot />
	</div>
</div>

<style>
</style>
