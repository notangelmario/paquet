import { Head } from "$fresh/runtime.ts";
import Container from "@/components/Container.tsx";
import Header from "@/components/Header.tsx";
import Stack from "@/components/Stack.tsx";
import Navbar from "@/islands/Navbar.tsx";
import Icon from "@/components/Icon.tsx";
import { Handler, RouteContext } from "@/types/Handler.ts";
import Button from "@/components/Button.tsx";

export default async function Login(_: Request, ctx: RouteContext) {
	await Promise.resolve();

	if (ctx.state.isSignedIn) {
		return new Response("Already logged in", {
			status: 307,
			headers: {
				Location: "/home",
			},
		});
	}

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
						<a href="/api/auth/signin">
							<Button
								icon="github"
								fullWidth
							>
								Login with GitHub
							</Button>
						</a>
						<img
							src="/illustrations/login.svg"
							class="block md:(hidden mb-4) max-w-md mx-auto"
						/>
					</Stack>
				</div>
				<div class="w-full md:(flex-1 mt-16)">
					<img
						src="/illustrations/login.svg"
						class="hidden md:(block mb-4)"
					/>
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
	return ctx.render();
};
