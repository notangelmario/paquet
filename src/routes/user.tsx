/**@jsx h */
/**@jsxFrag Fragment */
import { h, Fragment } from "preact";
import type { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import type { User } from "@/types/User.ts";
import Header from "@/components/Header.tsx";
import Container from "@/components/Container.tsx";
import Stack from "@/components/Stack.tsx";
import { supabaseService } from "@supabase";
import { setCookie } from "$std/http/cookie.ts";
import { githubAPI } from "@/utils/github.ts";
import Navbar from "@/islands/Navbar.tsx";


type DataProps = {
	user: User
}

export default function User(props: PageProps<DataProps>) {
	return (
		<>
			<Navbar />
			<Container>
				<Stack>
					<Header>
						User
					</Header>
					<p>
						{props.data.user?.username}
					</p>
				</Stack>
			</Container>
		</>
	)
}

export const handler: Handlers = {
	async GET(req, ctx) {
		const url = new URL(req.url);
		const code = url.searchParams.get("code");

		const cookies = await getCookies(req.headers);

		if (cookies["access_token"]) {
			const userData = await githubAPI.getUserData(cookies["access_token"]);
			const { data: existingUser } = await supabaseService.from<User>("users").select("*").eq("id", userData.id).single();

			return ctx.render({
				user: existingUser
			} as DataProps);
		}

		if (!code) {
			return Response.redirect(new URL(req.url).origin);
		}

		try {
			const accessToken = await githubAPI.getAccessToken(code);

			const userData = await githubAPI.getUserData(accessToken);

			const { data: existingUser } = await supabaseService.from("users").select("*").eq("id", userData.id).single();

			let newUser: User | null = null;
			if (!existingUser) {
				const { data: newUserData } = await supabaseService.from("users").insert({
					id: userData.id,
					username: userData.username,
					email: userData.email,
				}).single();

				newUser = newUserData;
			}

			const res = await ctx.render({
				user: existingUser ?? newUser
			});

			setCookie(res.headers, {
				name: "access_token",
				value: accessToken,
				maxAge: 60 * 60 * 24 * 7,
				httpOnly: true,
				secure: false
			})

			return res;
		} catch(e) {
			console.log(e)
			return Response.redirect(new URL(req.url).origin);
		}
	}
}