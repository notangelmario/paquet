/**@jsx h */
import "dotenv";
import { h } from "preact";
import { tw } from "@twind";
import Root from "../components/Root.tsx";
import Header from "../components/Header.tsx";
import Container from "../components/Container.tsx";
import Navbar from "../islands/Navbar.tsx";
import Card from "../components/Card.tsx";
import ListItem from "../components/ListItem.tsx";




export default function Settings() {
	return (
		<Root>
			<Navbar back/>
			<Container>
				<Header>
					Settings
				</Header>
				<Card className={tw`mt-2`}>
					<ListItem
						icon="toggle_on"
						title="Environment"
						subtitle={Deno.env.get("DENO_DEPLOYMENT_ID") ? "Production" : "Development"}
					/>
					<ListItem
						icon="conversion_path"
						title="Verson"
						subtitle={Deno.env.get("PAQUET_VERSION")}
					/>
				</Card>
			</Container>
		</Root>
	)
}