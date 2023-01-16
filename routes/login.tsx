import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import Container from "@/components/Container.tsx";
import Header from "@/components/Header.tsx";
import Stack from "@/components/Stack.tsx";
import Navbar from "@/islands/Navbar.tsx";
import Icon from "@/components/Icon.tsx";
import { Handler } from "@/types/Handler.ts";
import { AuthMethodsList } from "pocketbase-types";
import { pocketbase } from "@/lib/pocketbase.ts";
import LoginButtons from "@/components/compound/LoginButtons.tsx";

interface DataProps {
	authMethods: AuthMethodsList
}

export default function Login(props: PageProps<DataProps>) {
	return (
		<>
			<Head>
				<title>Login &middot; Paquet</title>
			</Head>
			<Navbar
				back
			/>
			<Container class="flex flex-row flex-wrap gap-4">
				<div class="w-full md:flex-1">
					<Stack>
						<Header>
							Login
						</Header>
						<img
							src="/illustrations/login.svg"
							class="block w-full md:(hidden mb-4) max-w-md mx-auto"
						/>
						<LoginButtons authMethods={props.data.authMethods} />
					</Stack>
				</div>
				<div class="w-full md:(flex-1 mt-16)">
					<img
						src="/illustrations/login.svg"
						class="hidden md:(block mb-4)"
					/>
					<noscript>
						<p class="opacity-75 mb-4">
							<Icon
								name="javascript"
								inline
								size={18}
							/>{" "}
							You need to enable JavaScript to login. We want to
							make sure the login process happens on your device
							only, your login info is not sent anywhere.
							<br />
							<br />
							You can{" "}
							<a
								href="https://github.com/notangelmario/paquet"
								target="_blank"
								rel="noreferrer noopenner"
								class="text-secondary underline"
							>
								check the open-source repo
							</a>, just to be safe.
						</p>
					</noscript>
					<p class="opacity-50">
						<Icon
							name="info"
							inline
							size={18}
						/>{" "}
						Login to unlock the full potential of Paquet. Access
						your favorite apps from anywhere, submit suggestions,
						and more.
					</p>
				</div>
			</Container>
		</>
	);
}

export const handler: Handler = async (_, ctx) => {
	if (ctx.state.user) {
		return new Response("Already logged in", {
			status: 307,
			headers: {
				Location: "/",
			},
		});
	}

	const authMethods = await pocketbase.collection("users")
		.listAuthMethods();

	return ctx.render({
		authMethods
	});
};
