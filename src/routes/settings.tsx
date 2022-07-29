/**@jsx h */
/**@jsxFrag Fragment */
import "dotenv";
import { Fragment, h } from "preact";
import { tw } from "@twind";
import { User } from "supabase";
import type { PageProps } from "$fresh/server.ts";
import type { Handler } from "@/types/Handler.ts";
import Header from "@/components/Header.tsx";
import Stack from "@/components/Stack.tsx";
import Container from "@/components/Container.tsx";
import Navbar from "@/islands/Navbar.tsx";
import Card from "@/components/Card.tsx";
import Button from "@/components/Button.tsx";
import ListItem from "@/components/ListItem.tsx";
import app from "@app";

type DataProps = {
	user: User | null;
	userIsDeveloper: boolean;
};

export default function Settings(props: PageProps<DataProps>) {
	return (
		<>
			<Navbar back />
			<Container>
				<Stack>
					<Header>
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
								image={props.data.user?.user_metadata.avatar_url}
								imageProps={{
									class: "rounded-full",
								}}
							/>
						</a>
					</Card>
					{props.data.user &&
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
					}
					{props.data.user && props.data.userIsDeveloper && 
						<Card disableGutters>
							<a
								href="/dashboard"
							>
								<ListItem
									button
									icon="dashboard"
									title="Developer dashboard"
									subtitle="All things developer"
								/>
							</a>
						</Card>
					}
					<Card disableGutters>
						<ListItem
							icon="info"
							title="Version"
							subtitle={`${app.version} - ${app.nickname}`}
							divider
						/>
						<a
							href="https://github.com/notangelmario/paquet"
							target="_blank"
						>
							<ListItem
								button
								title="GitHub"
								subtitle="Star Paquet on GitHub"
								image="/github.svg"
								imageProps={{
									class: tw`p-3 filter dark:invert`,
								}}
							/>
						</a>
					</Card>
				</Stack>
			</Container>
		</>
	);
}

export const handler: Handler = (_, ctx) => {
	const user = ctx.state.user;
	const developer = ctx.state.developer;

	return ctx.render({ user: user ?? null, userIsDeveloper: !!developer });
};
