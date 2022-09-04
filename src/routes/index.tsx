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
import { CATEGORIES, getCategory } from "@/lib/categories.ts";
import Navbar from "@/islands/Navbar.tsx";
import Button from "@/components/Button.tsx";
import ListItem from "@/components/ListItem.tsx";
import FewApps from "@/components/FewApps.tsx";
import InstallBanner from "@/islands/InstallBanner.tsx";
import SearchBar from "@/components/SearchBar.tsx";
import SlideContainer from "@/components/SlideContainer.tsx";
import SlideItem from "@/components/SlideItem.tsx";
import { getApps } from "@/lib/app.ts";

type DataProps = {
	apps?: App[];
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

				{data.apps &&
					<div>
						<Container>
							<h2
								class={tw`text-2xl`}
							>
								Random picks
							</h2>
						</Container>
						<Container disableGutters>
							{data.apps.map((app: App, idx: number) => (
								<a href={`/app/${app.id}`}>
									<ListItem
										button
										key={app.id}
										image={app.iconSmall}
										title={app.name}
										subtitle={getCategory(app.category)?.name}
										divider={data.apps &&
											idx !== data.apps.length - 1}
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
	const apps = await getApps({
		limit: 5,
		random: true
	})

	return ctx.render({
		apps,
	} as DataProps);
};
