import { Head } from "$fresh/runtime.ts";
import type { App } from "@/types/App.ts";
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
import { searchApps } from "@/lib/db.ts";
import { buildImageUrl } from "@/lib/image.ts";

export default async function Search(req: Request) {
	const searchParams = new URLSearchParams(req.url.split("?")[1]);
	const query = searchParams.get("q");

	if (!query) {
		return new Response("No query provided", {
			status: 307,
			headers: {
				Location: "/home",
			},
		});
	}

	const apps = await searchApps(20, query);
	const categories = searchCategory(query);
	const moreApps: App[] = [];

	return (
		<>
			<Head>
				<title>{query} &middot; Paquet</title>
			</Head>
			<Navbar
				title={query}
				back
			/>
			<Container class="mt-16 mb-4">
				<form
					action="/search"
					method="GET"
				>
					<SearchBar
						text={query || ""}
					/>
				</form>
			</Container>
			{categories.length > 0 && (
				<SlideContainer>
					{categories.map((category, idx) => (
						<SlideItem
							key={category.id}
							isLast={categories &&
								idx === categories.length - 1}
						>
							<a
								href={`/category/${category.id}`}
							>
								<Button
									icon={category.icon}
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
						{apps
							? apps.map((app: App, idx: number) => (
								<a href={`/app/${app.id}`}>
									<ListItem
										button
										key={app.id}
										image={buildImageUrl(app.icon, 96, 96)}
										title={app.name}
										subtitle={app.categories
											?.map((category) =>
												getCategory(
													category,
												)?.name
											).join(", ")}
										divider={idx !== apps.length - 1}
									/>
								</a>
							))
							: (
								<p class="text-center opacity-50">
									No results found
								</p>
							)}
					</Card>
					{moreApps && moreApps.length
						? (
							<>
								<h2 class="text-2xl">
									More apps
								</h2>
								<Card disableGutters>
									{moreApps.map((
										app: App,
										idx: number,
									) => (
										<a href={`/app/${app.id}`}>
											<ListItem
												button
												key={app.id}
												image={buildImageUrl(
													app.icon,
													96,
													96,
												)}
												title={app.name}
												subtitle={app.categories
													?.map((category) =>
														getCategory(
															category,
														)?.name
													).join(", ")}
												divider={idx !==
													moreApps.length - 1}
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
