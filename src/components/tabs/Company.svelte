<script lang="ts">
	import type { NameValuePair, InputEventWithTarget, TrueOrFalse } from "$types/common";
	import type { Troublemaker } from "$types/company";
	import { Accordion, AccordionItem, Card, Checkbox, Input, Label, Select, Textarea } from "flowbite-svelte";
	import { store } from "$store/store";
	import { toTrueOrFalse } from "$types/common";

	type TroublemakerProperties = "Exp" | "IsNew" | "Reward";

	interface RawTroublemaker {
		Exp?: string;
		IsNew?: TrueOrFalse;
		Reward?: TrueOrFalse;
	}

	const properties = $derived.by(() => Object.entries($store.company.properties));
	const masterySets: NameValuePair<TrueOrFalse>[] = $derived.by(() => properties
		.filter(([key]) => /^MasterySetIndex\/.+/.test(key))
		.map(([key, value]) => {
			const masterySet = key.match(/^MasterySetIndex\/(.+)/)!;

			return {
				name: masterySet[1],
				value: toTrueOrFalse(value)
			};
		}));

	const rawTroublemakers = $derived.by(() => {
		const troublemakerRecords: Record<string, RawTroublemaker> = {};

		for (const [key, value] of properties) {
			const troublemaker = key.match(/^Troublemaker\/Mon_(.+)\/(.+)/);
			if (troublemaker) {
				const [_, identifier, propertyName] = troublemaker;

				if (!troublemakerRecords[identifier]) {
					troublemakerRecords[identifier] = {};
				}

				troublemakerRecords[identifier][propertyName as TroublemakerProperties] = value as TrueOrFalse;
			}
		}

		return troublemakerRecords;
	});

	const troublemakers: Troublemaker[] = $derived.by(() => Object.entries(rawTroublemakers)
		.map(([identifier, troublemakerTemp]) => {
			const { Exp, IsNew, Reward } = troublemakerTemp;

			const exp = Exp? parseInt(Exp): 0;

			const isNew = toTrueOrFalse(IsNew);
			const reward = toTrueOrFalse(Reward);

			return { name: identifier, exp, isNew, rewarded: reward };
		})
	);

	const onMasterySetChange = (masterySetName: string, event: Event) => {
		$store.company.properties[`MasterySetIndex/${masterySetName}`] = String((event as InputEventWithTarget).currentTarget.checked);
	};

	const onTroublemakerChange = (identifier: string, rawPropertyName: string, event: Event) => {
		$store.company.properties[`Troublemaker/Mon_${identifier}/${rawPropertyName}`] = String((event as InputEventWithTarget).currentTarget.checked);
	};

	const onTroublemakerExpChange = (identifier: string, event: Event) => {
		$store.company.properties[`Troublemaker/Mon_${identifier}/Exp`] = String((event as InputEventWithTarget).currentTarget.value);
	};

	const onTroublemakerIsNewChange = (identifier: string, event: Event) => {
		onTroublemakerChange(identifier, "IsNew", event);
	};

	const onTroublemakerIsRewardedChange = (identifier: string, event: Event) => {
		onTroublemakerChange(identifier, "Reward", event);
	};
</script>

<div class="my-1">
	<Label for="id">ID</Label>
	<Input type="number" id="id" value={$store.company.id} readonly/>
</div>
<div class="my-1">
	<Label for="name">Name</Label>
	<Input id="name" bind:value={$store.company.name}/>
</div>
<div class="my-1">
	<Label for="vill">Vill</Label>
	<Input type="number" id="vill" bind:value={$store.company.vill}/>
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
{#if masterySets.length > 0}
	<div class="my-1 mt-1">
		<Label>Mastery sets</Label>
		<Accordion>
			<AccordionItem>
				{#each masterySets as masterySet (masterySet)}
					<Checkbox value="true" checked={masterySet.value === "true"} onchange={event => onMasterySetChange(masterySet.name, event)}>{masterySet.name}</Checkbox>
				{/each}
			</AccordionItem>
		</Accordion>
	</div>
{/if}
{#if troublemakers.length > 0}
	<div class="my-1 mt-1">
		<Label>Troublemakers</Label>
		<Accordion>
			<AccordionItem>
				{#each troublemakers as troublemaker (troublemaker.name)}
					<Card class="my-1">
						<form>
							<h3>{troublemaker.name}</h3>
							<Label for={`${troublemaker.name}-exp`}>Exp</Label>
							<Input type="number" id={`${troublemaker.name}-exp`} step="1" value={troublemaker.exp} onchange={event => onTroublemakerExpChange(troublemaker.name, event)}/>

							<Checkbox value="true" checked={troublemaker.isNew === "true"} onchange={event => onTroublemakerIsNewChange(troublemaker.name, event)}>New?</Checkbox>
							<Checkbox value="true" checked={troublemaker.rewarded === "true"} onchange={event => onTroublemakerIsRewardedChange(troublemaker.name, event)}>Rewarded?</Checkbox>
						</form>
					</Card>
				{/each}
			</AccordionItem>
		</Accordion>
	</div>
{/if}

<Label class="mt-4">raw data</Label>
<Accordion>
	<AccordionItem>
		<Textarea value={JSON.stringify($store.company.properties, null, 2)} rows={10} readonly/>
	</AccordionItem>
</Accordion>
