import { Head } from "$fresh/runtime.ts";
import type { PageProps, RouteContext } from "$fresh/server.ts";
import type { Handler } from "@/types/Handler.ts";
import type { Category } from "@/types/App.ts";
import type { App } from "@/types/App.ts";
import { getCategory } from "@/lib/categories.ts";

import Navbar from "@/islands/Navbar.tsx";
import Card from "@/components/Card.tsx";
import Header from "@/components/Header.tsx";
import Container from "@/components/Container.tsx";
import ListItem from "@/components/ListItem.tsx";
import FewApps from "@/components/compound/FewApps.tsx";
import Stack from "@/components/Stack.tsx";
import { dbGet } from "@/lib/db.ts";


export default async function Category(_: Request, ctx: RouteContext) {
	const category = ctx.params.id;

	if (!category) {
		return new Response("Not found", {
			status: 307,
			headers: {
				Location: "/home",
			},
		});
	}
	
	const apps = await dbGet<App[]>(`select id, name, icon, author from apps where categories like '%${category}%';`);

	if (!apps) {
		return new Response("Not found", {
			status: 307,
			headers: {
				Location: "/home",
			},
		});
	}

	return (
		<>
			<Head>
				<title>
					{getCategory(category)?.name} &middot; Paquet
				</title>
			</Head>
			<Navbar back />
			<Container>
				<Stack>
					<Header
						icon={getCategory(category)?.icon}
					>
						{getCategory(category)?.name}
					</Header>
					<Card disableGutters>
						{apps.map((app, idx) => (
							<a
								href={`/app/${app.id}`}
								key={app.id}
							>
								<ListItem
									button
									image={app.icon}
									title={app.name}
									subtitle={app.author}
									divider={idx !== apps.length - 1}
								/>
							</a>
						))}
					</Card>
					<FewApps />
				</Stack>
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
				Location: "/home",
			},
		});
	}

	const { data: apps } = await supabase
		.from("apps")
		.select("id, name, icon, author")
		.contains("categories", [category]);

	if (!apps) {
		return new Response("Not found", {
			status: 307,
			headers: {
				Location: "/home",
			},
		});
	}

	return ctx.render({
		category,
		apps,
	} as DataProps);
};
