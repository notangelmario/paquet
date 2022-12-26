import { Options } from "$fresh/plugins/twind.ts";

export default {
	selfURL: import.meta.url,
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
			boxShadow: (theme) => ({
				"primary": `0 0 8px ${theme("colors.primary")}`,
				"error": `0 0 8px ${theme("colors.error")}`,
				"secondary": `0 0 8px ${theme("colors.secondary")}`,
				"outset-light": `4px 4px 8px ${
					theme("colors.light.dark")
				}, -4px -4px 8px ${theme("colors.light.light")}`,

				"outset-dark": `4px 4px 8px ${
					theme("colors.dark.dark")
				}, -4px -4px 8px ${theme("colors.dark.light")}`,
				"inset-light": `inset 4px 4px 8px ${
					theme("colors.light.dark")
				}, inset -4px -4px 8px ${theme("colors.light.light")}`,
				"inset-dark": `inset 4px 4px 8px ${
					theme("colors.dark.dark")
				}, inset -4px -4px 8px ${theme("colors.dark.light")}`,

				// We use pressed versions of the outset shadows
				// becccause transition-shadow does not work with
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
} as Options;
