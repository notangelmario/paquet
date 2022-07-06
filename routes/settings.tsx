/**@jsx h */
import "dotenv";
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import Root from "../components/Root.tsx";
import { useBrowserServerSide } from "../hooks/useBrowser.ts";
import Header from "../components/Header.tsx";
import Stack from "../components/Stack.tsx";
import Container from "../components/Container.tsx";
import Navbar from "../islands/Navbar.tsx";
import Card from "../components/Card.tsx";
import ListItem from "../components/ListItem.tsx";
import app from "@app";

type DataProps = {
	isIos: boolean
};

export default function Settings(props: PageProps<DataProps>) {
	return (
		<Root>
			<Navbar isIos={props.data.isIos} back />
			<Container>
				<Stack>
					<Header>
						Settings
					</Header>
					<Card disableGutters>
						<ListItem
							icon="info"
							title="Version"
							subtitle={app.version}
							divider
						/>
						<a 
							href="https://github.com/notangelmario/paquet"
							target="_blank"
						>
							<ListItem
								button
								title="GitHub"
								subtitle="Star Paquet on GitHub"
								image="/github.svg"
								imageProps={{
									className: tw`p-3 filter dark:invert`
								}}
							/>
						</a>
					</Card>
				</Stack>
			</Container>
		</Root>
	);
}

export const handler: Handlers = {
	GET(req, ctx) {
		const { isIos } = useBrowserServerSide(req);

		return ctx.render({
			isIos
		});
	},
};
