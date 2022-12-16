import "dotenv";
import { Head } from "$fresh/runtime.ts";
import Header from "@/components/Header.tsx";
import Stack from "@/components/Stack.tsx";
import Container from "@/components/Container.tsx";
import Navbar from "@/islands/Navbar.tsx";
import Card from "@/components/Card.tsx";
import ListItem from "@/components/ListItem.tsx";
import { APP } from "@/lib/app.ts";
import Divider from "@/components/Divider.tsx";

export default function Settings() {
	return (
		<>
			<Head>
				<title>Settings &middot; Paquet</title>
			</Head>
			<Navbar back />
			<Container>
				<Stack>
					<Header icon="settings">
						Settings
					</Header>
					<Card disableGutters>
						<a href="/docs">
							<ListItem
								button
								icon="code"
								title="Docs"
								subtitle="All things developer"
							/>
						</a>
					</Card>
					<Divider />
					<Card disableGutters>
						<a
							href="https://github.com/notangelmario/paquet"
							target="_blank"
							rel="noopener noreferrer"
						>
							<ListItem
								icon="github"
								title="GitHub"
								subtitle="notangelmario/paquet"
							/>
						</a>
						<ListItem
							icon="info"
							title="Version"
							subtitle={`${APP.version} - ${APP.codename}`}
						/>
					</Card>
				</Stack>
			</Container>
		</>
	);
}
