/**@jsx h */
/**@jsxFrag Fragment */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import type { PageProps } from "$fresh/server.ts";
import type { Handler } from "@/types/Handler.ts";
import { supabaseAsUser } from "@supabase";

import type { App } from "@/types/App.ts";
import Navbar from "@/islands/Navbar.tsx";
import Stack from "@/components/Stack.tsx";
import Container from "@/components/Container.tsx";
import Button from "@/components/Button.tsx";
import Features from "@/components/Features.tsx";
import ListItem from "@/components/ListItem.tsx";
import Divider from "@/components/Divider.tsx";

type DataProps = {
	app: App;
	otherApps?: App[];
};

export default function App(props: PageProps<DataProps>) {
	return (
		<>
			<Navbar back />
			<Container style={{ paddingTop: 64 }}>
				<Stack>
					<div class={tw`flex flex-row flex-wrap gap-4`}>
						<img
							class={tw`
								rounded w-20 h-20
							`}
							src={props.data.app.icon_large}
						/>
						<div class={tw`flex-1`}>
							<h2 class={tw`text-3xl`}>
								{props.data.app.name}
							</h2>
							<p class={tw`opacity-50`}>
								{props.data.app.author ||
									props.data.app.owner?.name} &middot;{" "}
								{props.data.app.category.name}
							</p>
						</div>
						<div class={tw`min-w-full sm:min-w-[30%]`}>
							<a
								href={props.data.app.url}
								target="_blank"
								rel="noopener noreferrer"
							>
								<Button
									icon="open_in_new"
									fullWidth
								>
									Open
								</Button>
							</a>
						</div>
					</div>
					<div>
						<h3 class={tw`text-2xl`}>
							About
						</h3>
						<p>
							{props.data.app.description}
						</p>
					</div>
					<Divider inset />
				</Stack>
			</Container>

			{props.data.app.features && (
				<div class={tw`mt-4`}>
					<Features
						features={props.data.app.features}
					/>
					<Container>
						<Divider class="mt-4" inset />
					</Container>
				</div>
			)}

			{props.data.otherApps &&
				(
					<>
						<Container>
							<h3 class={tw`text-2xl mt-4`}>
								Other apps
							</h3>
						</Container>
						<Container disableGutters>
							{props.data.otherApps.map((app, idx) => (
								<a
									key={idx}
									href={`/app/${app.id}`}
								>
									<ListItem
										button
										title={app.name}
										image={app.icon_small}
										subtitle={app.author || app.owner?.name}
										divider={idx !==
											(props.data.otherApps
													?.length as number) - 1}
									/>
								</a>
							))}
						</Container>
					</>
				)}
		</>
	);
}

export const handler: Handler = async (_, ctx) => {
	const { accessToken } = ctx.state;

	const supabase = supabaseAsUser(accessToken);

	const { data: app } = await supabase.from<App>("apps")
		.select(
			"id, name, author, description, url, icon_large, features, owner:users(name), category:categories(id, name)",
		)
		.eq("id", ctx.params.id)
		.single();

	if (!app) {
		return Response.redirect("/", 300);
	}

	const { data: otherApps } = await supabase.from("random_apps")
		.select("id, name, author, icon_small, owner:users(name)")
		.eq("category", app.category.id)
		.neq("id", app.id)
		.limit(3);

	return ctx.render({
		app,
		otherApps,
	} as DataProps);
};
