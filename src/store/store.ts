import type { SaveData } from "$types/save-data";
import type { CompanyInfo } from "$types/company";
import type { ItemCollection } from "$types/item";
import type { RosterCollection } from "$types/roster";
import { writable } from "svelte/store";
import { createInitialValue } from "$types/company";

const initialValue: SaveData = {
	company: createInitialValue(),
	gears: [],
	consumables: [],
	rosters: []
};

interface ItemMergedSaveData {
	company: CompanyInfo;
	items: ItemCollection;
	rosters: RosterCollection;
}

const generateItemMergedSaveData = (source: SaveData): ItemMergedSaveData => {
	const items = [...source.gears, ...source.consumables]
		.sort((left, right) => left.id - right.id);

	return {
		company: source.company,
		rosters: source.rosters,
		items
	};
};

const createStore = () => {
	const store = writable(initialValue);

	const { set, update, subscribe } = store;

	const reset = () => set(initialValue);

	let state: SaveData;
	subscribe((value: SaveData) => {
		console.debug("store updated", value);
		state = value;
	});

	const stringify = () => {
		const itemMergedSaveData = generateItemMergedSaveData(state);

		return JSON.stringify(itemMergedSaveData);
	};

	return {
		set,
		update,
		reset,
		subscribe,
		stringify
	};
};

export const store = createStore();
