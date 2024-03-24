import { Head } from "$fresh/runtime.ts";
import Container from "@/components/Container.tsx";
import Icon from "@/components/Icon.tsx";
import Navbar from "@/islands/Navbar.tsx";
import { APP } from "@/lib/app.ts";
import { render } from "gfm";
import { PageProps } from "$fresh/server.ts";
import { Handler } from "@/types/Handler.ts";

interface DataProps {
	content: string;
}

export default function Privacy({ data }: PageProps<DataProps>) {
	return (
		<>
			<Head>
				<link
					rel="stylesheet"
					href="/gfm.css"
				/>
				<title>Privacy Policy &middot; Paquet</title>
			</Head>
			<Navbar  
				back 
			/>
			<Container class="mt-16 mb-8">
				<p>
					<Icon
						name="info"
						size={18}
						inline
						class="opacity-50"
					/>{" "}
					<span class="opacity-50">Read this page on{" "}</span>
					<a
						class="text-primary"
						href={APP.githubRepo + "/blob/main/PRIVACY.md"}
					>
						GitHub
					</a>
				</p>
			</Container>
			<Container
				data-color-mode="auto"
				data-light-theme="light"
				data-dark-theme="dark"
				class="markdown-body !bg-light dark:!bg-dark"
				dangerouslySetInnerHTML={{ __html: data.content }}
			/>
		</>
	);
}

export const handler: Handler = async (_, ctx) => {
	const file = await Deno.readTextFile("PRIVACY.md");
	const content = render(file);

	return ctx.render({ content });
};
