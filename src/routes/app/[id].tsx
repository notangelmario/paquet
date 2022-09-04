/**@jsx h */
/**@jsxFrag Fragment */
import { Fragment, h } from "preact";
import { tw } from "@/lib/twind.ts";
import { Head } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import type { Handler } from "@/types/Handler.ts";
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
import { getApp, getApps } from "@/lib/app.ts";

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
					<div class={tw`flex flex-row flex-wrap gap-4`}>
						<img
							class={tw`
								rounded w-20 h-20
							`}
							src={data.app.iconLarge}
						/>
						<div class={tw`flex-1`}>
							<h2 class={tw`text-3xl`}>
								{data.app.name}
							</h2>
							<p class={tw`opacity-50`}>
								{data.app.author} &middot;{" "}
								{getCategory(data.app.category)?.name}
							</p>
						</div>
						<div class={tw`min-w-full sm:min-w-[30%]`}>
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
						<h3 class={tw`text-2xl`}>
							About
						</h3>
						<p>
							{data.app.description}
						</p>
					</div>
					<Divider inset />
				</Stack>
			</Container>

			{(data.app?.githubUrl || data.app?.gitlabUrl) && (
				<Container class={tw`mt-4`}>
					<AppLinks
						github={data.app?.githubUrl || undefined}
						gitlab={data.app?.gitlabUrl || undefined}
					/>
					<Divider class="mt-4" inset />
				</Container>
			)}

			{data.app.features && (
				<div class={tw`mt-4`}>
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
							<h3 class={tw`text-2xl mt-4`}>
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
										image={app.iconSmall}
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
	const app = await getApp(ctx.params.id);

	if (!app) {
		return new Response("Not found", {
			status: 307,
			headers: {
				Location: "/app/error",
			},
		});
	}

	let otherApps = await getApps({
		limit: 4,
		random: true,
		category: app.category,
	})

	if (otherApps) {
		otherApps = otherApps.filter(a => a.id !== app.id);
		otherApps = otherApps.slice(0, 3)
	}

	return ctx.render({
		app,
		otherApps
	} as DataProps);
};
