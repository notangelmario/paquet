import { Head } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import type { Handler } from "@/types/Handler.ts";
import { supabase, supabaseAs } from "@/lib/supabase.ts";

import type { App } from "@/types/App.ts";
import Navbar from "@/islands/Navbar.tsx";
import Stack from "@/components/Stack.tsx";
import Container from "@/components/Container.tsx";
import Button from "@/components/Button.tsx";
import Features from "@/components/compound/Features.tsx";
import ListItem from "@/components/ListItem.tsx";
import Divider from "@/components/Divider.tsx";
import AppLinks from "@/components/compound/AppLinks.tsx";
import Screenshots from "@/components/compound/Screenshots.tsx";
import LoveAppButton from "@/islands/LoveAppButton.tsx";
import Card from "@/components/Card.tsx";
import SlideCategories from "@/components/compound/SlideCategories.tsx";

interface DataProps {
	app: App;
	otherApps?: App[];
	ssrLoved: boolean;
}

export default function App({ data }: PageProps<DataProps>) {
	return (
		<>
			<Head>
				<title>{data.app.name} &middot; Paquet</title>
			</Head>
			<Navbar
				transparentTop
				color={data.app.accent_color}
				back
			/>
			<div
				style={{
					background: `linear-gradient(
						to bottom, 
						${data.app.accent_color}50 0%, 
						rgba(0, 0, 0, 0) 100%)
					`,
				}}
			>
				<Container class="pt-16 mb-4">
					<Stack>
						<Card
							inset
							class="bg-light dark:bg-dark flex flex-row flex-wrap gap-4"
						>
							<img
								class="rounded w-20 h-20 shadow-outset-light dark:shadow-outset-dark bg-light-light dark:bg-dark-light"
								src={data.app.icon}
							/>
							<div class="flex-1">
								<h2 class="text-3xl">
									{data.app.name}
								</h2>
								<p class="opacity-50">
									{data.app.author}
								</p>
							</div>
							<div class="min-w-full space-y-2 sm:min-w-[30%]">
								<a
									href={data.app.url}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Button
										icon="external-link"
										fullWidth
										style={{
											backgroundColor:
												data.app.accent_color,
											boxShadow:
												`0 0 8px ${data.app.accent_color}`,
											color: "#ffffff",
										}}
										iconProps={{
											name: "external-link",
											color: "#ffffff",
										}}
									>
										Open
									</Button>
								</a>
								<LoveAppButton
									app={data.app}
									ssrLoved={data.ssrLoved}
								/>
							</div>
						</Card>
						<div>
							<h3 class="text-2xl">
								About
							</h3>
							<p>
								{data.app.description}
							</p>
						</div>
					</Stack>
				</Container>
				<SlideCategories
					categoryIds={data.app.categories}
				/>
				<Container class="mt-4">
					<Divider inset />
				</Container>
			</div>

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

			{data.otherApps?.length
				? (
					<>
						<Container>
							<Stack>
								<h3 class="text-2xl mt-4">
									Other apps
								</h3>
								<Card disableGutters>
									{data.otherApps.map((app, idx) => (
										<a
											key={idx}
											href={`/app/${app.id}`}
										>
											<ListItem
												button
												title={app.name}
												image={app.icon}
												subtitle={app.author}
												divider={idx !==
													(data.otherApps
															?.length as number) -
														1}
											/>
										</a>
									))}
								</Card>
							</Stack>
						</Container>
					</>
				)
				: null}
		</>
	);
}

export const handler: Handler = async (_, ctx) => {
	const { data: app } = await supabase.from("apps")
		.select(
			"id, name, author, description, url, icon, accent_color, screenshots, features, categories, github_url, gitlab_url",
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

	let ssrLoved = false;
	if (ctx.state.user) {
		const supabase = supabaseAs(ctx.state.user.access_token);

		const { data } = await supabase.from("users")
			.select("loved")
			.eq("id", ctx.state.user.id)
			.single();

		if (data) {
			ssrLoved = data.loved.includes(app.id);
		}
	}

	const { data: otherApps } = await supabase.from("random_apps")
		.select("id, name, author, icon")
		.containedBy("categories", app.categories)
		.neq("id", app.id)
		.limit(5);

	return ctx.render({
		app,
		otherApps,
		ssrLoved,
	} as DataProps);
};
