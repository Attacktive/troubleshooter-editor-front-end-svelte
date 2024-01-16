const config = {
	content: [
		"./src/**/*.{html,svelte,ts,js}",
		"./node_modules/flowbite-svelte/**/*.{html,svelte,ts,js}"
	],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				// flowbite-svelte
				primary: {
					50: "#FFF5F2",
					100: "#FFF1EE",
					200: "#FFE4DE",
					300: "#FFD5CC",
					400: "#FFBCAD",
					500: "#FE795D",
					600: "#EF562F",
					700: "#EB4F27",
					800: "#CC4522",
					900: "#A5371B"
				}
			}
		}
	},
	plugins: [require("flowbite/plugin")]
};

module.exports = config;