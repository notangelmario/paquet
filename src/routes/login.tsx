/**@jsx h */
/**@jsxFrag Fragment */
import "dotenv";
import { Fragment, h } from "preact";
import { tw } from "@twind";
import type { Handler } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { supabaseService } from "@supabase";
import Header from "@/components/Header.tsx";
import Container from "@/components/Container.tsx";
import Stack from "@/components/Stack.tsx";
import Card from "@/components/Card.tsx";
import ListItem from "@/components/ListItem.tsx";
import Navbar from "@/islands/Navbar.tsx";

export default function Login() {
	return (
		<>
			<Navbar
				back
			/>
			<Container>
				<Stack>
					<Header>
						Login
					</Header>
					<img
						src="/illustrations/login.svg"
						class={tw`h-32`}
					/>
					<Card disableGutters>
						<a href="/api/auth/login?provider=google">
							<ListItem
								title="Login with Google"
								image="/external-icons/google.svg"
								button
								divider
								imageProps={{
									class: tw`p-3 filter dark:invert`,
								}}
							/>
						</a>
						<a href="/api/auth/login?provider=github">
							<ListItem
								title="Login with GitHub"
								image="/external-icons/github.svg"
								button
								imageProps={{
									class: tw`p-3 filter dark:invert`,
								}}
							/>
						</a>
					</Card>
					<p class={tw`opacity-50`}>
						<span class={tw`material-symbols-outlined !text-base`}>
							info
						</span>{" "}
						Create a new account to get access to developer
						features, reviews, and more.
					</p>
				</Stack>
			</Container>
		</>
	);
}

export const handler: Handler = async (req, ctx) => {
	const url = new URL(req.url);
	const cookies = await getCookies(req.headers);

	const { user } = await supabaseService.auth.api.getUser(
		cookies["access_token"],
	);

	if (user) {
		return Response.redirect(url.origin, 307);
	}

	return ctx.render();
};
