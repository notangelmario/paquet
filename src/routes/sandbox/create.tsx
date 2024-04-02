import { Head } from "$fresh/runtime.ts";
import Navbar from "@/islands/Navbar.tsx";
import Container from "@/components/Container.tsx";
import Stack from "@/components/Stack.tsx";
import Header from "@/components/Header.tsx";
import Card from "@/components/Card.tsx";
import ListItem from "@/components/ListItem.tsx";
import Switch from "@/components/Switch.tsx";
import Button from "@/components/Button.tsx";
import { getApp } from "@/lib/db.ts";

export default async function CreateSandbox(req: Request) {
	const url = new URL(req.url);
	const id = url.searchParams.get("id");
	const app = await getApp(id || "");

	if (!id || !app) {
		return new Response(null, { 
			status: 302,
			headers: {
				Location: "/home"
			}
		});
	}

	return (
		<>
			<Head>
				<title>Create Sandbox &middot; Paquet</title>
			</Head>
			<Navbar 
				title="Settings"
				back 
			/>
			<Container>
				<Stack>
					<Header icon="sandbox">
						Create Sandbox
					</Header>
					<Card>
						Sandbox allows you to run supported apps in a secure environment.
						They are isolated from Paquet and other sandboxes and you can 
						pick and choose the permissions you want to give them.
					</Card>
					<form target="_blank" action={`/sandbox/${id}`} method="GET">
						<Stack>
							<Card disableGutters>
								<ListItem
									button
									icon="javascript"
									// @ts-ignore Allow using the onclick attribute
									onClick="document.querySelector('input[name=scripts]').click()"
									title="Allow scripts"
									subtitle={app.features.includes("auth") ? "NOT RECOMMENDED! This app requires authentication and might not work properly" : "Allow the app to run scripts"}
									secondarySlot={
										<Switch name="scripts" checked />
									}
								/>
								<ListItem
									button
									icon="pointer"
									// @ts-ignore Allow using the onclick attribute
									onClick="document.querySelector('input[name=pointer-lock]').click()"
									title="Allow pointer lock"
									subtitle="Allow the app to lock the pointer"
									secondarySlot={
										<Switch name="pointer-lock" checked />
									}
								/>
								<ListItem
									button
									icon="play"
									// @ts-ignore Allow using the onclick attribute
									onClick="document.querySelector('input[name=autoplay]').click()"
									title="Allow autoplay"
									subtitle="Allow the app to autoplay media"
									secondarySlot={
										<Switch name="autoplay" checked />
									}
								/>
								<ListItem
									button
									icon="rotate"
									// @ts-ignore Allow using the onclick attribute
									onClick="document.querySelector('input[name=accelerometer]').click()"
									title="Allow accelerometer"
									subtitle="Allow the app to access the accelerometer"
									secondarySlot={
										<Switch name="accelerometer" checked />
									}
								/>
								<ListItem
									button
									icon="3d-rotate"
									// @ts-ignore Allow using the onclick attribute
									onClick="document.querySelector('input[name=gyroscope]').click()"
									title="Allow gyroscope"
									subtitle="Allow the app to access the gyroscope"
									secondarySlot={
										<Switch name="gyroscope" checked />
									}
								/>
								<ListItem
									button
									icon="location"
									// @ts-ignore Allow using the onclick attribute
									onClick="document.querySelector('input[name=geolocation]').click()"
									title="Allow geolocation"
									subtitle="Allow the app to access your geolocation"
									secondarySlot={
										<Switch name="geolocation" checked />
									}
								/>
							</Card>
							<Button 
								type="submit"
								fullWidth
								variant="primary"
							>
								Create "{app.name}" Sandbox
							</Button>
							<p class="text-sm opacity-50">
								*You can even install the app as a PWA on your device,
								keeping your sandbox settings.
							</p>
						</Stack>
					</form>
				</Stack>
			</Container>
		</>
	)
}
