import type { SaveData } from "$types/save-data";
import { writable } from "svelte/store";
import { createInitialValue } from "$types/company";

const initialValue = {
	company: createInitialValue(),
	items: [],
	rosters: []
};

const createStore = () => {
	const store = writable<SaveData>(initialValue);

	const { set, subscribe } = store;

	const reset = () => set(initialValue);

	let state: SaveData;
	subscribe((value: SaveData) => state = value);

	const stringify = () => JSON.stringify(state);

	return {
		set,
		reset,
		subscribe,
		stringify
	};
};

export const store = createStore();
