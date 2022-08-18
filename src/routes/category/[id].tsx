/**@jsx h */
/**@jsxFrag Fragment */
import { Fragment, h } from "preact";
import { tw } from "@/lib/twind.ts";
import type { PageProps } from "$fresh/server.ts";
import type { Handler } from "@/types/Handler.ts";
import type { Category } from "@/types/App.ts";
import type { App } from "@/types/App.ts";
import { supabase } from "@/lib/supabase.ts";
import { categories } from "@/lib/categories.ts";

import Navbar from "@/islands/Navbar.tsx";
import Header from "@/components/Header.tsx";
import Container from "@/components/Container.tsx";
import ListItem from "@/components/ListItem.tsx";
import FewApps from "@/components/FewApps.tsx";

type DataProps = {
	category: string;
	apps: App[];
};

export default function Category({ data }: PageProps<DataProps>) {
	return (
		<>
			<Navbar back />
			<Container>
				<Header
					icon={categories.find((category) =>
						category.id === data.category
					)?.icon}
				>
					{categories.find((category) =>
						category.id === data.category
					)?.name}
				</Header>
			</Container>
			<Container disableGutters>
				{data.apps.map((app, idx) => (
					<a
						href={`/app/${app.id}`}
						key={app.id}
					>
						<ListItem
							button
							image={app.icon_small}
							title={app.name}
							subtitle={app.author || app.owner?.name}
							divider={idx !== data.apps.length - 1}
						/>
					</a>
				))}
			</Container>
			<Container class={tw`mt-4`}>
				<FewApps />
			</Container>
		</>
	);
}

export const handler: Handler = async (_, ctx) => {
	const category = ctx.params.id;

	if (!category) {
		return new Response("Not found", {
			status: 307,
			headers: {
				Location: "/"
			}
		});
	}

	const { data: apps } = await supabase
		.from<App>("apps")
		.select("id, name, icon_small, author")
		.eq("category", category);

	if (!apps) {
		return new Response("Not found", {
			status: 307,
			headers: {
				Location: "/"
			}
		});
	}

	return ctx.render({
		category,
		apps,
	} as DataProps);
};
