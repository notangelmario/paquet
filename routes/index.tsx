/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import Root from "../components/Root.tsx";
import Header from "../components/Header.tsx";
import Stack from "../components/Stack.tsx";
import Container from "../components/Container.tsx";
import { supabase } from "@supabase";
import type { App } from "../types/App.ts";
import Navbar from "../islands/Navbar.tsx";
import { categories, getCategory } from "../utils/categories.ts";
import Button from "../components/Button.tsx";
import ListItem from "../components/ListItem.tsx";

export default function Home(props: PageProps) {
	return (
		<Root>
			<Navbar
				rightIcon="settings"
				rightIconHref="/settings"
			/>
			<Stack>
				<Container>
					<Header>
						Home
					</Header>
				</Container>
				<div
					className={tw`flex flex-row overflow-x-scroll md:container`}
					style={{
						scrollSnapType: "x mandatory",
					}}
				>
					{categories.map((category, idx) => (
						<a
							key={category.id}
							href={`/category/${category.id}`}
							className={tw`${
								idx === 0
									? `!pl-4 md:pl-0`
									: idx === categories.length - 1
									? `!pr-4 md:pr-0`
									: ""
							} pl-2`}
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
					{props.data?.map((app: App) => (
						<a href={`/app/${app.id}`}>
							<ListItem
								button
								key={app.id}
								image={app.iconUrl}
								title={app.name}
								subtitle={getCategory(app.categoryId)?.name}
							/>
						</a>
						// <AppListItem
						// 	app={app}
						// />
					))}
				</Container>
			</Stack>
		</Root>
	);
}

export const handler: Handlers = {
	async GET(_, ctx) {
		const { data: apps } = await supabase.from("apps").select("*");

		return ctx.render(apps);
	},
};
