/**@jsx h */
/**@jsxFrag Fragment */
import { Fragment, h } from "preact";
import type { Handler, PageProps } from "$fresh/server.ts";
import Header from "@/components/Header.tsx";
import Container from "@/components/Container.tsx";
import Stack from "@/components/Stack.tsx";
import Navbar from "@/islands/Navbar.tsx";
import LoginSection from "../islands/LoginSection.tsx";

type DataProps = {
	supabaseUrl: string,
	supabaseKey: string,
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
					<LoginSection 
						supabaseUrl={props.data.supabaseUrl}
						supabaseKey={props.data.supabaseKey}
					/>
				</Stack>
			</Container>
		</>
	);
}


export const handler: Handler = (_, ctx) => {
	return ctx.render({
		supabaseUrl: Deno.env.get("SUPABASE_URL"),
		supabaseKey: Deno.env.get("SUPABASE_ANON_KEY"),
	})
}