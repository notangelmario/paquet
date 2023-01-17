import { Head } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import type { Handler } from "@/types/Handler.ts";
import type { Category } from "@/types/App.ts";
import type { App } from "@/types/App.ts";
import { getApps } from "@/lib/pocketbase.ts";
import { getCategory } from "@/lib/categories.ts";

import Navbar from "@/islands/Navbar.tsx";
import Card from "@/components/Card.tsx";
import Header from "@/components/Header.tsx";
import Container from "@/components/Container.tsx";
import ListItem from "@/components/ListItem.tsx";
import FewApps from "@/components/compound/FewApps.tsx";
import Stack from "@/components/Stack.tsx";

type DataProps = {
	category: string;
	apps: App[];
};

export default function Category({ data }: PageProps<DataProps>) {
	return (
		<>
			<Head>
				<title>
					{getCategory(data.category)?.name} &middot; Paquet
				</title>
			</Head>
			<Navbar back />
			<Container>
				<Stack>
					<Header
						icon={getCategory(data.category)?.icon}
					>
						{getCategory(data.category)?.name}
					</Header>
					<Card disableGutters>
						{data.apps.map((app, idx) => (
							<a
								href={`/app/${app.id}`}
								key={app.id}
							>
								<ListItem
									button
									image={app.icon}
									title={app.name}
									subtitle={app.author}
									divider={idx !== data.apps.length - 1}
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
				Location: "/",
			},
		});
	}

	const { apps } = await getApps(1, 50, {
		filter: `categories ~ "${category}"`
	})

	if (!apps) {
		return new Response("Not found", {
			status: 307,
			headers: {
				Location: "/",
			},
		});
	}

	return ctx.render({
		category,
		apps,
	} as DataProps);
};
