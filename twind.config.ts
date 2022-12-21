import { Options } from "$fresh/plugins/twind.ts";

export default {
	selfURL: import.meta.url,
	darkMode: "media",
	theme: {
		extend: {
			colors: {
				primary: "#8267be",
				secondary: "#D77fa1",
				light: {
					DEFAULT: "#dddddd",
					dark: "#bcbcbc",
					light: "#fefefe",
				},
				dark: {
					DEFAULT: "#212121",
					dark: "#191919",
					light: "#292929",
				},
			},
			borderRadius: {
				DEFAULT: "1.5rem",
			},
			container: {
				center: true,
			},
			boxShadow: (theme) => ({
				"outset-light": `8px 8px 16px ${
					theme("colors.light.dark")
				}, -8px -8px 16px ${theme("colors.light.light")}`,
				"outset-dark": `8px 8px 16px ${
					theme("colors.dark.dark")
				}, -8px -8px 16px ${theme("colors.dark.light")}`,
				"inset-light": `inset 8px 8px 16px ${
					theme("colors.light.dark")
				}, inset -8px -8px 16px ${theme("colors.light.light")}`,
				"inset-dark": `inset 8px 8px 16px ${
					theme("colors.dark.dark")
				}, inset -8px -8px 16px ${theme("colors.dark.light")}`,
				"pressed-light": `2px 2px 4px ${
					theme("colors.light.dark")
				}, -2px -2px 4px ${theme("colors.light.light")}`,
				"pressed-dark": `2px 2px 4px ${
					theme("colors.dark.dark")
				}, -2px -2px 4px ${theme("colors.dark.light")}`,
			}),
		},
	},
} as Options;
