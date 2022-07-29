/**@jsx h */
/**@jsxFrag Fragment */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import type { PageProps } from "$fresh/server.ts";
import type { Handler } from "@/types/Handler.ts";
import type { Category } from "@/types/App.ts";
import type { App } from "@/types/App.ts";
import { supabase } from "@supabase";
import Navbar from "@/islands/Navbar.tsx";
import Header from "@/components/Header.tsx";
import Container from "@/components/Container.tsx";
import ListItem from "@/components/ListItem.tsx";
import FewApps from "@/components/FewApps.tsx";

type DataProps = {
	category: Category;
	apps: App[];
};

export default function Category(props: PageProps<DataProps>) {
	return (
		<>
			<Navbar back />
			<Container>
				<Header>
					<span
						class={tw`text-5xl material-symbols-outlined`}
					>
						{props.data.category.icon}
					</span>
					<br />
					{props.data.category.name}
				</Header>
			</Container>
			<Container disableGutters>
				{props.data.apps.map((app, idx) => (
					<a
						href={`/app/${app.id}`}
						key={app.id}
					>
						<ListItem
							button
							image={app.icon_small}
							title={app.name}
							subtitle={app.author || app.owner?.name}
							divider={idx !== props.data.apps.length - 1}
						/>
					</a>
				))}
			</Container>
			<Container class={tw`mt-4`}>
				<FewApps />
			</Container>
		</>
	);
}

export const handler: Handler = async (_, ctx) => {
	const categoryId = ctx.params["id"];
	const accessToken = ctx.state.accessToken;

	if (!categoryId) {
		return Response.redirect("/", 307);
	}

	if (accessToken) {
		supabase.auth.setAuth(accessToken);
	}

	const values = await Promise.all([
		supabase
			.from<Category>("categories")
			.select("*")
			.eq("id", categoryId)
			.single(),
		supabase
			.from<App>("apps")
			.select("id, name, icon_small, author, owner:users(name)")
			.eq("category", categoryId),
	]);

	const [{ data: category }, { data: apps }] = values;

	if (!category || !apps) {
		return Response.redirect("/", 307);
	}

	return ctx.render({
		category,
		apps,
	} as DataProps);
}
