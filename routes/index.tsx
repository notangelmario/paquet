/** @jsx h */
import { h } from "preact";
import { PageProps, Handlers } from "$fresh/server.ts";
import Root from "../components/Root.tsx";
import Header from "../components/Header.tsx";
import Container from "../components/Container.tsx";
import { supabase } from "@supabase";
import type { App } from "../types/App.ts";
import AppListItem from "../components/AppListItem.tsx";


export default function Home(props: PageProps) {
	return (
		<Root>
			<Container>
				<Header style={{ paddingBottom: 16 }}>
					Home
				</Header>
				{props.data?.map((app: App) => (
					<AppListItem
						app={app}
					/>
				))}
			</Container>
		</Root>
	);
}

export const handler: Handlers = {
	async GET(_, ctx) {
		const { data: apps } = await supabase.from("apps").select("*");

		return ctx.render(apps);
	}
}