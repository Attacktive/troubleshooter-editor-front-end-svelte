<script lang="ts">
	import type { ItemCollection } from "$types/item";
	import type { Snippet } from "svelte";
	import { Accordion, AccordionItem, Input, Label, Select, Textarea } from "flowbite-svelte";

	interface IndexedChild {
		index: number;
	}

	interface Props {
		items: ItemCollection;
		children?: Snippet<[IndexedChild]>;
	}

	let { items, children }: Props = $props();
</script>

<div class="my-1">
	<Accordion>
		{#each items as item, index (`item-${item.id}`)}
			<AccordionItem>
				{#snippet header()}
					<span>#{item.id} {item.type}</span>
				{/snippet}
				<div class="my-1">
					<Label for={`type-${item.id}`}>Type</Label>
					<Input id={`type-${item.id}`} bind:value={item.type}/>
				</div>
				<div class="my-1">
					<Label for={`count-${item.id}`}>Count</Label>
					<Input type="number" id={`count-${item.id}`} bind:value={item.count}/>
				</div>
				<div class="my-1">
					<Label for={`status-${item.id}`}>Status</Label>
					<Select id={`status-${item.id}`} bind:value={item.status}>
						<option value="inventory">Inventory</option>
						<option value="warehouse">Warehouse</option>
						<option value="equipped">Equipped</option>
						<option value="stasis">Stasis</option>
						<option value="mailbox">Mailbox</option>
					</Select>
				</div>

				{#if children}
					{@render children({ index })}
				{/if}

				<Label class="mt-4">raw data</Label>
				<Accordion>
					<AccordionItem>
						<Textarea value={JSON.stringify(item.properties, null, 2)} rows={6} readonly/>
					</AccordionItem>
				</Accordion>
			</AccordionItem>
		{/each}
	</Accordion>
</div>
