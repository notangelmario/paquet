import { Head } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import type { Handler } from "@/types/Handler.ts";
import { getApp, getApps, getPocketbase } from "@/lib/pocketbase.ts";

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
import AddToLibrary from "@/islands/AddToLibrary.tsx";
import Card from "@/components/Card.tsx";
import SlideCategories from "@/components/compound/SlideCategories.tsx";

interface DataProps {
	app: App;
	otherApps?: App[];
	ssrInLibrary: boolean;
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
								<AddToLibrary
									app={data.app}
									ssrInLibrary={data.ssrInLibrary}
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
	const { app, error } = await getApp(ctx.params.id);

	if (!app) {
		return new Response(error?.message, {
			status: 307,
			headers: {
				Location: "/app/error",
			},
		});
	}

	let ssrInLibrary = false;
	if (ctx.state.user) {
		const pocketbase = getPocketbase();

		const data = await pocketbase.collection("users")
			.getOne(ctx.state.user.id)

		if (data) {
			ssrInLibrary = data.library.includes(app.id);
		}
	}
	
	const { apps: otherApps } = await getApps(1, 5, {
		sort: "@random"
	});

	return ctx.render({
		app,
		otherApps,
		ssrInLibrary,
	} as DataProps);
};
