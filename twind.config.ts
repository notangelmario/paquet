import { IS_BROWSER } from "$fresh/runtime.ts";
import { Configuration, setup } from "twind";
export * from "twind";

export const config: Configuration = {
	mode: "silent",
	darkMode: "media",
	theme: {
	  extend: {
		colors: {
		  primary: '#8267be',
		  secondary: "#D77fa1",
		  dark: "#212121",
		  paper: {
			light: "#f0f0f0",
			dark: "#323232"
		  }
		},
		borderRadius: {
		  DEFAULT: '18px'
		},
		container: {
			center: true
		},
		screens: {
            'betterhover': {'raw': '(hover: hover)'},
		}
	  },
	},
};
if (IS_BROWSER) setup(config);

export default config;