import { Head } from "$fresh/runtime.ts";
import Navbar from "@/islands/Navbar.tsx";
import Container from "@/components/Container.tsx";
import Header from "@/components/Header.tsx";
import Stack from "@/components/Stack.tsx";
import Card from "@/components/Card.tsx";
import Icon from "@/components/Icon.tsx";

export default function About() {
	return (
		<>
			<Head>
				<title>
					About &middot; Paquet
				</title>
			</Head>
			<Navbar />
			<Container>
				<Stack>
					<Header icon="info">
						About
					</Header>
					<p>
						Paquet(french for "package") is an alternative app store
						for your device. Paquet is a web app shop where you can
						find and install web apps.
					</p>
					<img
						src="/illustrations/app-installation.svg"
						class="h-64"
					/>
					<Card>
						<p>
							<Icon
								name="info"
								width={18}
								height={18}
								inline
							/>{" "}
							Web apps are not meant to replace native apps. Use a
							web app when you don't use a service often or if you
							use a low-end device.
						</p>
						<br />
						<p>
							Sometimes a native app would be better than a web
							app.
						</p>
					</Card>
					<img
						src="/illustrations/progressive-app.svg"
						class="h-64"
					/>
				</Stack>
			</Container>
		</>
	);
}
