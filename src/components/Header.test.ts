import { mount } from "svelte";
import { describe, expect, test } from "vitest";
import Header from "./Header.svelte";

describe(
	"Header component",
	() => {
		test(
			"Should render the component.",
			() => {
				const container = document.createElement("div");
				document.body.appendChild(container);

				const instance = mount(Header, { target: container });

				expect(instance).toBeTruthy();
				expect(container.textContent).toContain("Troubleshooter Editor");
			}
		);
	}
);
