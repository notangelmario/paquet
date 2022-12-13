import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import Container from "@/components/Container.tsx";
import Navbar from "@/islands/Navbar.tsx";
import Header from "@/components/Header.tsx";
import Stack from "@/components/Stack.tsx";
import Icon from "@/components/Icon.tsx";
import LibraryApps from "@/islands/LibraryApps.tsx";


export default function Library(props: PageProps) {
	const isOffline = props.url.searchParams.get("offline") === "true";

	return (
		<>
			<Head>
				<title>Library &middot; Paquet</title>
			</Head>
			<Navbar 
				back={!isOffline}
			/>
			<Container>
				<Stack>
					<Header icon="dashboard">
						Library
					</Header>
					{isOffline ? (
						<p
							class="opacity-50"
						>
							<Icon
								name="info"
								inline
								width={18}
								height={18}
							/>{" "}
							Offline
						</p>
					) : null}
					<LibraryApps />
				</Stack>
			</Container>
		</>
	)
}
