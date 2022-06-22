import { createTheme, responsiveFontSizes } from "@mui/material";
import { Shadows } from "@mui/material/styles/shadows";

declare module "@mui/material/styles" {
	interface Theme {
		shape: {
			blur: number | undefined;
			borderRadius: string | number | undefined
		};
	}

	interface ThemeOptions {
		shape?: {
			blur?: number | undefined;
			borderRadius?: string | number | undefined
		};
	}
}


let lightTheme = createTheme({
	palette: {
		primary: {
			main: "#8267BE"
		},
		secondary: {
			main: "#D77FA1"
		},
		background: {
			default: "#ffffff",
			paper: "#f4f4f4"
		},
		mode: "light"
	},
	typography: {
		fontFamily: "'Poppins', sans-serif"
	},
	shadows: new Array(25).fill("none") as Shadows,
	shape: {
		blur: 15,
		borderRadius: 16
	},
	components: {
		MuiContainer: {
			defaultProps: {
				maxWidth: "md"
			}
		},
		MuiStack: {
			defaultProps: {
				spacing: 2
			}
		},
		MuiLink: {
			defaultProps: {
				underline: "hover"
			}
		}
	}
});

let darkTheme = createTheme({
	...lightTheme,
	palette: {
		primary: {
			main: "#8267BE"
		},
		secondary: {
			main: "#D77FA1"
		},
		mode: "dark"
	}
});

lightTheme = responsiveFontSizes(lightTheme);
darkTheme = responsiveFontSizes(darkTheme);

export {
	lightTheme,
	darkTheme
};