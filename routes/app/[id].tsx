/**@jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts"
import { supabase } from "../../utils/supabase.ts";

import Root from "../../components/Root.tsx";
import Navbar from "../../islands/Navbar.tsx";
import Container from "../../components/Container.tsx";


export default function App(props: PageProps) {
	return (
		<Root>
			<Navbar back/>
			<Container>
				
			</Container>
		</Root>
	)
}

export const handler: Handlers = {
	async GET(_, ctx) {
		const { data } = await supabase.from("apps").select("*").eq("id", ctx.params.id).single();

		if (!data) {
			return Response.redirect("/", 300)
		}
		return ctx.render(data);
	}
}