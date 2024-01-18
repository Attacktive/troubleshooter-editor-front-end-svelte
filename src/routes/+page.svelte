<script lang="ts">
	import type { SaveData } from "../types/save-data";
	import type { AxiosRequestConfig } from "axios";
	import type { CompanyInfo } from "../types/company";
	import type { ItemCollection } from "../types/item";
	import type { RosterCollection } from "../types/roster";
	import type { QuestCollection } from "../types/quest";
	import { Button, Fileupload, Spinner, TabItem, Tabs, Textarea } from "flowbite-svelte";
	import axios from "axios";
	import { defaultCompany } from "../types/company.js";

	const apiRoot = import.meta.env.VITE_API_ROOT;
	const axiosRequestConfigForFileDownload: AxiosRequestConfig = { responseType: "blob" };

	let toShowSpinner = false;
	let fileIsUploaded = false;
	let debuggingOutput = "";
	let files: FileList;
	let company: CompanyInfo;
	let items: ItemCollection;
	let rosters: RosterCollection;
	let quests: QuestCollection;

	$: file = files?.[0];
	$: fileIsSelected = file !== undefined;
	$: uploadResetButtonLabel = fileIsUploaded? "Reset" : "Upload";

	const uploadOrReset = () => {
		if (fileIsUploaded) {
			resetFile();
		} else {
			upload();
		}
	}

	const upload = () => {
		toShowSpinner = true;

		axios.post<SaveData>(`${apiRoot}/upload`, generateFormData())
		.then(({ data: saveData }) => {
			console.debug("response of /upload", saveData);

			debuggingOutput = JSON.stringify(saveData);

			//const { company, rosters, items, quests } = truncateSaveData(saveData);

			company = saveData.company;
			items = saveData.items;
			rosters = saveData.rosters;
			quests = saveData.quests;

			fileIsUploaded = true;
		})
		.catch(error => {
			console.error(error);
			debuggingOutput = error;

			resetComponents();

			fileIsUploaded = false;
		})
		.finally(() => toShowSpinner = false);
	}

	const resetFile = () => {
		debuggingOutput = "";
		resetComponents();
		fileIsUploaded = false;
	};

	const download = async (subUrl: string) => {
		toShowSpinner = true;

		try {
			const { data: blob } = await axios.post<Blob>(`${apiRoot}/${subUrl}`, generateFormData(true), axiosRequestConfigForFileDownload);
			return downloadFile(blob);
		} catch (error) {
			console.error(error);

			if (error instanceof Error) {
				debuggingOutput = error.toString();
			} else {
				const nonErrorError = error as any;
				debuggingOutput = `caught ${nonErrorError.constructor.name}: ${nonErrorError.toString()}`;
			}
		} finally {
			toShowSpinner = false;
		}
	}

	const save = () => download("save");

	const quickCheats = () => download("quick-cheats");

	const generateFormData = (toSubmitEdits: boolean = false) => {
		if (!file) {
			throw Error(`File is ${file}!`);
		}

		const formData = new FormData();
		formData.append("file", file);

		if (toSubmitEdits) {
			const stringified = JSON.stringify({ company, rosters, items, quests });
			const blob = new Blob(
				[stringified],
				{ type: "application/json" }
			);

			formData.append("edited", blob);
		}

		return formData;
	};

	const downloadFile = (blob: Blob) => {
		const url = URL.createObjectURL(blob);
		console.debug("url", url);

		const anchor = document.createElement("a");
		anchor.href = url;
		anchor.setAttribute("download", "cheated.sav");
		anchor.click();
	};

	const resetComponents = () => {
		// I think DOM manipulation like this isn't ideal, but it seems like React Bootstrap can't really clear the current file selection.
		const fileInput = document.querySelector("#file-input") as HTMLInputElement;
		fileInput.value = "";
		fileInput.files = null;

		company = defaultCompany;
		items = [];
		rosters = [];
		quests = [];
	};
</script>

{#if toShowSpinner}
	<Spinner color="red" size="20"/>
{/if}

<div class="grid grid-cols-12 mt-2">
	<Fileupload bind:files={files} accept={".sav,.bak"} class="col-span-3" on:change/>
	<Button class="mx-8 col-span-2" disabled={!fileIsSelected} on:click={uploadOrReset}>{uploadResetButtonLabel}</Button>
	<Button class="mx-1 col-span-2" disabled={!fileIsSelected || !fileIsUploaded} on:click={save}>Save</Button>
	<Button class="mx-1 col-span-2" disabled={!fileIsSelected || !fileIsUploaded} on:click={quickCheats}>Quick Cheats!</Button>
</div>
<div class="mt-4">
	<Tabs>
		<TabItem title="Company" open>

		</TabItem>
		<TabItem title="Items"></TabItem>
		<TabItem title="Rosters"></TabItem>
		<TabItem title="Quests"></TabItem>
	</Tabs>
</div>
<div class="mt-4">
	<Textarea value={debuggingOutput} rows="6" readonly/>
</div>
