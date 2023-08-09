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
import { getUser } from "@/lib/oauth.ts";

export default async function Settings(req: Request, ctx: RouteContext) {
	const user = await getUser(req);

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
						{user
							? (
								<>
									<ListItem
										title={user.name}
										image={user.avatar_url}
										subtitle={user.email}
										divider
									/>
									<a href="/api/auth/signout">
										<ListItem
											button
											icon="logout"
											title="Sign out"
											subtitle="Sign out of your account"
											divider
										/>
									</a>
								</>
							)
							: (
								<a href="/login">
									<ListItem
										button
										icon="login"
										title="Login"
										subtitle="Login to access more features"
										divider
									/>
								</a>
							)}
						<AnalyticsSwitch
							analyticsDisabled={!!ctx.state.analyticsDisabled}
						/>
					</Card>
					<Card disableGutters>
						<a href="/certificate">
							<ListItem
								button
								icon="certificate"
								title="Certificate"
								subtitle="Generate a certificate"
								divider
							/>
						</a>
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
								icon="coffee"
								title="Buy me a coffee"
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
