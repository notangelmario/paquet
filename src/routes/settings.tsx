import { Head } from "$fresh/runtime.ts";
import Header from "@/components/Header.tsx";
import Stack from "@/components/Stack.tsx";
import Container from "@/components/Container.tsx";
import Navbar from "@/islands/Navbar.tsx";
import Card from "@/components/Card.tsx";
import ListItem from "@/components/ListItem.tsx";
import { APP } from "@/lib/app.ts";
import type { RouteContext } from "@/types/Handler.ts";
import AnalyticsSwitch from "@/islands/settings/AnalyticsSwitch.tsx";

export default async function Settings(_: Request, ctx: RouteContext) {
	await Promise.resolve();

	return (
		<>
			<Head>
				<title>Settings &middot; Paquet</title>
			</Head>
			<Navbar 
				back 
			/>
			<Container>
				<Stack>
					<Header icon="settings">
						Settings
					</Header>
					<Card disableGutters>
						<AnalyticsSwitch
							analyticsDisabled={!!ctx.state.analyticsDisabled}
						/>
					</Card>
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
								subtitle="roseto/paquet"
							/>
						</a>
						<a
							href="https://opencollective.com/roseto"
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
