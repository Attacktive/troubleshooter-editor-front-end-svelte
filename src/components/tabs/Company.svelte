<script lang="ts">
	import { Accordion, AccordionItem, Input, Label, NumberInput, Select, Textarea } from "flowbite-svelte";
	import { store } from "$store/store";

	type SelectEventWithTarget = Event & { currentTarget: HTMLSelectElement };
	type TrueOrFalse = "true" | "false";

	interface KeyValuePair {
		name: string;
		value: TrueOrFalse;
	}

	let masterySets: KeyValuePair[];
	$: masterySets = Object.entries($store.company.properties)
		.map(([key, value]): KeyValuePair | undefined => {
			const matched = key.match(/^MasterySetIndex\/(.+)/);
			if (!matched) {
				return undefined;
			}

			return {
				name: matched[1],
				value: value as TrueOrFalse
			};
		})
		.filter(keyValuePair => keyValuePair) as KeyValuePair[];

	const onMasterySetChange = (event: Event, masterySetName: string) => {
		$store.company.properties[`MasterySetIndex/${masterySetName}`] = (event as SelectEventWithTarget).currentTarget.value;
	};
</script>

<div class="my-1">
	<Label for="id">ID</Label>
	<NumberInput id="id" value={$store.company.id} readonly/>
</div>
<div class="my-1">
	<Label for="name">Name</Label>
	<Input id="name" bind:value={$store.company.name}/>
</div>
<div class="my-1">
	<Label for="vill">Vill</Label>
	<NumberInput id="vill" bind:value={$store.company.vill}/>
</div>
<div class="my-1">
	<Label for="difficulty">Difficulty</Label>
	<Select bind:value={$store.company.properties.GameDifficulty}>
		<option value="Story">Story</option>
		<option value="Safty">Safety</option>
		<option value="Easy">Easy</option>
		<option value="Normal">Normal</option>
		<option value="Hard">Hard</option>
		<option value="Merciless">Cruel</option>
	</Select>
</div>
<div class="my-1 mt-1">
	{#if masterySets.length > 0}
		<Label>Mastery sets</Label>
		<Accordion>
			<AccordionItem>
				{#each masterySets as masterySet (masterySet)}
					<Label for={`masterySet-${masterySet.name}`}>{masterySet.name}</Label>
					<Select id={`masterySet-${masterySet.name}`} bind:value={masterySet.value} on:input={event => onMasterySetChange(event, masterySet.name)}>
						<option value="true">true</option>
						<option value="false">false</option>
					</Select>
				{/each}
			</AccordionItem>
		</Accordion>
	{/if}
</div>

<Accordion class="my-2">
	<AccordionItem>
		<span slot="header">raw data</span>
		<Textarea value={JSON.stringify($store.company.properties, null, 2)} rows="10" readonly/>
	</AccordionItem>
</Accordion>
