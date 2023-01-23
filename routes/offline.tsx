import { Head } from "$fresh/runtime.ts";
import Header from "@/components/Header.tsx";
import Container from "@/components/Container.tsx";


export default function Offline() {
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
			</Container>
		</>
	)
}
