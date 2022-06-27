import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ParallaxProvider } from "react-scroll-parallax";
import { CssBaseline, ThemeProvider, useMediaQuery, useTheme, Fade, Slide } from "@mui/material";
import { darkTheme, lightTheme } from "../lib/theme";
import "../lib/firebase";
import { SwitchTransition } from "react-transition-group";
import { useRouter } from "next/router";


const App = ({ Component, pageProps }: AppProps) => {
	const theme = useTheme();
	const router = useRouter();
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0" />
				<meta name="description" content="Aducem comunitatea mai aproape" />
				<link rel="apple-touch-icon" href="/icon.png" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
				<link rel="manifest" href="/site.webmanifest"/>
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
					<SwitchTransition key={router.pathname}>
						<Fade
							// direction="right"
						>
							<div>
					            <Component {...pageProps} />
							</div>
						</Fade>
					</SwitchTransition>
				</ParallaxProvider>
			</ThemeProvider>
		</>

	);
};

export default App;
