/**@jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import { supabase } from "../../utils/supabase.ts";

import type { App } from "../../types/App.ts";
import Root from "../../components/Root.tsx";
import Navbar from "../../islands/Navbar.tsx";
import Stack from "../../components/Stack.tsx";
import Container from "../../components/Container.tsx";
import Button from "../../components/Button.tsx";
import { getCategory } from "../../utils/categories.ts";

export default function App(props: PageProps<App>) {
	const onClick = () => {
		console.log(1);
		window.open(props.data.url, "_blank");
	};

	return (
		<Root>
			<Navbar back />
			<Container style={{ paddingTop: 64 }}>
				<Stack>
					<div className={tw`flex flex-row flex-wrap gap-4`}>
						<img
							className={tw`rounded w-20 h-20`}
							src={props.data.iconUrl}
						/>
						<div className={tw`flex-1`}>
							<h2 className={tw`text-3xl`}>
								{props.data.name}
							</h2>
							<p className={tw`opacity-50`}>
								{props.data.author} &middot;{" "}
								{getCategory(props.data.categoryId)?.name}
							</p>
						</div>
						<div className={tw`min-w-full sm:min-w-[30%]`}>
							<a
								href={props.data.url}
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
						<h3 className={tw`text-2xl`}>
							About
						</h3>
						<p>
							{props.data.description}
						</p>
					</div>
				</Stack>
			</Container>
		</Root>
	);
}

export const handler: Handlers = {
	async GET(_, ctx) {
		const { data } = await supabase.from("apps").select("*").eq(
			"id",
			ctx.params.id,
		).single();

		if (!data) {
			return Response.redirect("/", 300);
		}
		return ctx.render(data);
	},
};
