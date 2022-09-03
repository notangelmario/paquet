/**@jsx h */
/**@jsxFrag Fragment */
import { Fragment, h } from "preact";
import { Head } from "$fresh/runtime.ts";
import Header from "@/components/Header.tsx";
import Stack from "@/components/Stack.tsx";
import Container from "@/components/Container.tsx";
import Navbar from "@/islands/Navbar.tsx";
import Card from "@/components/Card.tsx";
import ListItem from "@/components/ListItem.tsx";
import { APP, DEV_MODE } from "@/lib/info.ts";

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
						<a href="/developers">
							<ListItem
								button
								icon="code"
								title="Developers"
								subtitle="All things developer"
							/>
						</a>
					</Card>
					<Card disableGutters>
						{DEV_MODE &&
							(
								<ListItem
									icon="build"
									title="Running in Development Mode"
									subtitle="Paquet is running under development mode"
									divider
								/>
							)}
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