import { Head } from "$fresh/runtime.ts";
import type { RouteContext } from "$fresh/server.ts";

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
import Card from "@/components/Card.tsx";
import SlideCategories from "@/components/compound/SlideCategories.tsx";
import { buildImageUrl } from "@/lib/image.ts";
import { convertStringToArray, dbGet } from "@/lib/db.ts";


export default async function App(_: Request, ctx: RouteContext) {
	const appId = ctx.params.id;
	const app = await dbGet<App[]>(`select * from apps where id = '${appId}';`).then((res) => res?.[0]);


	if (!app) {
		return new Response("Not found", {
			status: 307,
			headers: {
				Location: "/app/error",
			},
		});
	}

	const otherApps = await dbGet<App[]>(`select id, name, author, icon from apps where id != '${app.id}' order by random() limit 5;`);

	return (
		<>
			<Head>
				<title>{app.name} &middot; Paquet</title>
			</Head>
			<Navbar
				transparentTop
				color={app.accent_color}
				back
			/>
			<div
				style={{
					background: `linear-gradient(
						to bottom, 
						${app.accent_color}50 0%, 
						rgba(0, 0, 0, 0) 100%)
					`,
				}}
			>
				<Container class="pt-16 mb-4">
					<Stack>
						<Card
							inset
							disableGutters
							class="bg-light dark:bg-dark"
						>
							{app.cover &&
								(
									<img
										src={app.cover}
										class="w-full h-32 object-cover rounded-t"
									/>
								)}
							<div class="flex flex-row flex-wrap gap-4 p-4 shadow-inset-light dark:shadow-inset-dark">
								<img
									class="rounded w-20 h-20 shadow-outset-light dark:shadow-outset-dark bg-light-light dark:bg-dark-light"
									src={buildImageUrl(app.icon, 96, 96)}
								/>
								<div class="flex-1">
									<h2 class="text-3xl">
										{app.name}
									</h2>
									<p class="opacity-50">
										{app.author}
									</p>
								</div>
								<div class="min-w-full space-y-2 sm:min-w-[30%]">
									<a
										href={app.url}
										target="_blank"
										rel="noopener noreferrer"
									>
										<Button
											icon="external-link"
											fullWidth
											style={{
												backgroundColor:
													app.accent_color,
												boxShadow:
													`0 0 8px ${app.accent_color}`,
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
									{/*
									{userLoggedIn
										? (
											<LoveAppButton
												app={app}
												ssrLoved={ssrLoved}
											/>
										)
										: (
											<a href="/login" class="block">
												<Button
													variant="outlined"
													fullWidth
													icon="heart"
												>
													Login to give hearts
												</Button>
											</a>
										)}
									*/}
								</div>
							</div>
						</Card>
						<div>
							<h3 class="text-2xl">
								About
							</h3>
							<p>
								{app.description}
							</p>
						</div>
					</Stack>
				</Container>
			</div>

			<SlideCategories
				categoryIds={convertStringToArray(app.categories)}
			/>
			<Container class="mt-4">
				<Divider inset />
			</Container>

			{app.screenshots &&
				(
					<Screenshots
						class="mt-4"
						screenshots={convertStringToArray(app.screenshots)}
					/>
				)}

			{(app?.github_url || app?.gitlab_url) && (
				<Container class="mt-4">
					<AppLinks
						github={app?.github_url || undefined}
						gitlab={app?.gitlab_url || undefined}
					/>
					<Divider class="mt-4" inset />
				</Container>
			)}

			{app.features && (
				<div class="mt-4">
					<Features
						features={convertStringToArray(app.features)}
					/>
					<Container>
						<Divider class="mt-4" inset />
					</Container>
				</div>
			)}

			{otherApps?.length
				? (
					<>
						<Container>
							<Stack>
								<h3 class="text-2xl mt-4">
									Other apps
								</h3>
								<Card disableGutters>
									{otherApps.map((app, idx) => (
										<a
											key={idx}
											href={`/app/${app.id}`}
										>
											<ListItem
												button
												title={app.name}
												image={buildImageUrl(app.icon, 64, 64)}
												subtitle={app.author}
												divider={idx !==
													(otherApps
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
