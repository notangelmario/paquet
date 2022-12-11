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

interface DataProps {
	app: App;
	otherApps?: App[];
}

export default function App({ data }: PageProps<DataProps>) {
	return (
		<>
			<Head>
				<title>{data.app.name} &middot; Paquet</title>
				<meta
					name="theme-color"
					media="(prefers-color-scheme: dark)"
					content={combineColors(data.app.accent_color + "50", "#121212")}
				/>
				<meta
					name="theme-color"
					media="(prefers-color-scheme: light)"
					content={combineColors(data.app.accent_color + "50", "#ffffff")}
				/>
			</Head>
			<Navbar
				transparentTop
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
				<Container 
					class="pt-16"
				>
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
									<a
										href={`/category/${data.app.category}`}
									>
										{getCategory(data.app.category)?.name}
									</a>
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
										style={{
											backgroundColor: data.app.accent_color,
										}}
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
										image={app.icon}
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
	const { data: app } = await supabase.from("apps")
		.select(
			"id, name, author, description, url, icon, accent_color, screenshots, features, category, github_url, gitlab_url",
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
		.select("id, name, author, icon")
		.eq("category", app.category)
		.neq("id", app.id)
		.limit(3);

	return ctx.render({
		app,
		otherApps,
	} as DataProps);
};


const hexToDecimal = (hex: string) => parseInt(hex, 16);
const decimalToHex = (decimal: number) => decimal.toString(16);

// Please don't touch this. It took me 2 hours to make
// When I made it I knew how it worked. Now I don't.
// And I don't want to figure out. It's magic.
//
// First color is the overlay
// Second is opaque background
function combineColors(c1: string, c2: string) {
	const c1r = hexToDecimal(c1.replace("#", "").slice(0, 2));
	const c1g = hexToDecimal(c1.replace("#", "").slice(2, 4));
	const c1b = hexToDecimal(c1.replace("#", "").slice(4, 6));
	const c1a = hexToDecimal(c1.replace("#", "").slice(6, 8));

	const c2r = hexToDecimal(c2.replace("#", "").slice(0, 2));
	const c2g = hexToDecimal(c2.replace("#", "").slice(2, 4));
	const c2b = hexToDecimal(c2.replace("#", "").slice(4, 6));
	// const c2a = hexToDecimal(c2.replace("#", "").slice(6, 8));

	const afterOpacity = (fg: number[], o: number,bg=[255,255,255]) => fg.map((colFg,idx)=> Math.round(o*colFg+(1-o)*bg[idx]));

	const newColor = afterOpacity([c1r, c1g, c1b], c1a / 255, [c2r, c2g, c2b]);

	return "#" + decimalToHex(newColor[0]) + decimalToHex(newColor[1]) + decimalToHex(newColor[2]);
}
