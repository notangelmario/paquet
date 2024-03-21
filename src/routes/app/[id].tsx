import { Head } from "$fresh/runtime.ts";

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
import SlideCategories from "@/components/compound/SlideCategories.tsx";
import { buildImageUrl } from "@/lib/image.ts";
import { RouteContext } from "@/types/Handler.ts";
import { getApp, getAppsRandom } from "@/lib/db.ts";
import Card from "@/components/Card.tsx";
import Icon from "@/components/Icon.tsx";
import VerifiedBadge from "@/islands/VerifiedBadge.tsx";

export default async function App(req: Request, ctx: RouteContext) {
	const app = await getApp(ctx.params.id);
	const otherApps = await getAppsRandom(5, false, app?.id);
	const openButtonTextColor = getContrastYIQ(app?.accentColor || "#8267be");

	if (!app) {
		return new Response("Not found", {
			status: 307,
			headers: {
				Location: "/app/error",
			},
		});
	}

	return (
		<>
			<Head>
				<title>{app.name} &middot; Paquet</title>
			</Head>
			<Navbar
				transparentTop
				color={colorHexToFull(app.accentColor)}
				back
			/>
			<div
				style={{
					background: `linear-gradient(
						to bottom, 
						${colorHexToFull(app.accentColor)}50 0%, 
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
									{app.authorLink
										? (
											<a
												href={app.authorLink}
												rel="noopener noreferrer"
												target="_blank"
												class="opacity-50 hover:underline"
											>
												{app.author}
												<Icon
													inline
													size={16}
													name="external-link"
												/>
											</a>
										)
										: (
											<p class="opacity-50">
												{app.author}
											</p>
										)}
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
													app.accentColor,
												boxShadow:
													`0 0 8px ${app.accentColor}`,
												color: openButtonTextColor,
											}}
											iconProps={{
												name: "external-link",
												color: openButtonTextColor,
											}}
										>
											Open
										</Button>
									</a>
								</div>
							</div>
						</Card>
						<h3 class="text-2xl">
							About
						</h3>
						<p>
							{app.description}
						</p>
						{app.certificate && (
							<VerifiedBadge cert={app.certificate} />
						)}
					</Stack>
				</Container>
			</div>

			<SlideCategories
				categoryIds={app.categories}
			/>
			<Container class="mt-4">
				<Divider inset />
			</Container>

			{app.screenshots &&
				(
					<Screenshots
						class="mt-4"
						screenshots={app.screenshots}
					/>
				)}

			{(app?.githubUrl || app?.gitlabUrl) && (
				<Container class="mt-4">
					<AppLinks
						github={app?.githubUrl || undefined}
						gitlab={app?.gitlabUrl || undefined}
					/>
					<Divider class="mt-4" inset />
				</Container>
			)}

			{app.features && (
				<div class="mt-4">
					<Features
						features={app.features}
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
												image={buildImageUrl(
													app.icon,
													64,
													64,
												)}
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

function colorHexToFull(colorHex: string) {
	if (colorHex.length === 4) {
		colorHex = colorHex.replace(
			/^#?([a-f\d])([a-f\d])([a-f\d])$/i,
			function (_, r, g, b) {
				return "#" + r + r + g + g + b + b;
			},
		);
	}

	return colorHex;
}

function getContrastYIQ(colorHex: string) {
	colorHex = colorHexToFull(colorHex);

	const hex = colorHex.replace("#", "");
	const r = parseInt(hex.substring(1, 3), 16);
	const g = parseInt(hex.substring(3, 5), 16);
	const b = parseInt(hex.substring(5, 7), 16);
	const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
	return (yiq >= 128) ? "black" : "white";
}
