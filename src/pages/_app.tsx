import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ParallaxProvider } from "react-scroll-parallax";
import { CssBaseline, ThemeProvider, useMediaQuery, useTheme } from "@mui/material";
import { darkTheme, lightTheme } from "../lib/theme";
import "../lib/firebase";


const App = ({ Component, pageProps }: AppProps) => {
	const theme = useTheme();
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta name="description" content="Aducem comunitatea mai aproape" />
				<link rel="apple-touch-icon" href="/icon.png" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
				<link rel="manifest" href="/manifest.json"/>
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#8267be"/>
				<meta name="msapplication-TileColor" content="#8267be"/>

				<meta
					name="theme-color" 
					content={
						prefersDarkMode ? 
							darkTheme.palette.background.default
							:
							lightTheme.palette.background.default
					}
				/>

				<title>Paquet Hub</title>
			</Head>
			<ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
				<CssBaseline enableColorScheme/>
				<ParallaxProvider>
					<Component {...pageProps} />
				</ParallaxProvider>
			</ThemeProvider>
		</>

	);
};

export default App;
