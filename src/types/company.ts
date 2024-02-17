import type { Properties } from "$types/property";
import type { TrueOrFalse } from "$types/common";

export interface CompanyProperties extends Properties {
	GameDifficulty: string;
}

export interface CompanyInfo {
	id: number,
	name: string,
	vill: number,
	properties: CompanyProperties
}

export const createInitialValue = (): CompanyInfo => {
	return {
		id: 0,
		name: "",
		vill: 0,
		properties: {
			GameDifficulty: ""
		}
	};
};

export interface Troublemaker {
	name: string;
	exp?: number;
	isNew?: TrueOrFalse;
	/* TODO: what the heck is this? */
	isKill?: TrueOrFalse;
	rewarded?: TrueOrFalse;
}
