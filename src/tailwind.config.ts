import { type Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
	content: [
		"{routes,islands,components}/**/*.{ts,tsx}",
	],
	darkMode: "media",
	theme: {
		extend: {
			colors: {
				primary: "var(--primary)",
				secondary: "var(--secondary)",
				error: "var(--error)",
				light: {
					DEFAULT: "var(--light)",
					dark: "var(--light-dark)",
					light: "var(--light-light)",
				},
				dark: {
					DEFAULT: "var(--dark)",
					dark: "var(--dark-dark)",
					light: "var(--dark-light)",
				},
			},
			borderRadius: {
				DEFAULT: "var(--border-radius)",
			},
			container: {
				center: true,
			},
			boxShadow: {
				"outset-primary": `0 0 8px var(--primary)`,
				"inset-primary": `inset 2px 2px 4px var(--primary-dark), inset -2px -2px 4px var(--primary-light)`,
				"outset-error": `0 0 8px var(--error)`,
				"outset-secondary": `0 0 8px var(--secondary)`,
				"outset-light": `2px 2px 4px var(--light-dark), -2px -2px 4px var(--light-light)`,
				"outset-dark": `2px 2px 4px var(--dark-dark), -2px -2px 4px var(--dark-light)`,
				"inset-light": `inset 2px 2px 4px var(--light-dark), inset -2px -2px 4px var(--light-light)`,
				"inset-dark": `inset 2px 2px 4px var(--dark-dark), inset -2px -2px 4px var(--dark-light)`,

				// We use pressed versions of the outset shadows
				// because transition-shadow does not work with
				// transitioning from outset to inset
				"pressed-light": `1px 1px 2px var(--light-dark), -1px -1px 2px var(--light-light)`,
				"pressed-dark": `1px 1px 2px var(--dark-dark), -1px -1px 2px var(--dark-light)`,
			},
		},
	},
	plugins: [
		plugin(function ({ addComponents, addUtilities }) {
			addUtilities({
				".grainy": {
					"@apply bg-[url(/noise-light.svg)] bg-repeat dark:bg-[url(/noise-dark.svg)]": "",
				},
			});
			addComponents({
				".btn": {
					"@apply cursor-pointer": "",
					"@apply active:opacity-50 hover:opacity-75": "",
					"@apply disabled:opacity-25 disabled:cursor-not-allowed": "",
					"@apply z-10": "",
					"@apply transition-opacity": "",
				},
				".btn-outset": {
					"@apply cursor-pointer": "",
					"@apply shadow-outset-light": "",
					"@apply dark:shadow-outset-dark": "",
					"@apply active:shadow-pressed-light": "",
					"@apply disabled:opacity-25 disabled:cursor-not-allowed": "",
					"@apply z-0": "",
					"@apply transition-shadow": "",
				},
				".btn-primary": {
					"@apply bg-primary": "",
					"@apply cursor-pointer": "",
					"@apply shadow-outset-primary": "",
					"@apply disabled:opacity-25 disabled:cursor-not-allowed": "",
					"@apply z-0": "",
					"@apply transition-shadow": "",
					"@apply text-light": "",
				},
				".btn-secondary": {
					"@apply bg-secondary": "",
					"@apply cursor-pointer": "",
					"@apply shadow-outset-secondary": "",
					"@apply disabled:opacity-25 disabled:cursor-not-allowed": "",
					"@apply z-0": "",
					"@apply transition-shadow": "",
				},
				".btn-error": {
					"@apply bg-error": "",
					"@apply cursor-pointer": "",
					"@apply shadow-outset-error": "",
					"@apply disabled:opacity-25 disabled:cursor-not-allowed": "",
					"@apply z-0": "",
					"@apply transition-shadow": "",
					"@apply border-error": "",
				},
				".icon-btn": {
					"@apply cursor-pointer": "",
					"@apply rounded-full": "",
					"@apply block p-2": "",
					"@apply focus:!outline-0": "",
					"@apply active:opacity-50 hover:opacity-75": "",
					"@apply disabled:opacity-25 disabled:cursor-not-allowed": "",
					"@apply transition-opacity": "",
					"& > span": {
						display: "block",
						width: "100%",
						height: "100%",
						verticalAlign: "middle",
					},
				}
			});
		})
	],
	/* rules: [
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
	],*/
} satisfies Config;
