import { Head } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import type { Handler } from "@/types/Handler.ts";
import type { App, Category } from "@/types/App.ts";
import { getCategory, searchCategory } from "@/lib/categories.ts";
import ListItem from "@/components/ListItem.tsx";
import Button from "@/components/Button.tsx";
import SlideItem from "@/components/SlideItem.tsx";
import SlideContainer from "@/components/SlideContainer.tsx";
import Navbar from "@/islands/Navbar.tsx";
import Container from "@/components/Container.tsx";
import SearchBar from "@/components/SearchBar.tsx";
import Stack from "@/components/Stack.tsx";
import Card from "@/components/Card.tsx";
import { getApps } from "@/lib/pocketbase.ts";

type DataProps = {
	categories: Category[];
	apps: App[];
	moreApps: App[];
};

export default function Search({ data, url }: PageProps<DataProps>) {
	return (
		<>
			<Head>
				<title>{url.searchParams.get("q")} &middot; Paquet</title>
			</Head>
			<Navbar
				back
			/>
			<Container class="mt-16 mb-4">
				<form
					action="/search"
					method="GET"
				>
					<SearchBar
						text={url.searchParams.get("q") || ""}
					/>
				</form>
			</Container>
			{data.categories.length > 0 && (
				<SlideContainer>
					{data.categories.map((category, idx) => (
						<SlideItem
							key={category.id}
							isLast={data.categories &&
								idx === data.categories.length - 1}
						>
							<a
								href={`/category/${category.id}`}
							>
								<Button
									icon={category.icon}
									outlined
								>
									{category.name}
								</Button>
							</a>
						</SlideItem>
					))}
				</SlideContainer>
			)}
			<Container class="mt-4">
				<Stack>
					<Card disableGutters>
						{data.apps?.length
							? data.apps.map((app: App, idx: number) => (
								<a href={`/app/${app.id}`}>
									<ListItem
										button
										key={app.id}
										image={app.icon}
										title={app.name}
										subtitle={app.categories
											?.map((category) =>
												getCategory(
													category,
												)?.name
											).join(", ")}
										divider={idx !== data.apps.length - 1}
									/>
								</a>
							))
							: (
								<p class="text-center opacity-50">
									No results found
								</p>
							)}
					</Card>
					{data.moreApps && data.moreApps.length
						? (
							<>
								<h2 class="text-2xl">
									More apps
								</h2>
								<Card disableGutters>
									{data.moreApps.map((
										app: App,
										idx: number,
									) => (
										<a href={`/app/${app.id}`}>
											<ListItem
												button
												key={app.id}
												image={app.icon}
												title={app.name}
												subtitle={app.categories
													?.map((category) =>
														getCategory(
															category,
														)?.name
													).join(", ")}
												divider={idx !==
													data.moreApps.length - 1}
											/>
										</a>
									))}
								</Card>
							</>
						)
						: null}
				</Stack>
			</Container>
		</>
	);
}

export const handler: Handler = async (req, ctx) => {
	const searchParams = new URLSearchParams(req.url.split("?")[1]);
	const query = searchParams.get("q");

	if (!query) {
		return new Response("No query provided", {
			status: 307,
			headers: {
				Location: "/",
			},
		});
	}

	const { apps } = await getApps(1, 20, {
		filter: `name ~ "${query}"`
	})

	const categories = searchCategory(query);

	let moreApps: App[] = [];
	if (apps !== null && apps.length < 10) {
		const { apps: data } = await getApps(1, 5, {
			sort: "@random",
			filter: `id !~ "${apps.map(app => app.id)}"`
		})

		if (data && data.length > 0) {
			moreApps = data as App[];
		}
	}

	return ctx.render({
		categories,
		apps,
		moreApps,
	});
};
