<script lang="ts">
	import { store } from "$store/store";
	import { Accordion, AccordionItem, Input, Label, NumberInput, Select, Textarea } from "flowbite-svelte";

	const optionKeyOptions = ["Abyss", "Adventurer", "Archisage", "Ascetic", "Assassin", "Barbarian", "Bear", "Berserker", "Butcher", "Chaser", "Clown", "Collector", "Conqueror", "Crocodile", "Cyclopes", "DarkChaser", "DarkCollector", "Deathblow", "Destiny", "Elephant", "Emperor", "Ettin", "Explorer", "Extreme", "Fighter", "FlameArrow", "FlameBlade", "FlameDestroyer", "FlameFanatic", "FlameGuardian", "FlameMage", "FlameOverload", "FlameRuler", "FlameScout", "FlameSentinel", "FlameShield", "FlameSoldier", "FlameWall", "FlashArrow", "FlashBlade", "FlashDestroyer", "FlashFanatic", "FlashGuardian", "FlashMage", "FlashOverload", "FlashRuler", "FlashScout", "FlashSentinel", "FlashShield", "FlashSoldier", "FlashWall", "Fortress", "Fox", "FrostArrow", "FrostBlade", "FrostDestroyer", "FrostFanatic", "FrostGuardian", "FrostMage", "FrostOverload", "FrostRuler", "FrostScout", "FrostSentinel", "FrostShield", "FrostSoldier", "FrostWall", "Giant", "Gorilla", "Guide", "Gunman", "Hero", "HighSpeed", "Hippopotamus", "Hunter", "Infallibility", "IronWall", "King", "Knight", "Lion", "Looter", "Luck", "Lupin", "MartialArtist", "Messiah", "MeteorGuardian", "MeteorScout", "MeteorSentinel", "MeteorShield", "MeteorWall", "Miracle", "Mirage", "MistArrow", "MistBlade", "MistFanatic", "MistGuardian", "MistMage", "MistRuler", "MistScout", "MistSentinel", "MistShield", "MistSoldier", "MistWall", "Monkey", "MoonGuardian", "MoonScout", "MoonSentinel", "MoonShield", "MoonWall", "Overload", "Pioneer", "Prophet", "Scout", "Sentinel", "Sequent", "Settler", "Shadow", "Sharpshooter", "Sniper", "Soul", "SoulChaser", "SoulCollector", "SoulGuardian", "SoulGuide", "Spirit", "SpiritGuardian", "StarGuardian", "StarScout", "StarSentinel", "StarShield", "StarWall", "StormArrow", "StormBlade", "StormDestroyer", "StormFanatic", "StormGuardian", "StormMage", "StormScout", "StormSentinel", "StormShield", "StormSoldier", "StormWall", "StrangeChance", "Strategist", "Superman", "Swordman", "Swordmaster", "Thief", "Traveler", "Turtle", "TwilightChaser", "TwilightCollector", "VerdureArrow", "VerdureBlade", "VerdureFanatic", "VerdureGuardian", "VerdureMage", "VerdureRuler", "VerdureScout", "VerdureSentinel", "VerdureShield", "VerdureSoldier", "VerdureWall", "Victory", "Warrior", "Wolf", "Zenith"];
	const propertyOptions = ["Accuracy", "Armor", "AttackPower", "Block", "BluntResistance", "CriticalStrikeChance", "CriticalStrikeDeal", "Dodge", "EarthResistance", "ESPPower", "FireResistance", "IceResistance", "LightningResistance", "MaxAddSP", "MaxHP", "MaxVigor", "MoveDist", "OverchargeDuration", "PiercingResistance", "RegenVigor", "Resistance", "SightRange", "SlashingResistance", "Speed", "WaterResistance", "WindResistance"];
</script>

<datalist id="option-keys-datalist">
	{#each optionKeyOptions as optionkeyOption, index (`optionkeyOption-${index}`)}
		<option value={optionkeyOption}>{optionkeyOption}</option>
	{/each}
</datalist>
<datalist id="options-datalist">
	{#each propertyOptions as propertyOption, index (`propertyOption-${index}`)}
		<option value={propertyOption}>{propertyOption}</option>
	{/each}
</datalist>

<div class="my-1">
	<Accordion>
		{#each $store.gears as gear (`gear-${gear.id}`)}
			<AccordionItem>
				<svelte:fragment slot="header">
					<span>#{gear.id} {gear.type}</span>
				</svelte:fragment>
				<div class="my-1">
					<Label for={`type-${gear.id}`}>Type</Label>
					<Input id={`type-${gear.id}`} bind:value={gear.type}/>
				</div>
				<div class="my-1">
					<Label for={`count-${gear.id}`}>Count</Label>
					<NumberInput id={`count-${gear.id}`} bind:value={gear.count}/>
				</div>
				<div class="my-1">
					<Label for={`status-${gear.id}`}>Status</Label>
					<Select id={`status-${gear.id}`} bind:value={gear.status}>
						<option value="inventory">Inventory</option>
						<option value="warehouse">Warehouse</option>
						<option value="equipped">Equipped</option>
						<option value="stasis">Stasis</option>
						<option value="mailbox">Mailbox</option>
					</Select>
				</div>

				<div class="my-1">
					<Label for={`option-ratio-${gear.id}`}>Option Ratio</Label>
					<Input id={`option-ratio-${gear.id}`} bind:value={gear.properties["Option/Ratio"]}/>
				</div>0
				<div class="my-1">
					<Label for={`option-key-${gear.id}`}>Option Key</Label>
					<Input id={`option-key-${gear.id}`} list="option-keys-datalist" bind:value={gear.properties["Option/OptionKey"]}/>
				</div>

				{#each [1, 2, 3, 4, 5] as ordinal (`item-${gear.id}-property-${ordinal}`)}
					<div class="my-1">
						<Label for={`property-${gear.id}-${ordinal}`}>Property {ordinal}</Label>
						<Input id={`property-${gear.id}-${ordinal}`} list="options-datalist" bind:value={gear.properties[`Option/Type${ordinal}`]}/>
						<Input bind:value={gear.properties[`Option/Value${ordinal}`]}/>
					</div>
				{/each}

				<Label class="mt-4">raw data</Label>
				<Accordion>
					<AccordionItem>
						<Textarea value={JSON.stringify(gear.properties, null, 2)} rows={6} readonly/>
					</AccordionItem>
				</Accordion>
			</AccordionItem>
		{/each}
	</Accordion>
</div>
