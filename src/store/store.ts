import { derived, writable } from "svelte/store";
import { createInitialValue } from "../types/company";
import type { SaveData } from "../types/save-data";

const initialValue = {
	company: createInitialValue(),
	items: [],
	rosters: [],
	quests: []
};

const createStore = () => {
	//const store = writable<SaveData>(initialValue);
	const { set, update, subscribe } = writable<SaveData>(initialValue);

	const get = () => state;

	const reset = () => set(initialValue);

	let state: SaveData;
	subscribe((value: SaveData) => state = value);

	//const stringify = () => JSON.stringify(state);
	const stringify = () => JSON.stringify(state);

	return {
		get,
		set,
		update,
		reset,
		subscribe,
		stringify
	};
};

export const store = createStore();
