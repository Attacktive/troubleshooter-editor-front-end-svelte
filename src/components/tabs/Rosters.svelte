<script lang="ts">
	import { Accordion, AccordionItem, Input, Label, Textarea } from "flowbite-svelte";
	import { store } from "$store/store";
</script>

<Accordion>
	{#each $store.rosters as roster (`roster-${roster.id}`)}
		<AccordionItem>
			{#snippet header()}
				<span>#{roster.id} {roster.name}</span>
			{/snippet}
			<div class="my-1">
				<Label for={`name-${roster.id}`}>Name</Label>
				<Input id={`name-${roster.id}`} bind:value={roster.name}/>
			</div>
			<div class="my-1">
				<Label for={`class-${roster.id}`}>Class</Label>
				<Input id={`class-${roster.id}`} bind:value={roster.class}/>
			</div>
			<div class="my-1">
				<Label for={`level-${roster.id}`}>Level</Label>
				<Input type="number" id={`level-${roster.id}`} bind:value={roster.level}/>
			</div>
			<div class="my-1">
				<Label for={`exp-${roster.id}`}>Exp</Label>
				<Input type="number" id={`exp-${roster.id}`} bind:value={roster.exp}/>
			</div>

			<Label class="mt-4">raw data</Label>
			<Accordion>
				<AccordionItem>
					<Textarea value={JSON.stringify(roster.properties, null, 2)} rows={6} readonly/>
				</AccordionItem>
			</Accordion>
		</AccordionItem>
	{/each}
</Accordion>
