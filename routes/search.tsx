import { Head } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import type { Handler } from "@/types/Handler.ts";
import type { App } from "@/types/App.ts";
import { supabase } from "@/lib/supabase.ts";
import { getCategory } from "@/lib/categories.ts";
import Stack from "@/components/Stack.tsx";
import ListItem from "@/components/ListItem.tsx";
import Navbar from "@/islands/Navbar.tsx";
import Container from "@/components/Container.tsx";
import SearchBar from "@/components/SearchBar.tsx";

type DataProps = {
	apps: App[];
};

export default function Search({ data, url }: PageProps<DataProps>) {
	return (
		<>
			<Head>
				<title>{url.searchParams.get("q")} &middot; Paquet</title>
			</Head>
			<Navbar
				back
			/>
			<Container class="mt-16">
				<form
					action="/search"
					method="GET"
				>
					<SearchBar
						text={url.searchParams.get("q") || ""}
					/>
				</form>
			</Container>
			<Container
				disableGutters
			>
				<Stack>
					{data.apps.map((app: App, idx: number) => (
						<a href={`/app/${app.id}`}>
							<ListItem
								button
								key={app.id}
								image={app.icon_small}
								title={app.name}
								subtitle={getCategory(app.category)?.name}
								divider={idx !== data.apps.length - 1}
							/>
						</a>
					))}
				</Stack>
			</Container>
		</>
	);
}

export const handler: Handler = async (req, ctx) => {
	const searchParams = new URLSearchParams(req.url.split("?")[1]);
	const query = searchParams.get("q");

	if (!query) {
		return ctx.render({
			apps: [],
		});
	}

	const { data: apps } = await supabase.rpc("search_app", {
		search_term: query,
	}).select("id, name, icon_small, category");

	return ctx.render({
		apps,
	});
};
