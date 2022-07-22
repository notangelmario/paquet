/**@jsx h */
/**@jsxFrag Fragment */
import { Fragment, h } from "preact";
import type { Handler, PageProps } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import type { User } from "@/types/User.ts";
import Header from "@/components/Header.tsx";
import Container from "@/components/Container.tsx";
import Stack from "@/components/Stack.tsx";
import Navbar from "@/islands/Navbar.tsx";
import { useUserServerSide } from "@/hooks/useUser.ts";

type DataProps = {
	user: User;
};

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
						{props.data.user?.id}
					</p>
					<p>
						{props.data.user?.username}
					</p>
					<p>
						{props.data.user?.email}
					</p>
				</Stack>
			</Container>
		</>
	);
}

export const handler: Handler = async (req, ctx) => {
	const url = new URL(req.url);
	const cookies = getCookies(req.headers);

	if (!cookies["access_token"]) return Response.redirect(url.origin + "/login");

	const user = await useUserServerSide(cookies["access_token"]);

	return ctx.render({
		user
	} as DataProps);
}
