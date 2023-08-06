import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import Container from "@/components/Container.tsx";
import Navbar from "@/islands/Navbar.tsx";
import Header from "@/components/Header.tsx";
import Stack from "@/components/Stack.tsx";
import Card from "@/components/Card.tsx";
import Icon from "@/components/Icon.tsx";
import { getApps, getLovedAppIds } from "@/lib/db.ts";
import ListItem from "@/components/ListItem.tsx";
import { buildImageUrl } from "@/lib/image.ts";

export default async function Loved(req: Request, ctx: PageProps) {
	if (!ctx.state.isSignedIn) {
		return new Response("Not logged in", {
			status: 307,
			headers: {
				Location: "/login",
			},
		});
	}

	const appIds = await getLovedAppIds(req);
	const apps = await getApps(appIds || []);

	return (
		<>
			<Head>
				<title>Loved apps &middot; Paquet</title>
			</Head>
			<Navbar
				back
				right={[
					{
						icon: "settings",
						href: "/settings",
					},
				]}
			/>
			<Container>
				<Stack>
					<Header icon="heart">
						Apps you love
					</Header>
					<Card disableGutters>
						{apps && apps.map((app) => (
							<a
								href={`/app/${app.id}`}
							>
								<ListItem
									title={app.name}
									image={buildImageUrl(app.icon, 64, 64)}
									subtitle={app.author}
									divider
								/>
							</a>
						))}
						<p class="opacity-50 p-4">
							<Icon
								name="info"
								inline
								size={18}
							/>{" "}
							Give apps a heart for easier access. Your loved apps
							sync automatically between all your devices.
						</p>
					</Card>
				</Stack>
			</Container>
		</>
	);
}
