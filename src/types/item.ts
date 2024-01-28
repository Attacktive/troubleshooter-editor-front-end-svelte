import type { Properties } from "$types/property";

export interface ItemInfo {
	id: number,
	type: string,
	count: number,
	status: ItemStatus,
	properties: Properties
}

export type ItemStatus = "inventory" | "warehouse" | "equipped" | "stasis" | "mailbox";

export function isItemStatus(status: string): status is ItemStatus {
	return ["inventory", "warehouse", "equipped", "stasis", "mailbox"].includes(status);
}

export type ItemCollection = ItemInfo[];
