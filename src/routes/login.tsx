import { Head } from "$fresh/runtime.ts";
import Container from "@/components/Container.tsx";
import Header from "@/components/Header.tsx";
import Stack from "@/components/Stack.tsx";
import Navbar from "@/islands/Navbar.tsx";
import Icon from "@/components/Icon.tsx";
import LoginButtons from "@/islands/LoginButtons.tsx";
import { Handler } from "@/types/Handler.ts";

export default function Login() {
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
						<Header icon="login">
							Login
						</Header>
						<img
							src="/illustrations/login.svg"
							class="block md:(hidden mb-4) max-w-md mx-auto"
						/>
						<LoginButtons />
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

export const handler: Handler = (_, ctx) => {
	if (ctx.state.user) {
		return new Response("Already logged in", {
			status: 307,
			headers: {
				Location: "/home",
			},
		});
	}

	return ctx.render();
};
