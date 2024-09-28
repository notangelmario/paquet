import { Head } from "$fresh/runtime.ts";
import Header from "@/components/Header.tsx";
import Stack from "@/components/Stack.tsx";
import Container from "@/components/Container.tsx";
import Navbar from "@/islands/Navbar.tsx";
import Card from "@/components/Card.tsx";
import ListItem from "@/components/ListItem.tsx";
import { APP } from "@/lib/app.ts";

export default function Settings() {
	return (
		<>
			<Head>
				<title>Settings &middot; Paquet</title>
			</Head>
			<Navbar 
				title="Settings"
				back 
			/>
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
					<Card disableGutters>
						<a
							href={APP.githubRepo}
							target="_blank"
							rel="noopener noreferrer"
						>
							<ListItem
								button
								divider
								icon="github"
								title="GitHub"
								subtitle="notangelmario/paquet"
							/>
						</a>
						<a
							href="https://buymeacoffee.com/notangelmario"
							target="_blank"
							rel="noopener noreferrer"
						>
							<ListItem
								button
								icon="euro"
								title="Donate"
								subtitle="Support Paquet's development"
							/>
						</a>
					</Card>
					<Card disableGutters>
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
