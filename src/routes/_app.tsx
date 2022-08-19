/** @jsx h */
import { h } from "preact";
import { tw } from "@/lib/twind.ts";
import type { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import Footer from "@/components/Footer.tsx";

export default function App(props: AppProps) {
	return (
		<html>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, user-scalable=0"
				/>
				<link rel="apple-touch-icon" href="/icon.png" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				{/* @ts-ignore */}
				<link
					rel="mask-icon"
					href="/safari-pinned-tab.svg"
					// @ts-ignore: Color is used in MacOS Safari
					color="#8267be"
				/>
				<meta name="msapplication-TileColor" content="#8267be" />
				<meta name="color-scheme" content="light dark" />
				<meta
					name="theme-color"
					media="(prefers-color-scheme: dark)"
					content="#212121"
				/>
				<meta
					name="theme-color"
					media="(prefers-color-scheme: light)"
					content="#ffffff"
				/>

				<title>Paquet</title>
				<meta
					name="description"
					content="Check out Paquet to find the best web apps on the open web."
				/>
				<meta property="og:image:width" content="1024" />
				<meta property="og:image:height" content="536" />
				<meta
					property="og:description"
					content="Check out Paquet to find the best web apps on the open web."
				/>
				<meta property="og:title" content="Paquet - The web app shop" />
				<meta property="og:url" content="https://paquet.shop" />
				<meta
					property="og:image"
					content="https://paquet.shop/og-image.jpg"
				/>

				<link href="/global.css" rel="stylesheet" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />

				{/* @ts-ignore */} 
				<link onload="this.rel = 'stylesheet'"
					rel="preload"
					as="style"
					href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
				/>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;700&display=swap"
				/>
			</Head>
			{/* @ts-ignore */}
			<main class={tw`dark:text-white`} onTouchStart="">
				<props.Component />
			</main>
			<Footer />
			{Deno.env.get("DENO_DEPLOYMENT_ID") && (
				<script src="/registerSw.js"></script>
			)}
		</html>
	);
}
