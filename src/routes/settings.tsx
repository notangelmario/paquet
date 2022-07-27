/**@jsx h */
/**@jsxFrag Fragment */
import "dotenv";
import { Fragment, h } from "preact";
import { tw } from "@twind";
import { getCookies } from "$std/http/cookie.ts";
import { User } from "supabase";
import { supabaseService } from "@supabase";
import type { Handler, PageProps } from "$fresh/server.ts";
import Header from "@/components/Header.tsx";
import Stack from "@/components/Stack.tsx";
import Container from "@/components/Container.tsx";
import Navbar from "@/islands/Navbar.tsx";
import Card from "@/components/Card.tsx";
import LogoutButton from "@/islands/LogoutButton.tsx";
import ListItem from "@/components/ListItem.tsx";
import app from "@app";

type DataProps = {
	supabaseUrl: string;
	supabaseKey: string;
	user: User | null;
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
							<LogoutButton
								supabaseUrl={props.data.supabaseUrl}
								supabaseKey={props.data.supabaseKey}
								fullWidth
								red
								outlined
							/>
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

export const handler: Handler = async (req, ctx) => {
	const cookies = await getCookies(req.headers);
	const sbConfig = {
		supabaseUrl: Deno.env.get("SUPABASE_URL"),
		supabaseKey: Deno.env.get("SUPABASE_ANON_KEY"),
	}

	if (!cookies["access_token"]) {
		return ctx.render({ ...sbConfig, user: null });
	}

	const { user } = await supabaseService.auth.api.getUser(
		cookies["access_token"],
	);

	if (!user) {
		return ctx.render({ ...sbConfig, user: null });
	}

	return ctx.render({ ...sbConfig, user });
};
