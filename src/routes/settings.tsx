/**@jsx h */
/**@jsxFrag Fragment */
import "dotenv";
import { Fragment, h } from "preact";
import { User } from "supabase";
import type { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import type { Handler } from "@/types/Handler.ts";
import Header from "@/components/Header.tsx";
import Stack from "@/components/Stack.tsx";
import Container from "@/components/Container.tsx";
import Navbar from "@/islands/Navbar.tsx";
import Card from "@/components/Card.tsx";
import Button from "@/components/Button.tsx";
import ListItem from "@/components/ListItem.tsx";
import { APP, DEV_MODE } from "@/lib/app.ts";

type DataProps = {
	user?: User;
};

export default function Settings(props: PageProps<DataProps>) {
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
					<Card
						disableGutters
					>
						<a href={!props.data.user ? "/login" : undefined}>
							<ListItem
								button={!props.data.user}
								title={props.data.user
									? props.data.user.user_metadata.name
									: "Login"}
								subtitle={props.data.user
									? props.data.user.email
									: undefined}
								icon={!props.data.user?.user_metadata.avatar_url
									? "person"
									: undefined}
								image={props.data.user?.user_metadata
									.avatar_url}
								imageProps={{
									class: "rounded-full",
								}}
							/>
						</a>
					</Card>
					{props.data.user && (
						<>
							<Card disableGutters>
								<a href="/api/auth/logout">
									<Button
										fullWidth
										red
										outlined
									>
										Log out
									</Button>
								</a>
							</Card>
						</>
					)}
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

export const handler: Handler = (_, ctx) => {
	const user = ctx.state.user;

	return ctx.render({ user });
};
