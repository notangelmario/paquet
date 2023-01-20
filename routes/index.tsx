import { supabase } from "@/lib/supabase.ts";
import { Head } from "$fresh/runtime.ts";
import Container from "@/components/Container.tsx";
import Stack from "@/components/Stack.tsx";
import Icon from "@/components/Icon.tsx";
import { Handler } from "@/types/Handler.ts";
import type { App } from "@/types/App.ts";
import { PageProps } from "$fresh/server.ts";
import Button from "@/components/Button.tsx";
import Card from "../components/Card.tsx";

interface DataProps {
	apps: App[];
}


export default function Welcome({ data: { apps } }: PageProps<DataProps>) {
	return (
		<>
			<Head>
				<title>Paquet</title>
			</Head>
			<Container
				class="flex flex-col h-screen justify-center relative"
			>
				<a
					class="text-7xl font-bold"
					href="/home"
				>
					Access your apps{" "}
					<span class="text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary">instantly</span>
				</a>
				<p
					class="self-center text-center opacity-50 font-medium absolute bottom-4"
				>
					Interested? Scroll down to learn more.<br/>
					<Icon
						name="arrow-big-down-line"
						inline
					/>
				</p>
			</Container>
			<Container>
				<Stack>
					<h2 class="text-5xl font-bold">
						Open Paquet to explore <span class="text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary">a new way</span> to access your apps.
					</h2>
					<a
						href="/home"
					>
						<Button
							icon="external-link"
						>
							Open Paquet
						</Button>
					</a>
					<Stack
						class="grid grid-cols-4 md:grid-cols-8 gap-2 place-items-center place-content-center filter grayscale"
					>
						{apps.map(app => (
							<a
								href={`/app/${app.id}`}
							>
								<img
									class="w-16 h-16 rounded"
									src={app.icon}
								/>
							</a>
						))}
					</Stack>
				</Stack>
				<Stack>
					<h2
						class="text-center font-bold text-3xl mt-16"
					>
						What's in store?
					</h2>
					<Card>
						<p class="font-bold mb-2">
							<Icon
								name="download-off"
								inline
								size={18}
							/>{" "}
							No downloads
						</p>
						<p>
							No need to download anything. Paquet is a web app that runs in your browser.
							All apps you find inside work the same way Paquet does.
						</p>
					</Card>
				</Stack>
			</Container>
		</>
	)
}


export const handler: Handler = async (_, ctx) => {
	const { data: apps } = await supabase.from("random_apps")
		.select("id, icon")
		.limit(8)

	return ctx.render({ apps });
}
