import type { Properties } from "$types/property";

export interface RosterInfo {
	id: number,
	name: string,
	class: string,
	level: number,
	exp: number,
	properties: Properties
}

export type RosterCollection = RosterInfo[];
