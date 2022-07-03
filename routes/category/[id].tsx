/**@jsx h */
import { h } from "preact";
import { tw } from "@twind";
import type { Handlers, PageProps } from "$fresh/server.ts";
import type { Category } from "../../types/Category.ts";
import type { App } from "../../types/App.ts";
import Navbar from "../../islands/Navbar.tsx";
import Header from "../../components/Header.tsx";
import Root from "../../components/Root.tsx";
import Container from "../../components/Container.tsx";
import ListItem from "../../components/ListItem.tsx";
import { getCategory } from "../../utils/categories.ts";
import { supabase } from "../../utils/supabase.ts";

type DataProps = {
	category: Category,
	apps: App[]
}

export default function Category(props: PageProps<DataProps>) {
	return (
		<Root>
			<Navbar back/>
			<Container>
				<Header>
					<span 
						className={tw`text-5xl material-symbols-outlined`}
					>
						{props.data.category.icon}
					</span>
					<br />
					{props.data.category.name}
				</Header>
			</Container>
			<Container disableGutters>
			{props.data.apps.map(app => (
				<ListItem
					button
					key={app.id}
					image={app.iconUrl}
					title={app.name}
					subtitle={app.author}
				/>
			))}
			</Container>
		</Root>
	)
}

export const handler: Handlers = {
	async GET(_, ctx) {
		const categoryId = ctx.params["id"];
		const category = getCategory(categoryId);

		if (!category) {
			return Response.redirect("/", 300)
		}

		const { data: apps } = await supabase.from("apps").select("*").eq("categoryId", categoryId);
		
		if (!apps) {
			return Response.redirect("/", 300)	
		}

		return ctx.render({
			category,
			apps
		} as DataProps)
	}
}