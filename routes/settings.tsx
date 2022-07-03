/**@jsx h */
import "dotenv";
import Bowser from "bowser";
import { h } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";
import Root from "../components/Root.tsx";
import Header from "../components/Header.tsx";
import Stack from "../components/Stack.tsx";
import Container from "../components/Container.tsx";
import Navbar from "../islands/Navbar.tsx";
import Card from "../components/Card.tsx";
import ListItem from "../components/ListItem.tsx";
import app from "@app";



export default function Settings(props: PageProps<Bowser.Parser.ParsedResult>) {
	return (
		<Root>
			<Navbar back/>
			<Container>
				<Stack>
					<Header>
						Settings
					</Header>
					<Card disableGutters>
						<ListItem
							icon="toggle_on"
							title="Environment"
							subtitle={Deno.env.get("DENO_DEPLOYMENT_ID") ? "Production" : "Development"}
						/>
						<ListItem
							icon="conversion_path"
							title="Version"
							subtitle={app.version}
						/>
					</Card>
					<Card disableGutters>
						<ListItem
							icon="device_hub"
							title="OS"
							subtitle={props.data.os.name}
						/>
					</Card>
				</Stack>
			</Container>
		</Root>
	)
}

export const handler: Handlers = {
	GET(req, ctx) {
		const browser = Bowser.getParser(req.headers.get("user-agent") || "");

		return ctx.render(browser.getResult())
	}
}