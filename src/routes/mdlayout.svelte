<script>
	import TopBar from '../lib/TopBar.svelte';
	export let title;
</script>

<TopBar {title} />
<slot />
