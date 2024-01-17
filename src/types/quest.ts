import type { Properties } from "./property";

export interface QuestInfo {
	index: number,
	name: string,
	stage: number,
	properties: Properties
}

export type QuestCollection = QuestInfo[];
