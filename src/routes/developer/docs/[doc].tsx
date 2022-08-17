/**@jsx h */
/**@jsxFrag Fragment */
import { h, Fragment } from "preact";
import { join } from "$std/path/mod.ts";
import { render, CSS } from "gfm";
import "https://esm.sh/prismjs@1.28.0/components/prism-json.js?no-check";
import { tw } from "@twind";
import { Head } from "$fresh/runtime.ts";
import { PageProps, Handler } from "$fresh/server.ts";
import Navbar from "@/islands/Navbar.tsx";
import Container from "@/components/Container.tsx";
import { mdContainer } from "@ui";	

type DataProps = {
	content: string;
	githubUrl: string;
}

export default function Changelog({ data }: PageProps<DataProps>) {
	return (
		<>
			<Head>
				<link
					rel="stylesheet"
					href={`/gfm.css?build=${__FRSH_BUILD_ID}`}
				/>
			</Head>
			<Navbar back />
			<Container
				class={tw`mt-16`}
			>
				<p>
					<span
						class={tw`material-symbols-outlined !align-bottom !text-base opacity-50`}
					>
						info
					</span>{" "}
					<span class={tw`opacity-50`}>Read this page on{" "}</span>
					<a
						class={tw`text-primary`}
						href={data.githubUrl}
					>
						GitHub
					</a>
				</p>
			</Container>
			<Container
				data-color-mode="auto"
				data-light-theme="light"
				data-dark-theme="dark"
				class={tw`markdown-body !bg-white dark:!bg-dark`}
				dangerouslySetInnerHTML={{ __html: data.content }}
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

	const githubUrl = `https://github.com/notangelmario/paquet/blob/main/docs/developer/${doc}.md`

	return ctx.render({
		content,
		githubUrl
	})
}