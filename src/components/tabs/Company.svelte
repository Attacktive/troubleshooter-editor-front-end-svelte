<script lang="ts">
	import { Accordion, AccordionItem, Card, Checkbox, Input, Label, NumberInput, Select, Textarea } from "flowbite-svelte";
	import { store } from "$store/store";

	type InputEventWithTarget = Event & { currentTarget: HTMLInputElement };
	type TrueOrFalse = "true" | "false";

	interface KeyValuePair {
		name: string;
		value: TrueOrFalse;
	}

	type TroublemakerProperties = "Exp" | "IsKill" | "IsNew" | "Reward";

	interface RawTroublemaker {
		Exp?: string;
		IsNew?: TrueOrFalse;
		IsKill?: TrueOrFalse;
		Reward?: TrueOrFalse;
	}

	interface Troublemaker {
		name: string;
		exp?: number;
		isNew?: TrueOrFalse;
		/* TODO: what the heck is this? */
		isKill?: TrueOrFalse;
		rewarded?: TrueOrFalse;
	}

	let masterySets: KeyValuePair[];
	let rawTroublemakers: Record<string, RawTroublemaker>;
	let troublemakers: Troublemaker[];

	$: {
		const properties = Object.entries($store.company.properties);

		masterySets = [];
		rawTroublemakers = {};
		for (const [key, value] of properties) {
			const masterySet = key.match(/^MasterySetIndex\/(.+)/);
			if (masterySet) {
				masterySets.push({
					name: masterySet[1],
					value: value as TrueOrFalse
				});

				continue;
			}

			const troublemaker = key.match(/^Troublemaker\/Mon_(.+)\/(.+)/);
			if (troublemaker) {
				const [_, identifier, propertyName] = troublemaker;

				let troublemakerRecord = rawTroublemakers[identifier];
				if (!troublemakerRecord) {
					troublemakerRecord = {};
					rawTroublemakers[identifier] = troublemakerRecord;
				}

				troublemakerRecord[propertyName as TroublemakerProperties] = value as TrueOrFalse;
			}
		}

		masterySets = [...masterySets];
		troublemakers = Object.entries(rawTroublemakers)
			.map(([identifier, troublemakerTemp]) => {
				const exp = troublemakerTemp.Exp? parseInt(troublemakerTemp.Exp): 0;
				const isNew = String(troublemakerTemp.IsNew === "true") as TrueOrFalse;
				const isKill = String(troublemakerTemp.IsKill === "true") as TrueOrFalse;
				const reward = String(troublemakerTemp.Reward === "true") as TrueOrFalse;

				return { name: identifier, exp, isNew, isKill, rewarded: reward };
			});
	}

	const onMasterySetChange = (masterySetName: string, event: Event) => {
		$store.company.properties[`MasterySetIndex/${masterySetName}`] = String((event as InputEventWithTarget).currentTarget.checked);
	};

	const onTroublemakerChange = (identifier: string, rawPropertyName: string, event: Event) => {
		$store.company.properties[`Troublemaker/Mon_${identifier}/${rawPropertyName}`] = String((event as InputEventWithTarget).currentTarget.checked);
	};

	const onTroublemakerIsNewChange = (identifier: string, event: Event) => {
		onTroublemakerChange(identifier, "IsNew", event);
	};

	const onTroublemakerIsKillChange = (identifier: string, event: Event) => {
		onTroublemakerChange(identifier, "IsKill", event);
	};

	const onTroublemakerIsRewardedChange = (identifier: string, event: Event) => {
		onTroublemakerChange(identifier, "Reward", event);
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
{#if masterySets.length > 0}
	<div class="my-1 mt-1">
		<Label>Mastery sets</Label>
		<Accordion>
			<AccordionItem>
				{#each masterySets as masterySet (masterySet)}
					<Checkbox value="true" checked={masterySet.value === "true"} on:change={event => onMasterySetChange(masterySet.name, event)}>{masterySet.name}</Checkbox>
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
							<NumberInput id={`${troublemaker.name}-exp`} step="1" bind:value={troublemaker.exp}/>

							<Checkbox value="true" checked={troublemaker.isNew === "true"} on:change={event => onTroublemakerIsNewChange(troublemaker.name, event)}>New?</Checkbox>
							<Checkbox value="true" checked={troublemaker.isKill === "true"} on:change={event => onTroublemakerIsKillChange(troublemaker.name, event)}>Kill?</Checkbox>
							<Checkbox value="true" checked={troublemaker.rewarded === "true"} on:change={event => onTroublemakerIsRewardedChange(troublemaker.name, event)}>Rewarded?</Checkbox>
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
		<Textarea value={JSON.stringify($store.company.properties, null, 2)} rows="10" readonly/>
	</AccordionItem>
</Accordion>
