/**@jsx h */
/**@jsxFrag Fragment */
import { h, Fragment } from "preact";
import { join } from "$std/path/mod.ts";
import { render, CSS } from "gfm";
import { tw } from "@twind";
import { Head } from "$fresh/runtime.ts";
import { PageProps, Handler } from "$fresh/server.ts";
import Navbar from "@/islands/Navbar.tsx";
import Container from "@/components/Container.tsx";
import { mdContainer } from "@ui";

type DataProps = {
	content: string;
}

export default function Changelog(props: PageProps<DataProps>) {
	return (
		<>
			<Head>
				<style>
					{CSS}
				</style>
			</Head>
			<Navbar back />
			<Container
				data-color-mode="auto"
				data-light-theme="light"
				data-dark-theme="dark"
				class={tw`mt-16 ${mdContainer}`}
				dangerouslySetInnerHTML={{ __html: props.data.content }}
			/>
		</>
	)
}

export const handler: Handler = async (_, ctx) => {
	const doc = ctx.params.doc;

	const file = await Deno.readTextFile(join("docs", "developer", `${doc}.md`));
	let content = render(file);

	// Compatibility with GitHub and Website
	content = content.replaceAll("/docs/developer", "/developer/docs");
	content = content.replaceAll('.md"', '"');

	return ctx.render({
		content,
	})
}