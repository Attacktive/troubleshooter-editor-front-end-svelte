<script lang="ts">
	import { Accordion, AccordionItem, Input, Label, NumberInput, Textarea } from "flowbite-svelte";
	import { store } from "../../store/store";
</script>

<Accordion>
	{#each $store.quests as quest (`quest-${quest.index}`)}
		<AccordionItem>
			<span slot="header">#{quest.index} {quest.name}</span>
			<div class="my-1">
				<Label for={`name-${quest.index}`}>Name</Label>
				<Input id={`name-${quest.index}`} bind:value={quest.name}/>
			</div>
			<div class="my-1">
				<Label for={`class-${quest.index}`}>Class</Label>
				<NumberInput id={`class-${quest.index}`} bind:value={quest.stage}/>
			</div>

			<Accordion class="my-2">
				<AccordionItem>
					<span slot="header">#{quest.index} raw data</span>
					<Textarea value={JSON.stringify(quest.properties, null, 2)} rows="5" readonly/>
				</AccordionItem>
			</Accordion>
		</AccordionItem>
	{/each}
</Accordion>
