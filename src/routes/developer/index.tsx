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

type Doc = {
	title: string,
	description: string
	icon: string,
	filename: string
}

const DOCS: Doc[] = [
	{
		title: "Getting started",
		description: "How to add your app on Paquet",
		icon: "flag",
		filename: "getting-started.md"
	},
	{
		title: "Manifest file",
		description: "How to use your manifest file to edit your app listing",
		icon: "description",
		filename: "manifest.md"
	}
]

export default function DevDashboard() {
	return (
		<>
			<Navbar
				back
			/>
			<Container>
				<Stack>
					<Header
						icon="code"
					>
						For developers
					</Header>
					<div>
						<h2 class={tw`text-2xl mb-1`}>
							Docs
						</h2>
						<Card disableGutters>
							{DOCS.map(doc => (
								<a 
									href={`/developer/docs/${doc.filename.slice(0, -3)}`}
									key={doc.filename}
								>
									<ListItem
										button
										icon={doc.icon}
										title={doc.title}
										subtitle={doc.description}
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