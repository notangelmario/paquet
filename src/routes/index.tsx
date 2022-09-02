/**@jsx h */
/**@jsxFrag Fragment */
import { Fragment, h } from "preact";
import { tw } from "@/lib/twind.ts";
import type { PageProps } from "$fresh/server.ts";
import type { App } from "@/types/App.ts";
import type { Handler } from "@/types/Handler.ts";
import { Head } from "$fresh/runtime.ts";
import Header from "@/components/Header.tsx";
import Stack from "@/components/Stack.tsx";
import Container from "@/components/Container.tsx";
import { supabase } from "@/lib/supabase.ts";
import { CATEGORIES, getCategory } from "@/lib/categories.ts";
import Navbar from "@/islands/Navbar.tsx";
import Button from "@/components/Button.tsx";
import ListItem from "@/components/ListItem.tsx";
import FewApps from "@/components/FewApps.tsx";
import InstallBanner from "@/islands/InstallBanner.tsx";
import SearchBar from "@/components/SearchBar.tsx";
import SlideContainer from "@/components/SlideContainer.tsx";
import SlideItem from "@/components/SlideItem.tsx";

type DataProps = {
	randomApps?: App[];
	randomCategory?: {
		category: string,
		apps: App[]
	},
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
						<InstallBanner />
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
					<div>
						<Container>
							<h2
								class={tw`text-2xl`}
							>
								Random picks
							</h2>
						</Container>
						<Container disableGutters>
							{data.randomApps.map((app: App, idx: number) => (
								<a href={`/app/${app.id}`}>
									<ListItem
										button
										key={app.id}
										image={app.icon_small}
										title={app.name}
										subtitle={getCategory(app.category)?.name}
										divider={data.randomApps &&
											idx !== data.randomApps.length - 1}
									/>
								</a>
							))}
						</Container>
					</div>
				}

				{data.randomCategory &&
					<div>
						<Container>
							<h2
								class={tw`text-2xl`}
							>
								Looking for {getCategory(data.randomCategory.category)?.name}?
							</h2>
						</Container>
						<Container disableGutters>
							{data.randomCategory.apps.map((app: App, idx: number) => (
								<a href={`/app/${app.id}`}>
									<ListItem
										button
										key={app.id}
										image={app.icon_small}
										title={app.name}
										subtitle={app.author}
										divider={data.randomCategory?.apps &&
											idx !== data.randomCategory.apps.length - 1}
									/>
								</a>
							))}
						</Container>
					</div>
				}

				<Container class={tw`mt-4`}>
					<FewApps />
				</Container>
			</Stack>
		</>
	);
}

export const handler: Handler = async (_, ctx) => {
	const randomCategoryId: string = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)].id;
	const { data: randomCategoryApps } = await supabase.from<App>("random_apps")
		.select("id, name, icon_small, author, category")
		.eq("category", randomCategoryId)
		.limit(5);

	const randomCategory: DataProps["randomCategory"] = randomCategoryApps?.length ? {
		category: randomCategoryId,
		apps: randomCategoryApps
	} : undefined;

	const { data: randomApps } = await supabase.from<App>("random_apps")
		.select(
			"id, name, icon_small, category",
		)
		.limit(5);

	return ctx.render({
		randomApps,
		randomCategory,
	} as DataProps);
};
