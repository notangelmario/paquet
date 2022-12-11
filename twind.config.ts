import { Options } from "$fresh/plugins/twind.ts";

export default {
	selfURL: import.meta.url,
	darkMode: "media",
	theme: {
		extend: {
			colors: {
				primary: "#8267be",
				secondary: "#D77fa1",
				light: "#ffffff",
				dark: "#121212",
				paper: {
					light: "#ddd",
					dark: "#212121",
				},
			},
			borderRadius: {
				DEFAULT: "0.95rem",
			},
			backdropBlur: {
				DEFAULT: "16px",
			},
			container: {
				center: true,
			},
			screens: {
				"betterhover": { "raw": "(hover: hover)" },
			},
		},
	},
} as Options;
