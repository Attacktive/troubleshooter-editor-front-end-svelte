import type { Properties } from "$types/property";

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
