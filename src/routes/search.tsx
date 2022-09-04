/**@jsx h */
/**@jsxFrag Fragment */
import { Fragment, h } from "preact";
import { tw } from "@/lib/twind.ts";
import { Head } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import type { Handler } from "@/types/Handler.ts";
import type { App } from "@/types/App.ts";
import { z, ZodError } from "zod";
import Stack from "@/components/Stack.tsx";
import ListItem from "@/components/ListItem.tsx";
import Navbar from "@/islands/Navbar.tsx";
import Container from "@/components/Container.tsx";
import SearchBar from "@/components/SearchBar.tsx";
import Icon from "@/components/Icon.tsx";

type DataProps = {
	apps: App[];
	error?: ZodError<string>;
};

export default function Search({ data, url }: PageProps<DataProps>) {
	return null 
	// (
	// 	<>
	// 		<Head>
	// 			<title>{url.searchParams.get("q")} &middot; Paquet</title>
	// 		</Head>
	// 		<Navbar
	// 			back
	// 		/>
	// 		<Container
	// 			class={tw`
	// 				mt-16
	// 			`}
	// 		>
	// 			<form
	// 				action="/search"
	// 				method="GET"
	// 			>
	// 				<SearchBar
	// 					text={url.searchParams.get("q") || ""}
	// 				/>
	// 				{data.error && (
	// 					<p class={tw`text-red-500`}>
	// 						<Icon
	// 							name="error"
	// 							width={18}
	// 							height={18}
	// 							error
	// 							inline
	// 						/>{" "}
	// 						{data.error.issues[0].message}
	// 					</p>
	// 				)}
	// 			</form>
	// 		</Container>
	// 		<Container
	// 			disableGutters
	// 		>
	// 			<Stack>
	// 				{data.apps.map((app: App, idx: number) => (
	// 					<a href={`/app/${app.id}`}>
	// 						<ListItem
	// 							button
	// 							key={app.id}
	// 							image={app.icon_small}
	// 							title={app.name}
	// 							subtitle={app.category}
	// 							divider={idx !== data.apps.length - 1}
	// 						/>
	// 					</a>
	// 				))}
	// 			</Stack>
	// 		</Container>
	// 	</>
	// );
}

// export const handler: Handler = async (req, ctx) => {
// 	const searchParams = new URLSearchParams(req.url.split("?")[1]);
// 	const query = searchParams.get("q");

// 	const querySchema = z.string().min(3).max(50);

// 	const queryValidation = querySchema.safeParse(query);

// 	if (!queryValidation.success) {
// 		return ctx.render({
// 			apps: [],
// 			error: queryValidation.error,
// 		});
// 	}

// 	const { data: apps } = await supabase.rpc("search_app", {
// 		search_term: query,
// 	}).select("id, name, icon_small, category");

// 	return ctx.render({
// 		apps,
// 	});
// };
