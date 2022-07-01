/**@jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts"
import AppListItem from "../../components/AppListItem.tsx";
import { supabase } from "../../utils/supabase.ts";


export default function App(props: PageProps) {
	return (
		<AppListItem app={props.data} />
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