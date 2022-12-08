import { Head } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import type { Handler } from "@/types/Handler.ts";
import { supabase } from "@/lib/supabase.ts";
import { getCategory } from "@/lib/categories.ts";

import type { App } from "@/types/App.ts";
import Navbar from "@/islands/Navbar.tsx";
import Stack from "@/components/Stack.tsx";
import Container from "@/components/Container.tsx";
import Button from "@/components/Button.tsx";
import Features from "@/components/Features.tsx";
import ListItem from "@/components/ListItem.tsx";
import Divider from "@/components/Divider.tsx";
import AppLinks from "@/components/AppLinks.tsx";
import Screenshots from "@/components/Screenshots.tsx";

type DataProps = {
	app: App;
	otherApps?: App[];
};

export default function App({ data }: PageProps<DataProps>) {
	return (
		<>
			<Head>
				<title>{data.app.name} &middot; Paquet</title>
			</Head>
			<Navbar back />
			<Container style={{ paddingTop: 64 }}>
				<Stack>
					<div class="flex flex-row flex-wrap gap-4">
						<img
							class="rounded w-20 h-20"
							src={data.app.icon}
						/>
						<div class="flex-1">
							<h2 class="text-3xl">
								{data.app.name}
							</h2>
							<p class="opacity-50">
								{data.app.author} &middot;{" "}
								{getCategory(data.app.category)?.name}
							</p>
						</div>
						<div class="min-w-full sm:min-w-[30%]">
							<a
								href={data.app.url}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Button
									icon="open_in_new"
									fullWidth
								>
									Open
								</Button>
							</a>
						</div>
					</div>
					<div>
						<h3 class="text-2xl">
							About
						</h3>
						<p>
							{data.app.description}
						</p>
					</div>
					<Divider inset />
				</Stack>
			</Container>

			{data.app.screenshots &&
				(
					<Screenshots
						class="mt-4"
						screenshots={data.app.screenshots}
					/>
				)}

			{(data.app?.github_url || data.app?.gitlab_url) && (
				<Container class="mt-4">
					<AppLinks
						github={data.app?.github_url || undefined}
						gitlab={data.app?.gitlab_url || undefined}
					/>
					<Divider class="mt-4" inset />
				</Container>
			)}

			{data.app.features && (
				<div class="mt-4">
					<Features
						features={data.app.features}
					/>
					<Container>
						<Divider class="mt-4" inset />
					</Container>
				</div>
			)}

			{data.otherApps &&
				(
					<>
						<Container>
							<h3 class="text-2xl mt-4">
								Other apps
							</h3>
						</Container>
						<Container disableGutters>
							{data.otherApps.map((app, idx) => (
								<a
									key={idx}
									href={`/app/${app.id}`}
								>
									<ListItem
										button
										title={app.name}
										image={app.icon_small}
										subtitle={app.author}
										divider={idx !==
											(data.otherApps?.length as number) -
												1}
									/>
								</a>
							))}
						</Container>
					</>
				)}
		</>
	);
}

export const handler: Handler = async (_, ctx) => {
	const { data: app } = await supabase.from<App>("apps")
		.select(
			"id, name, author, description, url, icon, screenshots, features, category, github_url, gitlab_url, verified",
		)
		.eq("id", ctx.params.id)
		.single();

	if (!app) {
		return new Response("Not found", {
			status: 307,
			headers: {
				Location: "/app/error",
			},
		});
	}

	const { data: otherApps } = await supabase.from("random_apps")
		.select("id, name, author, icon_small")
		.eq("category", app.category)
		.neq("id", app.id)
		.limit(3);

	return ctx.render({
		app,
		otherApps,
	} as DataProps);
};
