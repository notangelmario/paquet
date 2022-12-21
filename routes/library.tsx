import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import Container from "@/components/Container.tsx";
import Navbar from "@/islands/Navbar.tsx";
import Header from "@/components/Header.tsx";
import Stack from "@/components/Stack.tsx";
import LibraryApps from "@/islands/LibraryApps.tsx";
import OfflineLibraryNotice from "@/islands/OfflineLibraryNotice.tsx";

export default function Library(props: PageProps) {
	const isOffline = props.url.searchParams.get("offline") === "true";

	return (
		<>
			<Head>
				<title>Library &middot; Paquet</title>
			</Head>
			{!isOffline
				? (
					<Navbar
						back
						right={[
							{
								icon: "settings",
								href: "/settings",
							},
						]}
					/>
				)
				: null}
			<Container>
				<Stack>
					<Header icon="apps">
						Library
					</Header>
					<OfflineLibraryNotice offline={isOffline} />
					<LibraryApps />
				</Stack>
			</Container>
		</>
	);
}
