import Header from "@/components/Header.tsx";
import { Head } from "$fresh/runtime.ts";
import { CATEGORIES } from "@/lib/categories.ts";
import ListItem from "@/components/ListItem.tsx";
import Container from "@/components/Container.tsx";
import Card from "@/components/Card.tsx";
import Stack from "@/components/Stack.tsx";
import Navbar from "@/islands/Navbar.tsx";

export default function CategoryPage() {
	return (
		<>
			<Head>
				<title>Categories &middot; Paquet</title>
			</Head>
			<Navbar
				title="Categories"
				back
			/>
			<Container>
				<Stack>
					<Header icon="apps" class="mb-2">
						Categories
					</Header>
					<Card disableGutters>
						{CATEGORIES.map((category) => (
							<a
								key={category.id}
								href={`/category/${category.id}`}
							>
								<ListItem
									button
									icon={category.icon}
									title={category.name}
									divider={CATEGORIES &&
										category.id !==
											CATEGORIES[CATEGORIES.length - 1]
												.id}
								/>
							</a>
						))}
					</Card>
				</Stack>
			</Container>
		</>
	);
}
