import type { Properties } from "./property";

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

export function truncateItems(items: ItemCollection): ItemCollection {
	const filterImportantOptions = (key: string) => (key === "Binded" || /^Option\/.+$/i.test(key));

	return items.filter(item => item.status === "equipped")
	.map(item => {
		const properties = Object.keys(item.properties)
		.filter(filterImportantOptions)
		.reduce(
			(object: Properties, key: string) => {
				object[key] = item.properties[key];

				return object;
			},
			{}
		);

		return {
			id: item.id,
			type: item.type,
			count: item.count,
			status: item.status,
			properties
		};
	});
}
