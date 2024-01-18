<script lang="ts">
	import { Input, Label, NumberInput, Select } from "flowbite-svelte";
	import { store } from "../../store/store";
</script>

<div class="my-1">
	<Label for="id">ID</Label>
	<NumberInput id="id" bind:value={$store.company.id} readonly/>
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
