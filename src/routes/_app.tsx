/**@jsx h */
import { h } from "preact";
import { tw } from "@twind";
import type { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";



export default function App(props: AppProps) {
	return (
		<html>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0" />
				<meta name="description" content="The web app store" />
				<link rel="apple-touch-icon" href="/icon.png" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
				<link rel="manifest" href="/site.webmanifest"/>
				{/* @ts-ignore */}
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#8267be"/>
				<meta name="msapplication-TileColor" content="#8267be"/>
				<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#212121" />
				<meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff"/>

				<title>Paquet</title>

				<link href="/global.css" rel="stylesheet"/>
				<link rel="preconnect" href="https://fonts.googleapis.com"/>
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				
				{/* @ts-ignore */}
				<link rel="preload" as="style" onLoad="this.rel = 'stylesheet'"  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
				{/* @ts-ignore */}
				<link rel="preload" as="style" onLoad="this.rel = 'stylesheet'" href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;700&display=swap"/>
			</Head>
			<main class={tw`dark:text-white`} onTouchStart={"" as any}>
				<props.Component/>
			</main>
			{Deno.env.get("DENO_DEPLOYMENT_ID") && <script src="/registerSw.js"></script>}
			<script type="module" src="/supabase.js"></script>
		</html>
	)
}