import type { CompanyInfo } from "./company";
import type { ItemCollection } from "./item";
import type { RosterCollection } from "./roster";

export interface SaveData {
	company: CompanyInfo;
	items: ItemCollection;
	rosters: RosterCollection
}
