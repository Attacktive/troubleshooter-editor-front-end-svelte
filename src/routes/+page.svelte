<script lang="ts">
	import { Button, ButtonGroup, Fileupload, Spinner, TabItem, Tabs, Textarea } from "flowbite-svelte";

	$: toShowSpinner = false;
	$: fileIsSelected = true;
	$: fileIsUploaded = false;
	$: debuggingOutput = "";
</script>

{#if toShowSpinner}
	<Spinner color="red" size="20"/>
{/if}

<div class="grid grid-cols-12 mt-2">
	<Fileupload accept={".sav,.bak"} class="col-span-3"/>
	<ButtonGroup class="flex justify-around col-span-6">
		<Button disabled={!fileIsSelected}>Upload</Button>
		<Button disabled={!fileIsSelected || !fileIsUploaded}>Save</Button>
		<Button disabled={!fileIsSelected || !fileIsUploaded}>Quick Cheats!</Button>
	</ButtonGroup>
</div>
<div class="mt-4">
	<Tabs>
		<TabItem title="Company" open>

		</TabItem>
		<TabItem title="Items"></TabItem>
		<TabItem title="Rosters"></TabItem>
		<TabItem title="Quests"></TabItem>
	</Tabs>
</div>
<div class="mt-4">
	<Textarea value={debuggingOutput} rows="6" readonly/>
</div>
