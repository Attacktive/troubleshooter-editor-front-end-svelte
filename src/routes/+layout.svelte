<script lang="ts">
	import type { Snippet } from "svelte";
	import "$/app.css";
	import Header from "$components/Header.svelte";
	import Footer from "$components/Footer.svelte";

	interface Props {
		children?: Snippet<[void]>;
	}

	let { children }: Props = $props();
</script>

<div class="p-3">
	<Header/>
</div>
<div class="px-3 py-1">
	{#if children}
		{@render children()}
	{/if}
</div>
<div class="px-3">
	<Footer/>
</div>
