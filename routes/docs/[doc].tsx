import { join } from "$std/path/mod.ts";
import { render } from "gfm";
import "https://esm.sh/prismjs@1.28.0/components/prism-json.js?no-check";
import { Head } from "$fresh/runtime.ts";
import { Handler, PageProps } from "$fresh/server.ts";
import Navbar from "@/islands/Navbar.tsx";
import Container from "@/components/Container.tsx";
import Icon from "@/components/Icon.tsx";
import { DOCS } from "@/routes/docs/index.tsx";

type DataProps = {
	content: string;
	githubUrl: string;
	title: string;
};

export default function Changelog({ data }: PageProps<DataProps>) {
	return (
		<>
			<Head>
				<link
					rel="stylesheet"
					href={`/gfm.css?build=${__FRSH_BUILD_ID}`}
				/>
				<title>{data.title} &middot; Paquet</title>
			</Head>
			<Navbar back />
			<Container
				class="mt-16"
			>
				<p>
					<Icon
						name="info"
						width={18}
						height={18}
						inline
						class="opacity-50"
					/>{" "}
					<span class="opacity-50">Read this page on{" "}</span>
					<a
						class="text-primary"
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
				class="markdown-body !bg-white dark:!bg-dark"
				dangerouslySetInnerHTML={{ __html: data.content }}
			/>
		</>
	);
}

export const handler: Handler = async (_, ctx) => {
	const doc = ctx.params.doc;

	const file = await Deno.readTextFile(
		join("docs", `${doc}.md`),
	);
	let content = render(file);

	// Compatibility with GitHub and Website
	content = content.replaceAll('.md"', '"');

	const title = DOCS.find((docElement) => docElement.filename === `${doc}.md`)
		?.title;
	const githubUrl =
		`https://github.com/fructoland/paquet/blob/main/docs/${doc}.md`;

	return ctx.render({
		content,
		githubUrl,
		title,
	});
};
