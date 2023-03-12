<script>
	import ProjectCard from '../lib/ProjectCard.svelte';
</script>

<div class="flex items-center justify-between p-3">
	<h1 class="text-5xl font-bold animate-slidein-left">Sagar Patil</h1>
	<div class="text-4xl flex justify-end items-center">
		<a
			href="https://github.com/sagarreddypatil"
			class="animate-[slidein-right_0.5s_ease-in-out_0.5s_normal_backwards] px-1"
		>
			<i class="bi bi-github" />
		</a>
		<a
			href="https://linkedin.com/in/patilsr"
			class="animate-[slidein-right_0.5s_ease-in-out_0.25s_normal_backwards] px-1"
		>
			<i class="bi bi-linkedin" />
		</a>
		<a
			href="https://raw.githubusercontent.com/sagarreddypatil/resume/main/resume.pdf"
			class="text-2xl ml-2 bg-black hover:bg-white text-white transition duration-300 hover:text-black py-1 px-3 rounded-none border border-black dark:border-white animate-[slidein-right_0.5s_ease-in-out_0s_normal_backwards]"
		>
			Resume
		</a>
	</div>
</div>
<hr
	class="my-2 animate-[reveal-left_1s_ease-in-out_normal_forwards] border-black dark:border-white"
/>
<div class="m-4 sm:mx-0 grid mt-6 gap-4 sm:gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
	<!-- loop from 1 to 10 and add ProjectCard -->
	{#each Array(10) as _, i}
		<ProjectCard
			title="The Coldest Sunset"
			image="https://v1.tailwindcss.com/img/card-top.jpg"
			animDelay={i * 0.05}
		/>
	{/each}
</div>
