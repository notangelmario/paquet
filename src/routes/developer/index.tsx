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

export default function DevDashboard(props: PageProps<DataProps>) {
	return (
		<>
			<Navbar
				back
			/>
			<Container>
				<Stack>
					<Header>
						Developer Dashboard
					</Header>
					<div>
						<h2 class={tw`text-2xl mb-1`}>
							Your apps
						</h2>
						<Card disableGutters>
							<ListItem
								title="Submit a new app"
								subtitle="Create a new app"
								icon="add"
							/>
							{props.data.apps?.map((app) => (
								<a href={`/developer/edit/${app.id}`}>
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
