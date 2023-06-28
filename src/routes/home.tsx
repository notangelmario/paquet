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
import Button from "@/components/Button.tsx";
import ListItem from "@/components/ListItem.tsx";
import FewApps from "@/components/compound/FewApps.tsx";
import InstallBanner from "@/islands/InstallBanner.tsx";
import SearchBar from "@/components/SearchBar.tsx";
import SlideContainer from "@/components/SlideContainer.tsx";
import SlideItem from "@/components/SlideItem.tsx";
import ImageCard from "@/components/compound/ImageCard.tsx";
import Card from "@/components/Card.tsx";

interface DataProps {
	newApps?: App[];
	lovedApps?: App[];
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
						icon: "heart",
						href: "/loved",
					},
					{
						icon: "settings",
						href: "/settings",
					},
				]}
			/>
			<Stack>
				<Container>
					<Stack>
						<Header icon="home">
							Home
						</Header>
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
								icon="list"
								variant="outlined"
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
									variant="primary"
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
									image={app.cover!}
								>
									<img
										src={app.icon}
										class="rounded-xl w-16 h-16"
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
										if (currentIndex % 3 === 0) {
											accumulator.push(
												array.slice(
													currentIndex,
													currentIndex + 3,
												) as never,
											);
										}
										return accumulator;
									},
									[],
								)
									.map((
										col: App[],
										idx: number,
									) => (
										<SlideItem
											key={idx}
											disableGutters
											isLast={data.newApps &&
												idx ===
												data.newApps.length - 1}
										>
											{col.map((app, idx) => (
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
														subtitle={app.categories
															?.map((category) =>
																getCategory(
																	category,
																)?.name
															).join(", ")}
														divider={idx !== 2}
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
			{data.lovedApps && (
				<Container>
					<Card disableGutters>
						<h2 class="text-2xl mt-4 ml-4">
							Top 5 most loved apps
						</h2>
						{data.lovedApps.map((app, idx) => (
							<a href={`/app/${app.id}`}>
								<ListItem
									button
									key={app.id}
									image={app.icon}
									title={app.name}
									subtitle={app.author}
									divider={data.lovedApps &&
										idx !== data.lovedApps.length - 1}
								/>
							</a>
						))}
					</Card>
				</Container>
			)}
			<Stack class="mt-4">
				<Container
					disableGutters
					class="gap-4 md:flex flex-row justify-items-stretch"
				>
					{data.randomApps &&
						(
							<div class="flex-1">
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
												subtitle={app.categories?.map(
													(category) =>
														getCategory(category)
															?.name,
												).join(", ")}
												divider={data.randomApps &&
													idx !==
													data.randomApps.length -
													1}
											/>
										</a>
									))}
								</Container>
							</div>
						)}

					{data.randomCategory &&
						(
							<div class="flex-1">
								<Container>
									<h2 class="text-2xl">
										Looking for {getCategory(
											data.randomCategory.category,
										)
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
				</Container>
				<Container class="mt-4">
					<FewApps />
				</Container>
			</Stack>
		</>
	);
}

export const handler: Handler = async (_, ctx) => {
	const randomCategoryId: string =
		CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)].id;

	// This is used to determine for how long an app is considered
	// to be new.
	const sixtyDaysAgo = new Date(
		new Date().getTime() - (60 * 24 * 60 * 60 * 1000),
	);

	const [
		{ data: randomCategoryApps },
		{ data: newApps },
		{ data: randomApps },
		{ data: randomCards },
		{ data: lovedApps },
	] = await Promise.all([
		supabase.from("random_apps")
			.select("id, name, icon, author")
			.contains("categories", [randomCategoryId])
			.limit(5),
		supabase.from("apps")
			.select("id, name, icon, categories")
			.order("addedOn", { ascending: false })
			.gte("addedOn", sixtyDaysAgo.toDateString()),
		supabase.from("random_apps")
			.select("id, name, icon, categories")
			.limit(5),
		supabase.from("random_apps")
			.select("id, name, icon, cover")
			.not("cover", "is", null)
			.limit(6),
		supabase.rpc("loved_apps")
			.select("id, name, icon, author")
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
		lovedApps,
	} as DataProps);
};
