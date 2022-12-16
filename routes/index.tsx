import type { PageProps } from "$fresh/server.ts";
import type { App } from "@/types/App.ts";
import type { Handler } from "@/types/Handler.ts";
import { Head } from "$fresh/runtime.ts";
import Stack from "@/components/Stack.tsx";
import Header from "@/components/Header.tsx";
import Container from "@/components/Container.tsx";
import { supabase } from "@/lib/supabase.ts";
import { CATEGORIES, getCategory } from "@/lib/categories.ts";
import Navbar from "@/islands/Navbar.tsx";
import Icon from "@/components/Icon.tsx";
import Button from "@/components/Button.tsx";
import ListItem from "@/components/ListItem.tsx";
import FewApps from "@/components/FewApps.tsx";
import InstallBanner from "@/islands/InstallBanner.tsx";
import SearchBar from "@/components/SearchBar.tsx";
import Announcement from "@/components/Announcement.tsx";
import SlideContainer from "@/components/SlideContainer.tsx";
import SlideItem from "@/components/SlideItem.tsx";
import ImageCard from "@/components/ImageCard.tsx";

import LibraryApps from "@/islands/LibraryApps.tsx";
import OfflineLibraryNotice from "@/islands/OfflineLibraryNotice.tsx";

interface DataProps {
	newApps?: App[];
	randomCards?: App[];
	randomApps?: App[];
	randomCategory?: {
		category: string;
		apps: App[];
	};
}

export default function Home({ data }: PageProps<DataProps>) {
	return (
		<>
			<Head>
				<title>Paquet</title>
			</Head>
			<Navbar
				right={[
					{
						icon: "dashboard",
						href: "/library",
					},
					{
						icon: "settings",
						href: "/settings",
					}
				]}
			/>
			<Stack>
				<Container>
					<Stack>
						<Header icon="home">
							Home
						</Header>
						<a
							href="https://angelmario.eu/blog/young-entrepreneurship"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Announcement>
								🥳 Paquet won a contest at a{" "}
								<b>youth exchange</b>{" "}
								project about young entrepreneurship. Read more
								about it here!
							</Announcement>
						</a>
						<form
							action="/search"
							method="GET"
						>
							<SearchBar />
						</form>
					</Stack>
				</Container>
				<SlideContainer>
					<SlideItem>
						<a href="/category">
							<Button
								icon="apps"
								outlined
							>
								All
							</Button>
						</a>
					</SlideItem>
					{CATEGORIES.map((category, idx) => (
						<SlideItem
							key={category.id}
							isLast={idx === CATEGORIES.length - 1}
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

				<SlideContainer>
					{data.randomCards?.map((app, idx) => (
						<SlideItem
							key={idx}
							isLast={data.randomApps &&
								idx === data.randomApps.length - 1}
						>
							<a
								href={`/app/${app.id}`}
							>
								<ImageCard
									class="flex flex-col gap-y-4 w-64"
									// Weird stuff man
									image={(app.screenshots!)[0]}
								>
									<img
										src={app.icon}
										class="rounded w-16 h-16"
									/>
									<h2 class="text-2xl">
										{app.name}
									</h2>
								</ImageCard>
							</a>
						</SlideItem>
					))}
				</SlideContainer>
				{data.newApps &&
					(
						<div>
							<Container>
								<h2 class="text-2xl">
									<Icon
										name="star"
										inline
									/>{" "}
									New apps
								</h2>
							</Container>
							<SlideContainer>
								{/* This sorts every 2 elements */}
								{data.newApps.reduce(
									function (
										accumulator,
										_,
										currentIndex,
										array,
									) {
										if (currentIndex % 2 === 0) {
											accumulator.push(
												array.slice(
													currentIndex,
													currentIndex + 2,
												) as never,
											);
										}
										return accumulator;
									},
									[],
								)
									.map((
										row: App[],
										idx: number,
									) => (
										<SlideItem
											key={idx}
											disableGutters
											isLast={data.newApps &&
												idx ===
													data.newApps.length - 1}
										>
											{row.map((app, idx) => (
												<a
													href={`/app/${app.id}`}
													key={idx}
												>
													<ListItem
														button
														key={app.id}
														style={{ width: 300 }}
														image={app.icon}
														title={app.name}
														subtitle={getCategory(
															app.category,
														)
															?.name}
														divider={idx === 0}
													/>
												</a>
											))}
										</SlideItem>
									))}
							</SlideContainer>
						</div>
					)}
			</Stack>
			<Container>
				<InstallBanner />
			</Container>
			<Stack>
				{data.randomApps &&
					(
						<div>
							<Container>
								<h2 class="text-2xl">
									Random picks
								</h2>
							</Container>
							<Container disableGutters>
								{data.randomApps.map((
									app: App,
									idx: number,
								) => (
									<a href={`/app/${app.id}`}>
										<ListItem
											button
											key={app.id}
											image={app.icon}
											title={app.name}
											subtitle={getCategory(app.category)
												?.name}
											divider={data.randomApps &&
												idx !==
													data.randomApps.length - 1}
										/>
									</a>
								))}
							</Container>
						</div>
					)}

				{data.randomCategory &&
					(
						<div>
							<Container>
								<h2 class="text-2xl">
									Looking for{" "}
									{getCategory(data.randomCategory.category)
										?.name}?
								</h2>
							</Container>
							<Container disableGutters>
								{data.randomCategory.apps.map((
									app: App,
									idx: number,
								) => (
									<a href={`/app/${app.id}`}>
										<ListItem
											button
											key={app.id}
											image={app.icon}
											title={app.name}
											subtitle={app.author}
											divider={data.randomCategory
												?.apps &&
												idx !==
													data.randomCategory.apps
															.length - 1}
										/>
									</a>
								))}
							</Container>
						</div>
					)}
				<Container class="mt-4">
					<FewApps />
				</Container>
				{/* Those are esential here to cache them when in homepage */}
				{/* This is a fix until we have a proper solution from fresh */}
				<div class="hidden">
					<OfflineLibraryNotice />
					<LibraryApps />
				</div>
			</Stack>
		</>
	);
}

export const handler: Handler = async (_, ctx) => {
	const randomCategoryId: string =
		CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)].id;

	const daysAgo = 30;
	const date = new Date(new Date().setDate(new Date().getDate() - daysAgo));

	const [
		{ data: randomCategoryApps },
		{ data: newApps },
		{ data: randomApps },
		{ data: randomCards },
	] = await Promise.all([
		supabase.from("random_apps")
			.select("id, name, icon, author, category")
			.eq("category", randomCategoryId)
			.limit(5),
		supabase.from("apps")
			.select("id, name, icon, category, addedOn")
			.order("addedOn", { ascending: false })
			.gte("addedOn", date.toDateString()),
		supabase.from("random_apps")
			.select("id, name, icon, category")
			.limit(5),
		supabase.from("random_apps")
			.select("id, name, icon, screenshots")
			.not("screenshots", "is", null)
			.limit(5),
	]);

	const randomCategory = randomCategoryApps?.length
		? {
			category: randomCategoryId,
			apps: randomCategoryApps,
		}
		: undefined;

	return ctx.render({
		newApps,
		randomCards,
		randomApps,
		randomCategory,
	} as DataProps);
};
