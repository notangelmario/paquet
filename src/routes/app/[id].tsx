import { Head } from "$fresh/runtime.ts";

import type { App } from "@/types/App.ts";
import Navbar, { combineColors } from "@/islands/Navbar.tsx";
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

export default async function App(_: Request, ctx: RouteContext) {
	const app = await getApp(ctx.params.id);
	const otherApps = await getAppsRandom(5, app?.id);
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
				<link rel="manifest" href={`/sandbox/manifest.json?id=${app.id}`} key="manifest"/>
				<link rel="apple-touch-icon" href={buildImageUrl(app.icon, 192, 192)} key="apple-touch-icon"/>
				<link rel="apple-touch-icon" sizes="180x180" href={buildImageUrl(app.icon, 180, 180)} key="apple-touch-icon-180"/>
				<link rel="apple-touch-icon" href={buildImageUrl(app.icon, 192, 192)} key="apple-touch-icon"/>
				<link rel="apple-touch-icon" sizes="180x180" href={buildImageUrl(app.icon, 180, 180)} key="apple-touch-icon-180"/>
				<link rel="apple-touch-startup-image" media="screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" href={`/api/splashscreen?icon=${encodeURIComponent(app.icon)}&bkgColor=${app.accentColor.split("#")[1]}&width=1290&height=2796`} key="apple-touch-startup-image-430-932-3-landscape"/>
				<link rel="apple-touch-startup-image" media="screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" href={`/api/splashscreen?icon=${encodeURIComponent(app.icon)}&bkgColor=${app.accentColor.split("#")[1]}&width=1179&height=2556`} key="apple-touch-startup-image-393-852-3-landscape"/>
				<link rel="apple-touch-startup-image" media="screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" href={`/api/splashscreen?icon=${encodeURIComponent(app.icon)}&bkgColor=${app.accentColor.split("#")[1]}&width=1284&height=2778`} key="apple-touch-startup-image-428-926-3-landscape"/>
				<link rel="apple-touch-startup-image" media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" href={`/api/splashscreen?icon=${encodeURIComponent(app.icon)}&bkgColor=${app.accentColor.split("#")[1]}&width=1170&height=2532`} key="apple-touch-startup-image-390-844-3-landscape"/>
				<link rel="apple-touch-startup-image" media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" href={`/api/splashscreen?icon=${encodeURIComponent(app.icon)}&bkgColor=${app.accentColor.split("#")[1]}&width=1125&height=2436`} key="apple-touch-startup-image-375-812-3-landscape"/>
				<link rel="apple-touch-startup-image" media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" href={`/api/splashscreen?icon=${encodeURIComponent(app.icon)}&bkgColor=${app.accentColor.split("#")[1]}&width=1242&height=2688`} key="apple-touch-startup-image-414-896-3-landscape"/>
				<link rel="apple-touch-startup-image" media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href={`/api/splashscreen?icon=${encodeURIComponent(app.icon)}&bkgColor=${app.accentColor.split("#")[1]}&width=828&height=1792`} key="apple-touch-startup-image-414-896-2-landscape"/>
				<link rel="apple-touch-startup-image" media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" href={`/api/splashscreen?icon=${encodeURIComponent(app.icon)}&bkgColor=${app.accentColor.split("#")[1]}&width=1242&height=2208`} key="apple-touch-startup-image-414-736-3-landscape"/>
				<link rel="apple-touch-startup-image" media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href={`/api/splashscreen?icon=${encodeURIComponent(app.icon)}&bkgColor=${app.accentColor.split("#")[1]}&width=750&height=1334`} key="apple-touch-startup-image-375-667-2-landscape"/>
				<link rel="apple-touch-startup-image" media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href={`/api/splashscreen?icon=${encodeURIComponent(app.icon)}&bkgColor=${app.accentColor.split("#")[1]}&width=640&height=1136`} key="apple-touch-startup-image-320-568-2-landscape"/>
				<link rel="apple-touch-startup-image" media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href={`/api/splashscreen?icon=${encodeURIComponent(app.icon)}&bkgColor=${app.accentColor.split("#")[1]}&width=2048&height=2732`} key="apple-touch-startup-image-1024-1366-2-landscape"/>
				<link rel="apple-touch-startup-image" media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href={`/api/splashscreen?icon=${encodeURIComponent(app.icon)}&bkgColor=${app.accentColor.split("#")[1]}&width=1668&height=2388`} key="apple-touch-startup-image-834-1194-2-landscape"/>
				<link rel="apple-touch-startup-image" media="screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href={`/api/splashscreen?icon=${encodeURIComponent(app.icon)}&bkgColor=${app.accentColor.split("#")[1]}&width=1640&height=2360`} key="apple-touch-startup-image-820-1180-2-landscape"/>
				<link rel="apple-touch-startup-image" media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href={`/api/splashscreen?icon=${encodeURIComponent(app.icon)}&bkgColor=${app.accentColor.split("#")[1]}&width=1668&height=2224`} key="apple-touch-startup-image-834-1112-2-landscape"/>
				<link rel="apple-touch-startup-image" media="screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href={`/api/splashscreen?icon=${encodeURIComponent(app.icon)}&bkgColor=${app.accentColor.split("#")[1]}&width=1620&height=2160`} key="apple-touch-startup-image-810-1080-2-landscape"/>
				<link rel="apple-touch-startup-image" media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href={`/api/splashscreen?icon=${encodeURIComponent(app.icon)}&bkgColor=${app.accentColor.split("#")[1]}&width=1536&height=2048`} key="apple-touch-startup-image-768-1024-2-landscape"/>
				<link rel="apple-touch-startup-image" media="screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" href={`/api/splashscreen?icon=${encodeURIComponent(app.icon)}&bkgColor=${app.accentColor.split("#")[1]}&width=1488&height=2266`} key="apple-touch-startup-image-744-1133-2-landscape"/>
				<link rel="apple-touch-startup-image" media="screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href={`/api/splashscreen?icon=${encodeURIComponent(app.icon)}&bkgColor=${app.accentColor.split("#")[1]}&width=930&height=2016`} key="apple-touch-startup-image-430-932-3-portrait"/>
				<link rel="apple-touch-startup-image" media="screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href={`/api/splashscreen?icon=${encodeURIComponent(app.icon)}&bkgColor=${app.accentColor.split("#")[1]}&width=786&height=1704`} key="apple-touch-startup-image-393-852-3-portrait"/>
				<link rel="apple-touch-startup-image" media="screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href={`/api/splashscreen?icon=${encodeURIComponent(app.icon)}&bkgColor=${app.accentColor.split("#")[1]}&width=856&height=1852`} key="apple-touch-startup-image-428-926-3-portrait"/>
				<link rel="apple-touch-startup-image" media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href={`/api/splashscreen?icon=${encodeURIComponent(app.icon)}&bkgColor=${app.accentColor.split("#")[1]}&width=780&height=1688`} key="apple-touch-startup-image-390-844-3-portrait"/>
				<link rel="apple-touch-startup-image" media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href={`/api/splashscreen?icon=${encodeURIComponent(app.icon)}&bkgColor=${app.accentColor.split("#")[1]}&width=750&height=1624`} key="apple-touch-startup-image-375-812-3-portrait"/>
				<link rel="apple-touch-startup-image" media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href={`/api/splashscreen?icon=${encodeURIComponent(app.icon)}&bkgColor=${app.accentColor.split("#")[1]}&width=828&height=1792`} key="apple-touch-startup-image-414-896-3-portrait"/>
				<link rel="apple-touch-startup-image" media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href={`/api/splashscreen?icon=${encodeURIComponent(app.icon)}&bkgColor=${app.accentColor.split("#")[1]}&width=414&height=896`} key="apple-touch-startup-image-414-896-2-portrait"/>
				<link rel="apple-touch-startup-image" media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href={`/api/splashscreen?icon=${encodeURIComponent(app.icon)}&bkgColor=${app.accentColor.split("#")[1]}&width=828&height=1472`} key="apple-touch-startup-image-414-736-3-portrait"/>
				<link rel="apple-touch-startup-image" media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href={`/api/splashscreen?icon=${encodeURIComponent(app.icon)}&bkgColor=${app.accentColor.split("#")[1]}&width=750&height=1334`} key="apple-touch-startup-image-375-667-2-portrait"/>
				<link rel="apple-touch-startup-image" media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href={`/api/splashscreen?icon=${encodeURIComponent(app.icon)}&bkgColor=${app.accentColor.split("#")[1]}&width=640&height=1136`} key="apple-touch-startup-image-320-568-2-portrait"/>
				<link rel="apple-touch-startup-image" media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href={`/api/splashscreen?icon=${encodeURIComponent(app.icon)}&bkgColor=${app.accentColor.split("#")[1]}&width=1024&height=1366`} key="apple-touch-startup-image-1024-1366-2-portrait"/>
				<link rel="apple-touch-startup-image" media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href={`/api/splashscreen?icon=${encodeURIComponent(app.icon)}&bkgColor=${app.accentColor.split("#")[1]}&width=834&height=1194`} key="apple-touch-startup-image-834-1194-2-portrait"/>
				<link rel="apple-touch-startup-image" media="screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href={`/api/splashscreen?icon=${encodeURIComponent(app.icon)}&bkgColor=${app.accentColor.split("#")[1]}&width=820&height=1180`} key="apple-touch-startup-image-820-1180-2-portrait"/>
				<link rel="apple-touch-startup-image" media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href={`/api/splashscreen?icon=${encodeURIComponent(app.icon)}&bkgColor=${app.accentColor.split("#")[1]}&width=834&height=1112`} key="apple-touch-startup-image-834-1112-2-portrait"/>
				<link rel="apple-touch-startup-image" media="screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href={`/api/splashscreen?icon=${encodeURIComponent(app.icon)}&bkgColor=${app.accentColor.split("#")[1]}&width=810&height=1080`} key="apple-touch-startup-image-810-1080-2-portrait"/>
				<link rel="apple-touch-startup-image" media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href={`/api/splashscreen?icon=${encodeURIComponent(app.icon)}&bkgColor=${app.accentColor.split("#")[1]}&width=768&height=1024`} key="apple-touch-startup-image-768-1024-2-portrait"/>	
				<link rel="apple-touch-startup-image" media="screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href={`/api/splashscreen?icon=${encodeURIComponent(app.icon)}&bkgColor=${app.accentColor.split("#")[1]}&width=744&height=1133`} key="apple-touch-startup-image-744-1133-2-portrait"/>
			</Head>
			<Navbar
				transparentTop
				tint={colorHexToFull(app.accentColor)}
				title={app.name}
				back
			/>
			<style>
				{`
					#ios-overscroll-bkg {
						background-color: ${combineColors(colorHexToFull(app.accentColor) + "50", "#dddddd")}
					}

					@media (prefers-color-scheme: dark) {
						#ios-overscroll-bkg {
							background-color: ${combineColors(colorHexToFull(app.accentColor) + "50", "#121212")}
						}
					}
				`}
			</style>
			<div
				style={{
					zIndex: -1,
					position: "fixed",
					height: "50vh",
					top: 0,
					left: 0,
					right: 0,
				}}
				id="ios-overscroll-bkg"
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
				<Container class="pt-[calc(4rem_+_env(safe-area-inset-top))] mb-4">
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
									{app.authorUrl
										? (
											<a
												href={app.authorUrl}
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
								<div class="min-w-full flex flex-col space-y-2 sm:min-w-[30%]">
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
									{app.allowSandbox ?
										<a
											href={`/sandbox/create?id=${app.id}`}
										>
											<Button
												icon="sandbox"
												fullWidth
												variant="outlined"
											>
												Open in Sandbox
											</Button>
										</a>
									: null}
								</div>
							</div>
						</Card>
						<h3 class="text-2xl">
							About
						</h3>
						{app.description ?
							<p>
								{app.description}
							</p>
						: null}
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
