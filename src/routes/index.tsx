/**@jsx h */
/**@jsxFrag Fragment */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import Header from "@/components/Header.tsx";
import Stack from "@/components/Stack.tsx";
import Container from "@/components/Container.tsx";
import { supabase } from "@supabase";
import type { App } from "@/types/App.ts";
import Navbar from "@/islands/Navbar.tsx";
import { categories, getCategory } from "@/utils/categories.ts";
import Button from "@/components/Button.tsx";
import ListItem from "@/components/ListItem.tsx";
import FewApps from "@/components/FewApps.tsx";
import InstallBanner from "@/islands/InstallBanner.tsx";
import SearchBar from "@/components/SearchBar.tsx";
import { useInstalledServerSide } from "@/hooks/useInstalled.ts";

type DataProps = {
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
				<div
					class={tw`flex flex-row overflow-x-scroll md:container`}
					style={{
						scrollSnapType: "x mandatory",
					}}
				>
					{categories.map((category, idx) => (
						<a
							key={category.id}
							href={`/category/${category.id}`}
							class={tw`${
								idx === categories.length - 1
									? `!pr-4 md:pr-0`
									: ""
							} pl-4`}
							style={{
								scrollSnapAlign: "start",
							}}
						>
							<Button
								icon={category.icon}
							>
								{category.name}
							</Button>
						</a>
					))}
				</div>
				<Container disableGutters>
					{props.data.apps?.map((app: App, idx: number) => (
						<a href={`/app/${app.id}`}>
							<ListItem
								button
								key={app.id}
								image={app.iconSmall}
								title={app.name}
								subtitle={getCategory(app.categoryId)?.name}
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
		const { data: apps } = await supabase.from("apps").select(
			"id, name, iconSmall, categoryId",
		);

		return ctx.render({
			apps,
			installed,
		} as DataProps);
	},
};
