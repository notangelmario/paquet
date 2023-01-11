import { Head } from "$fresh/runtime.ts";
import { supabaseAs } from "@/lib/supabase.ts";
import { PageProps } from "$fresh/server.ts";
import { Handler } from "@/types/Handler.ts";
import Container from "@/components/Container.tsx";
import Navbar from "@/islands/Navbar.tsx";
import Header from "@/components/Header.tsx";
import Stack from "@/components/Stack.tsx";
import { App } from "@/types/App.ts";
import Card from "@/components/Card.tsx";
import ListItem from "@/components/ListItem.tsx";
import Icon from "@/components/Icon.tsx";

interface DataProps {
	apps: App[];
}

export default function Library(props: PageProps<DataProps>) {
	return (
		<>
			<Head>
				<title>Library &middot; Paquet</title>
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
					<Header icon="apps">
						Library
					</Header>
					<Card disableGutters>
						{props.data.apps
							? props.data.apps.map((app) => (
								<a href={`/app/${app.id}`}>
									<ListItem
										image={app.icon}
										title={app.name}
										subtitle={app.author}
										divider={app !==
											props.data
												.apps[
													props.data.apps.length - 1
												]}
									/>
								</a>
							))
							: (
								<p>
									You don't have any favourite apps yet.
								</p>
							)}
						<p class="opacity-50 p-4">
							<Icon
								name="info"
								inline
								size={18}
							/>{" "}
							Add apps to your library for easier access. Your
							library syncs automatically between all your
							devices.
						</p>
					</Card>
				</Stack>
			</Container>
		</>
	);
}

export const handler: Handler = async (_, ctx) => {
	if (!ctx.state.user) {
		return new Response("Unauthorized", {
			status: 307,
			headers: {
				Location: "/login",
			},
		});
	}

	const supabase = supabaseAs(ctx.state.user.access_token);

	const { data: user, error } = await supabase
		.from("users")
		.select("library")
		.eq("id", ctx.state.user.id)
		.single();

	if (error) {
		console.log(error);
		return new Response(
			"Your profile could not be fetched. Please file and issue.",
			{
				status: 500,
			},
		);
	}

	const { data: apps } = await supabase
		.from("apps")
		.select("id, name, icon, author")
		.in("id", user.library);

	return ctx.render({
		apps,
	});
};
