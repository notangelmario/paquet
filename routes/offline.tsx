import { Head } from "$fresh/runtime.ts";
import Header from "@/components/Header.tsx";
import Container from "@/components/Container.tsx";
import { PageProps } from "$fresh/server.ts";
import Card from "../components/Card.tsx";

export default function Offline(props: PageProps) {
	return (
		<>
			<Head>
				<title>
					Offline &middot; Paquet
				</title>
			</Head>
			<Container>
				<Header icon="cloud-off">
					Offline
				</Header>
				<p>
					You are offline. Please check your internet connection.
				</p>
				{props.url.hostname !== "paquet.shop" && (
					<Card>
						<p class="text-2xl">
							We moved to <a class="underline text-primary" href="https://paquet.app">paquet.app</a>.
						</p>
					</Card>
				)}
			</Container>
		</>
	);
}