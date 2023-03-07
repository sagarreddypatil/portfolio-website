<script>
	import ProjectCard from '../lib/ProjectCard.svelte';
</script>

<div class="flex flex-wrap justify-between">
	<!-- loop from 1 to 10 and add ProjectCard -->
	{#each Array(10) as _, i}
		<ProjectCard
			title="The Coldest Sunset"
			image="https://v1.tailwindcss.com/img/card-top.jpg"
			animDelay={i * 0.05}
		/>
	{/each}
</div>
