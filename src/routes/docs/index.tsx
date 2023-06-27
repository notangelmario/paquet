import { Head } from "$fresh/runtime.ts";
import Container from "@/components/Container.tsx";
import Navbar from "@/islands/Navbar.tsx";
import Header from "@/components/Header.tsx";
import Card from "@/components/Card.tsx";
import Stack from "@/components/Stack.tsx";
import ListItem from "@/components/ListItem.tsx";

type Doc = {
	title: string;
	description: string;
	icon: string;
	filename: string;
};

export const DOCS: Doc[] = [
	{
		title: "Getting started",
		description: "How to add your app on Paquet",
		icon: "flag",
		filename: "getting-started.md",
	},
	{
		title: "Manifest file",
		description: "How to use your manifest file to edit your app listing",
		icon: "file-description",
		filename: "manifest.md",
	},
];

export default function Documentation() {
	return (
		<>
			<Head>
				<title>Docs &middot; Paquet</title>
			</Head>
			<Navbar
				back
			/>
			<Container>
				<Stack>
					<Header icon="code">
						Docs
					</Header>
					<p>
						Here you can find documentation on how to add, adapt and
						integrate your app with Paquet.
					</p>
					<Card disableGutters>
						{DOCS.map((doc, idx) => (
							<a
								href={`/docs/${doc.filename.slice(0, -3)}`}
								key={doc.filename}
							>
								<ListItem
									button
									divider={idx !== DOCS.length - 1}
									icon={doc.icon}
									title={doc.title}
									subtitle={doc.description}
								/>
							</a>
						))}
					</Card>
				</Stack>
			</Container>
		</>
	);
}
