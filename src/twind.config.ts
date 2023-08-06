import { css, defineConfig } from "@twind/core";
import presetTailwind from "preset-tailwind";
import presetAutoPrefix from "preset-autoprefix";

export default {
	...defineConfig({
		presets: [presetTailwind(), presetAutoPrefix()],
		darkMode: "media",
		theme: {
			extend: {
				colors: {
					primary: "#8267be",
					secondary: "#D77fa1",
					error: "#ff0000",
					light: {
						DEFAULT: "#dddddd",
						dark: "#bcbcbc",
						light: "#fefefe",
					},
					dark: {
						DEFAULT: "#121212",
						dark: "#070707",
						light: "#1d1d1d",
					},
				},
				borderRadius: {
					DEFAULT: "1.25rem",
				},
				container: {
					center: true,
				},
				boxShadow: ({ theme }) => ({
					"outset-primary": `0 0 8px ${theme("colors.primary")}`,
					"inset-primary": `inset 2px 2px 4px ${
						theme("colors.primary.dark")
					}, inset -2px -2px 4px ${theme("colors.primary.light")}`,
					"outset-error": `0 0 8px ${theme("colors.error")}`,
					"outset-secondary": `0 0 8px ${theme("colors.secondary")}`,
					"outset-light": `2px 2px 4px ${
						theme("colors.light.dark")
					}, -2px -2px 4px ${theme("colors.light.light")}`,

					"outset-dark": `2px 2px 4px ${
						theme("colors.dark.dark")
					}, -2px -2px 4px ${theme("colors.dark.light")}`,
					"inset-light": `inset 2px 2px 4px ${
						theme("colors.light.dark")
					}, inset -2px -2px 4px ${theme("colors.light.light")}`,
					"inset-dark": `inset 2px 2px 4px ${
						theme("colors.dark.dark")
					}, inset -2px -2px 4px ${theme("colors.dark.light")}`,

					// We use pressed versions of the outset shadows
					// because transition-shadow does not work with
					// transitioning from outset to inset
					"pressed-light": `1px 1px 2px ${
						theme("colors.light.dark")
					}, -1px -1px 2px ${theme("colors.light.light")}`,
					"pressed-dark": `1px 1px 2px ${
						theme("colors.dark.dark")
					}, -1px -1px 2px ${theme("colors.dark.light")}`,
				}),
			},
		},
		rules: [
			[
				"grainy",
				`bg-[url(/noise-light.svg)] bg-repeat dark:bg-[url(/noise-dark.svg)]`,
			],
			[
				"btn",
				`cursor-pointer
				not-disabled:(active:override:opacity-50 hover:opacity-75)
				disabled:(opacity-25 cursor-not-allowed)
				z-10
				transition-opacity`,
			],
			[
				"btn-outset",
				`cursor-pointer
				shadow-outset-light
				dark:shadow-outset-dark
				not-disabled:active:shadow-pressed-light
				not-disabled:dark:(shadow-outset-dark active:shadow-pressed-dark)
				disabled:(opacity-25 cursor-not-allowed)
				z-0 transition-shadow`,
			],
			["btn-", ({ $$ }) => `
				bg-${$$}
				cursor-pointer
				shadow-outset-${$$}
				not-disabled:active:shadow-pressed-${$$}
				disabled:(opacity-25 cursor-not-allowed)
				z-0 transition-shadow ${$$ === "primary" ? "text-light" : ""}`],
			[
				"icon-btn",
				`cursor-pointer 
					rounded-full
					block p-2
					focus:!outline-0
					not-disabled:(active:override:opacity-50 hover:opacity-75)
					disabled:(opacity-25 cursor-not-allowed)
					transition-opacity
					${
					css({
						"& > span": {
							display: "block",
							width: "100%",
							height: "100%",
							verticalAlign: "middle",
						},
					})
				}`,
			],
		],
	}),
	selfURL: import.meta.url,
};
