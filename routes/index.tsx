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
import FewApps from "@/components/FewApps.tsx";
import InstallBanner from "@/islands/InstallBanner.tsx";
import SearchBar from "@/components/SearchBar.tsx";
import Announcement from "@/components/Announcement.tsx";
import SlideContainer from "@/components/SlideContainer.tsx";
import SlideItem from "@/components/SlideItem.tsx";
import ImageCard from "@/components/ImageCard.tsx";

type DataProps = {
	randomCards?: App[];
	randomApps?: App[];
	randomCategory?: {
		category: string;
		apps: App[];
	};
};

export default function Home({ data }: PageProps<DataProps>) {
	return (
		<>
			<Head>
				<title>Paquet</title>
			</Head>
			<Navbar
				rightIcon="settings"
				rightIconHref="/settings"
			/>
			<Stack>
				<Container>
					<Header icon="home">
						Home
					</Header>
				</Container>
				<SlideContainer
					snap
				>
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
				<Container>
					<Stack>
						<form
							action="/search"
							method="GET"
						>
							<SearchBar />
						</form>
						<InstallBanner />
						<Announcement>
							Paquet will move from <a href="https://paquet.shop" class="text-primary">paquet.shop</a> to {" "}
							<a href="https://paquet.fructo.land" class="text-primary">paquet.fructo.land</a>. Make sure
							to reinstall the app using the new address.
						</Announcement>
					</Stack>
				</Container>
				<SlideContainer
					snap
				>
					{CATEGORIES.map((category, idx) => (
						<SlideItem
							key={category.id}
							isLast={CATEGORIES && idx === CATEGORIES.length - 1}
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
			</Stack>
		</>
	);
}

export const handler: Handler = async (_, ctx) => {
	const randomCategoryId: string =
		CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)].id;
	const { data: randomCategoryApps } = await supabase.from<App>("random_apps")
		.select("id, name, icon, author, category")
		.eq("category", randomCategoryId)
		.limit(5);

	const randomCategory: DataProps["randomCategory"] =
		randomCategoryApps?.length
			? {
				category: randomCategoryId,
				apps: randomCategoryApps,
			}
			: undefined;

	const { data: randomApps } = await supabase.from<App>("random_apps")
		.select(
			"id, name, icon, category",
		)
		.limit(5);

	const { data: randomCards } = await supabase.from<App>("random_apps")
		.select(
			"id, name, icon, screenshots",
		)
		.not("screenshots", "is", null)
		.limit(5);

	return ctx.render({
		randomCards,
		randomApps,
		randomCategory,
	} as DataProps);
};
