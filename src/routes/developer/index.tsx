/**@jsx h */
/**@jsxFrag Fragment */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import type { PageProps } from "$fresh/server.ts";
import type { Handler } from "@/types/Handler.ts";
import type { App } from "@/types/App.ts";
import { supabaseAsUser } from "@supabase";
import Container from "@/components/Container.tsx";
import Navbar from "@/islands/Navbar.tsx";
import Header from "@/components/Header.tsx";
import Card from "@/components/Card.tsx";
import Stack from "@/components/Stack.tsx";
import ListItem from "@/components/ListItem.tsx";

type DataProps = {
	apps: App[] | null;
};

type Doc = {
	title: string,
	description: string
	icon: string,
	filename: string
}

const DOCS: Doc[] = [
	{
		title: "Getting started",
		icon: "flag",
		filename: "getting-started.md"
	},
	{
		title: "Manifest file",
		icon: "description",
		filename: "manifest.md"
	}
]

export default function DevDashboard(props: PageProps<DataProps>) {
	return (
		<>
			<Navbar
				back
			/>
			<Container>
				<Stack>
					<Header>
						For developers
					</Header>
					<div>
						<h2 class={tw`text-2xl mb-1`}>
							Your apps
						</h2>
						<Card disableGutters>
							{props.data.apps?.map((app) => (
								<a href={`/app/${app.id}`}>
									<ListItem
										key={app.id}
										button
										image={app.icon_small}
										title={app.name}
										subtitle={app.id}
									/>
								</a>
							))}
						</Card>
					</div>
					<div>
						<h2 class={tw`text-2xl mb-1`}>
							Docs
						</h2>
						<Card disableGutters>
							{DOCS.map(doc => (
								<a 
									href={`/developer/docs/${doc.filename.slice(0, -3)}`}
									key={doc.filename}
								>
									<ListItem
										button
										icon={doc.icon}
										title={doc.title}
									/>
								</a>
							))}
						</Card>
					</div>
				</Stack>
			</Container>
		</>
	);
}

export const handler: Handler = async (_, ctx) => {
	const user = ctx.state.user;
	const accessToken = ctx.state.accessToken;

	if (!user || !accessToken) {
		return new Response("Unauthorized", {
			status: 307,
			headers: {
				Location: "/login",
			},
		});
	}

	const supabase = supabaseAsUser(accessToken);

	const { data: apps } = await supabase.from<App>("apps")
		.select("id, name, icon_small")
		.eq("owner", user.id);

	if (!apps) {
		return new Response("Unauthorized", {
			status: 307,
			headers: {
				Location: "/login",
			},
		});
	}


	return ctx.render({
		apps,
	});
};
