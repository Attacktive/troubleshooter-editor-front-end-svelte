import type { CompanyInfo } from "$types/company";
import type { ItemCollection } from "$types/item";
import type { RosterCollection } from "$types/roster";

export interface SaveData {
	company: CompanyInfo;
	items: ItemCollection;
	rosters: RosterCollection
}
