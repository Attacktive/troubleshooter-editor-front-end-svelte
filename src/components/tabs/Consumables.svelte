<script lang="ts">
	import { store } from "$store/store";
	import Items from "$components/tabs/Items.svelte";

	const consumables = $store.consumables;
</script>

<Items items={consumables}/>
