/**@jsx h */
/**@jsxFrag Fragment */
import "dotenv";
import { Fragment, h } from "preact";
import type { PageProps, Handler } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";
import { User } from "supabase";
import { supabaseService } from "@supabase";
import Header from "@/components/Header.tsx";
import Container from "@/components/Container.tsx";
// import Button from "@/components/Button.tsx";
import Stack from "@/components/Stack.tsx";
import Navbar from "@/islands/Navbar.tsx";
import LoginSection from "@/islands/LoginSection.tsx";

const DEV = !Deno.env.get("DENO_DEPLOYMENT_ID");


type DataProps = {
	supabaseUrl: string,
	supabaseKey: string,
	redirectTo: string | undefined,
	user: User | undefined,
}


export default function Login(props: PageProps<DataProps>) {

	return (
		<>
			<Navbar />
			<Container>
				<Stack>
					<Header>
						Login
					</Header>
					{/* <a href="/api/auth/login">
						<Button>
							Login with GitHub
						</Button>
					</a> */}
					<p>Initial: {JSON.stringify(props.data.user)}</p>
					<LoginSection
						{...props.data}
					/>
				</Stack>
			</Container>
		</>
	);
}

export const handler: Handler = async (req, ctx) => {
	const cookies = await getCookies(req.headers);

	const { user } = await supabaseService.auth.api.getUser(cookies["access_token"]);

	return ctx.render({
		supabaseUrl: Deno.env.get("SUPABASE_URL"),
		supabaseKey: Deno.env.get("SUPABASE_ANON_KEY"),
		redirectTo: DEV ? "http://localhost:3000/login" : undefined,
		user,
	} as DataProps)
}