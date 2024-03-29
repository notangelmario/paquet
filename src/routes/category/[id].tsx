import { Head } from "$fresh/runtime.ts";
import type { RouteContext } from "$fresh/server.ts";
import type { Category } from "@/types/App.ts";
import { getCategory } from "@/lib/categories.ts";

import Navbar from "@/islands/Navbar.tsx";
import Card from "@/components/Card.tsx";
import Header from "@/components/Header.tsx";
import Container from "@/components/Container.tsx";
import ListItem from "@/components/ListItem.tsx";
import FewApps from "@/components/compound/FewApps.tsx";
import Stack from "@/components/Stack.tsx";
import { getAppsByCategory } from "@/lib/db.ts";
import { buildImageUrl } from "@/lib/image.ts";

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

	const apps = await getAppsByCategory(50, category);

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
			<Navbar 
				title={getCategory(category)?.name}
				back 
			/>
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
									image={buildImageUrl(app.icon, 64, 64)}
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
