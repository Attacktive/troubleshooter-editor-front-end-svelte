import type { CompileOptions } from "svelte/compiler";
import { defineConfig } from "vitest/config";
import { svelte } from "@sveltejs/vite-plugin-svelte";

const compilerOptions: CompileOptions = {
	hmr: !process.env.VITEST
};

export default defineConfig({
	plugins: [
		svelte({ compilerOptions })
	],
	test: {
		environment: "jsdom"
	},
	resolve: {
		conditions: ["browser"]
	}
});
