<script lang="ts">
	import type { SaveData } from "$types/save-data";
	import type { AxiosRequestConfig } from "axios";
	import { onMount } from "svelte";
	import axios from "axios";
	import { Button, Fileupload, Img, TabItem, Tabs, Textarea } from "flowbite-svelte";
	import { store } from "$store/store";
	import Company from "$components/tabs/Company.svelte";
	import Gears from "$components/tabs/Gears.svelte";
	import Consumables from "$components/tabs/Consumables.svelte";
	import Rosters from "$components/tabs/Rosters.svelte";
	import nyancat from "$lib/assets/nyancat.gif";

	const apiRoot = import.meta.env.VITE_API_ROOT;
	const axiosRequestConfigForFileDownload: AxiosRequestConfig = { responseType: "blob" };

	let fileUploadKey = $state({});
	let toShowSpinner = $state(false);
	let fileIsUploaded = $state(false);
	let debuggingOutput = $state("");
	let files: FileList | undefined = $state();
	let firstTabIsOpen = $state(true);

	let file = $derived(files?.[0]);
	let fileIsSelected = $derived(file !== undefined);
	let uploadResetButtonLabel = $derived(fileIsUploaded? "Reset" : "Upload");

	const uploadOrReset = () => {
		if (fileIsUploaded) {
			fileUploadKey = {};
			resetFile();
		} else {
			upload();
		}
	};

	const upload = () => {
		toShowSpinner = true;

		axios.post<SaveData>(`${apiRoot}/upload`, generateFormData())
			.then(({ data: saveData }) => {
				console.debug("response of /upload", saveData);

				debuggingOutput = JSON.stringify(saveData);

				store.set(saveData);

				fileIsUploaded = true;
			})
			.catch(error => {
				console.error(error);
				debuggingOutput = error;

				resetComponents();

				fileIsUploaded = false;
			})
			.finally(() => toShowSpinner = false);
	};

	const resetFile = () => {
		debuggingOutput = "";
		resetComponents();
		fileIsUploaded = false;
	};

	const downloadEdited = async (subUrl: string) => {
		toShowSpinner = true;

		try {
			const { data: blob } = await axios.post<Blob>(`${apiRoot}/${subUrl}`, generateFormData(true), axiosRequestConfigForFileDownload);
			return downloadFile(blob);
		} catch (error) {
			console.error(error);

			if (error instanceof Error) {
				debuggingOutput = error.toString();
			} else {
				debuggingOutput = `A non-Error "something" is thrown: ${error}`;
			}
		} finally {
			toShowSpinner = false;
		}
	};

	const save = () => downloadEdited("save");

	const quickCheats = () => downloadEdited("quick-cheats");

	const generateFormData = (toSubmitEdits: boolean = false) => {
		if (!file) {
			throw Error(`File is ${file}!`);
		}

		const formData = new FormData();
		formData.append("file", file);

		if (toSubmitEdits) {
			const stringified = store.stringify();
			console.debug("to be uploaded", stringified);

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
		firstTabIsOpen = true;
		files = undefined;
		store.reset();
	};

	let toShowErrorBackEndIsNotRunning = $state(false);
	onMount(() => {
		axios
			.get(`${apiRoot}`)
			.catch((error) => {
				console.error(error);

				toShowErrorBackEndIsNotRunning = true;
			})
	});

	let toShowTopButton: boolean = $state(false);
	const onWindowScroll = () => {
		toShowTopButton = document?.documentElement.scrollTop > 50;
	};

	const scrollToTop = () => document?.documentElement.scrollIntoView();
</script>

<svelte:window onscroll={onWindowScroll}/>

{#if toShowErrorBackEndIsNotRunning}
	<div id="warning-container" class="overlay">
		<p>The <a href="https://github.com/Attacktive/troubleshooter-editor-back-end">back-end app</a> might not be running locally!</p>
		<p id="warning-container-emoji">🚧</p>
	</div>
{/if}

{#if toShowSpinner}
	<div class="overlay">
		<Img src={nyancat} class="h-full"/>
	</div>
{/if}

<div class="grid grid-cols-12 mt-2">
	{#key fileUploadKey}
		<Fileupload bind:files={files} accept={".sav,.bak"} class="col-span-3"/>
	{/key}
	<Button class="mx-8 col-span-2" disabled={!fileIsSelected} on:click={uploadOrReset}>{uploadResetButtonLabel}</Button>
	<Button class="mx-1 col-span-2" disabled={!fileIsSelected || !fileIsUploaded} on:click={save}>Save</Button>
	<Button class="mx-1 col-span-2" disabled={!fileIsSelected || !fileIsUploaded} on:click={quickCheats}>Quick Cheats!</Button>
</div>
<div class="mt-4">
	<Tabs>
		<TabItem title="Company" bind:open={firstTabIsOpen}>
			<Company/>
		</TabItem>
		<TabItem title="Gears">
			<Gears/>
		</TabItem>
		<TabItem title="Consumables">
			<Consumables/>
		</TabItem>
		<TabItem title="Rosters">
			<Rosters/>
		</TabItem>
	</Tabs>
</div>
<div class="mt-4">
	<Textarea value={debuggingOutput} rows={8} readonly/>
</div>
{#if toShowTopButton}
	<div class="fixed">
		<Button on:click={scrollToTop}>△</Button>
	</div>
{/if}

<style>
	#warning-container {
		container-type: inline-size;
	}

	#warning-container > p {
		color: red;
		font-size: 66px;
	}

	#warning-container > #warning-container-emoji {
		display: block;
		text-align: center;
		font-size: 28cqh;
	}

	.overlay {
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgb(0 0 0 / 22.22%);
	}

	.fixed {
		position: fixed;
		left: 50%;
		bottom: 10px;
	}
</style>
