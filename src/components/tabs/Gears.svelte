<script lang="ts">
	import { store } from "$store/store";
	import { Input, Label } from "flowbite-svelte";
	import Items from "$components/tabs/Items.svelte";

	const optionKeyOptions = ["Abyss", "Adventurer", "Archisage", "Ascetic", "Assassin", "Barbarian", "Bear", "Berserker", "Butcher", "Chaser", "Clown", "Collector", "Conqueror", "Crocodile", "Cyclopes", "DarkChaser", "DarkCollector", "Deathblow", "Destiny", "Elephant", "Emperor", "Ettin", "Explorer", "Extreme", "Fighter", "FlameArrow", "FlameBlade", "FlameDestroyer", "FlameFanatic", "FlameGuardian", "FlameMage", "FlameOverload", "FlameRuler", "FlameScout", "FlameSentinel", "FlameShield", "FlameSoldier", "FlameWall", "FlashArrow", "FlashBlade", "FlashDestroyer", "FlashFanatic", "FlashGuardian", "FlashMage", "FlashOverload", "FlashRuler", "FlashScout", "FlashSentinel", "FlashShield", "FlashSoldier", "FlashWall", "Fortress", "Fox", "FrostArrow", "FrostBlade", "FrostDestroyer", "FrostFanatic", "FrostGuardian", "FrostMage", "FrostOverload", "FrostRuler", "FrostScout", "FrostSentinel", "FrostShield", "FrostSoldier", "FrostWall", "Giant", "Gorilla", "Guide", "Gunman", "Hero", "HighSpeed", "Hippopotamus", "Hunter", "Infallibility", "IronWall", "King", "Knight", "Lion", "Looter", "Luck", "Lupin", "MartialArtist", "Messiah", "MeteorGuardian", "MeteorScout", "MeteorSentinel", "MeteorShield", "MeteorWall", "Miracle", "Mirage", "MistArrow", "MistBlade", "MistFanatic", "MistGuardian", "MistMage", "MistRuler", "MistScout", "MistSentinel", "MistShield", "MistSoldier", "MistWall", "Monkey", "MoonGuardian", "MoonScout", "MoonSentinel", "MoonShield", "MoonWall", "Overload", "Pioneer", "Prophet", "Scout", "Sentinel", "Sequent", "Settler", "Shadow", "Sharpshooter", "Sniper", "Soul", "SoulChaser", "SoulCollector", "SoulGuardian", "SoulGuide", "Spirit", "SpiritGuardian", "StarGuardian", "StarScout", "StarSentinel", "StarShield", "StarWall", "StormArrow", "StormBlade", "StormDestroyer", "StormFanatic", "StormGuardian", "StormMage", "StormScout", "StormSentinel", "StormShield", "StormSoldier", "StormWall", "StrangeChance", "Strategist", "Superman", "Swordman", "Swordmaster", "Thief", "Traveler", "Turtle", "TwilightChaser", "TwilightCollector", "VerdureArrow", "VerdureBlade", "VerdureFanatic", "VerdureGuardian", "VerdureMage", "VerdureRuler", "VerdureScout", "VerdureSentinel", "VerdureShield", "VerdureSoldier", "VerdureWall", "Victory", "Warrior", "Wolf", "Zenith"];
	const propertyOptions = ["Accuracy", "Armor", "AttackPower", "Block", "BluntResistance", "CriticalStrikeChance", "CriticalStrikeDeal", "Dodge", "EarthResistance", "ESPPower", "FireResistance", "IceResistance", "LightningResistance", "MaxAddSP", "MaxHP", "MaxVigor", "MoveDist", "OverchargeDuration", "PiercingResistance", "RegenVigor", "Resistance", "SightRange", "SlashingResistance", "Speed", "WaterResistance", "WindResistance"];

	const gears = $store.gears;
	let gearId: number;
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

<Items items={gears} let:index={index}>
	{@const gearId = gears[index].id}
	<div class="my-1">
		<Label for={`option-ratio-${gearId}`}>Option Ratio</Label>
		<Input id={`option-ratio-${gearId}`} bind:value={gears[index].properties["Option/Ratio"]}/>
	</div>
	<div class="my-1">
		<Label for={`option-key-${gearId}`}>Option Key</Label>
		<Input id={`option-key-${gearId}`} list="option-keys-datalist" bind:value={gears[index].properties["Option/OptionKey"]}/>
	</div>

	{#each [1, 2, 3, 4, 5] as ordinal (`item-${gearId}-property-${ordinal}`)}
		<div class="my-1">
			<Label for={`property-${gearId}-${ordinal}`}>Property {ordinal}</Label>
			<Input id={`property-${gearId}-${ordinal}`} list="options-datalist" bind:value={gears[index].properties[`Option/Type${ordinal}`]}/>
			<Input bind:value={gears[index].properties[`Option/Value${ordinal}`]}/>
		</div>
	{/each}
</Items>
