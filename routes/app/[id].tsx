/**@jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts"
import { supabase } from "../../utils/supabase.ts";

import Root from "../../components/Root.tsx";
import Navbar from "../../islands/Navbar.tsx";
import Container from "../../components/Container.tsx";


export default function App(props: PageProps) {
	return (
		<Root>
			<Navbar back/>
			<Container style={{ paddingTop: 64 }}>
				<div className={tw`flex flex-row flex-wrap`}>
					<img
						className={tw`rounded w-20 h-20`}
						src={props.data.iconUrl}
					/>
					<div className={tw`ml-2`}>
						<h2 className={tw`text-3xl`}>
							{props.data.name}
						</h2>
					</div>
					<div className={tw`w-full !sm:w-min`}>
						Hello
					</div>
				</div>
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