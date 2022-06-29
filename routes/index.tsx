/** @jsx h */
import { Handlers, PageProps } from "$fresh/server.ts";
import { h } from "preact";
import { tw } from "@twind";
import Counter from "../islands/Counter.tsx";
import { supabase } from "../utils/supabase.ts";


export const handler: Handlers = {
	async GET(_, ctx) {
		const { data } = await supabase.from("apps").select("*");

		return ctx.render(data);
	}
}

export default function Home({ data }: PageProps) {
	return (
		<div class={tw`p-4 mx-auto max-w-screen-md`}>
			<img
				src="/logo.svg"
				height="100px"
				alt="the fresh logo: a sliced lemon dripping with juice"
			/>
			<img
				src={data[0].iconUrl}
				class={tw`rounded-full h-32`}
			/>
			<p class={tw`my-6`}>
				That's so unfortunate. We don't have hot reloading
			</p>
			<Counter start={3} />
		</div>
	);
}
