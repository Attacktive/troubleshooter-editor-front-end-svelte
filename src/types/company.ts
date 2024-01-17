import type { Properties } from "./property";

export interface CompanyProperties extends Properties {
	GameDifficulty: string
}

export interface CompanyInfo {
	id: number,
	name: string,
	vill: number,
	properties: CompanyProperties
}

export const defaultCompany: CompanyInfo = Object.freeze({
	id: 0,
	name: "",
	vill: 0,
	properties: {
		GameDifficulty: ""
	}
});

export function truncateCompanyInfo(company: CompanyInfo): CompanyInfo {
	return {
		id: company.id,
		name: company.name,
		vill: company.vill,
		properties: {
			GameDifficulty: company.properties.GameDifficulty
		}
	};
}
