/**@jsx h */
/**@jsxFrag Fragment */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import type { Handlers, PageProps } from "$fresh/server.ts";
import type { App } from "@/types/App.ts";
import { supabase } from "@supabase";
import Stack from "@/components/Stack.tsx";
import ListItem from "@/components/ListItem.tsx";
import Navbar from "@/islands/Navbar.tsx";
import Container from "@/components/Container.tsx";
import SearchBar from "@/components/SearchBar.tsx";

type DataProps = {
	apps: App[];
};

export default function Search(props: PageProps<DataProps>) {
	return (
		<>
			<Navbar
				back
			/>
			<Container
				class={tw`
					mt-16
				`}
			>
				<form
					action="/search"
					method="GET"
				>
					<SearchBar
						text={props.url.searchParams.get("q") || ""}
					/>
				</form>
			</Container>
			<Container
				disableGutters
			>
				<Stack>
					{props.data.apps?.map((app: App, idx: number) => (
						<a href={`/app/${app.id}`}>
							<ListItem
								button
								key={app.id}
								image={app.icon_small}
								title={app.name}
								subtitle={app.category.name}
								divider={idx !== props.data.apps.length - 1}
							/>
						</a>
						// <AppListItem
						// 	app={app}
						// />
					))}
				</Stack>
			</Container>
		</>
	);
}

export const handler: Handlers = {
	async GET(req, ctx) {
		const searchParams = new URLSearchParams(req.url.split("?")[1]);
		const query = searchParams.get("q");

		if (!query) {
			return ctx.render({
				apps: [],
			});
		}

		const { data: apps } = await supabase.rpc("search_app", {
			search_term: query,
		}).select("id, name, icon_small, category:categories(*)");

		return ctx.render({
			apps,
		});
	},
};
