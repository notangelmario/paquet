/**@jsx h */
/**@jsxFrag Fragment */
import { Fragment, h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { supabase } from "@supabase";

import type { App } from "@/types/App.ts";
import Navbar from "@/islands/Navbar.tsx";
import Stack from "@/components/Stack.tsx";
import Container from "@/components/Container.tsx";
import Button from "@/components/Button.tsx";
import { getCategory } from "@/utils/categories.ts";
import Features from "@/components/Features.tsx";

type DataProps = {
	app: App;
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
							src={props.data.app.iconLarge}
						/>
						<div class={tw`flex-1`}>
							<h2 class={tw`text-3xl`}>
								{props.data.app.name}
							</h2>
							<p class={tw`opacity-50`}>
								{props.data.app.author} &middot;{" "}
								{getCategory(props.data.app.categoryId)?.name}
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
					{props.data.app.features && 
						<Features features={props.data.app.features} />
					}
				</Stack>
			</Container>
		</>
	);
}

export const handler: Handlers = {
	async GET(_, ctx) {
		const { data: app } = await supabase.from("apps")
			.select("id, name, author, description, url, iconLarge, categoryId, features")
			.eq("id", ctx.params.id)
			.single();

		if (!app) {
			return Response.redirect("/", 300);
		}
		return ctx.render({
			app,
		} as DataProps);
	},
};
