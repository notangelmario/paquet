/**@jsx h */
/**@jsxFrag Fragment */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import Header from "@/components/Header.tsx";
import Stack from "@/components/Stack.tsx";
import Container from "@/components/Container.tsx";
import { supabase } from "@supabase";
import type { App, Category } from "@/types/App.ts";
import Navbar from "@/islands/Navbar.tsx";
import Button from "@/components/Button.tsx";
import ListItem from "@/components/ListItem.tsx";
import FewApps from "@/components/FewApps.tsx";
import InstallBanner from "@/islands/InstallBanner.tsx";
import SearchBar from "@/components/SearchBar.tsx";
import SlideContainer from "@/components/SlideContainer.tsx";
import SlideItem from "@/components/SlideItem.tsx";
import { useInstalledServerSide } from "@/hooks/useInstalled.ts";

type DataProps = {
	categories: Category[];
	apps: App[];
	installed: boolean;
};

export default function Home(props: PageProps<DataProps>) {
	return (
		<>
			<Navbar
				rightIcon="settings"
				rightIconHref="/settings"
			/>
			<Stack>
				<Container>
					<Stack>
						<Header>
							Home
						</Header>
						<form
							action="/search"
							method="GET"
						>
							<SearchBar />
						</form>
						<InstallBanner
							initialInstalled={props.data.installed}
						/>
					</Stack>
				</Container>
				<SlideContainer
					snap
				>
					{props.data.categories.map((category, idx) => (
						<SlideItem
							key={category.id}
							isLast={idx === props.data.categories.length - 1}
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
				<Container disableGutters>
					{props.data.apps?.map((app: App, idx: number) => (
						<a href={`/app/${app.id}`}>
							<ListItem
								button
								key={app.id}
								image={app.iconSmall}
								title={app.name}
								subtitle={app.category.name}
								divider={idx !== props.data.apps.length - 1}
							/>
						</a>
						// <AppListItem
						// 	app={app}
						// />
					))}
				</Container>
				<Container class={tw`mt-4`}>
					<FewApps />
				</Container>
			</Stack>
		</>
	);
}

export const handler: Handlers = {
	async GET(req, ctx) {
		const installed = useInstalledServerSide(req);

		const [{ data: categories }, { data: apps }] = await Promise.all([
			supabase.from("categories").select("*"),
			supabase.from("apps").select(
				"id, name, iconSmall, category:categories(name)",
			),
		]);

		return ctx.render({
			categories,
			apps,
			installed,
		} as DataProps);
	},
};
