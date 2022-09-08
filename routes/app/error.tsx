import { tw } from "@/lib/twind.ts";
import { Head } from "$fresh/runtime.ts";
import Container from "@/components/Container.tsx";
import Button from "@/components/Button.tsx";
import Stack from "@/components/Stack.tsx";

export default function AppError() {
	return (
		<>
			<Head>
				<title>Error &middot; Paquet</title>
			</Head>
			<Container>
				<Stack>
					<img
						class={tw`w-full max-w-xs mt-2`}
						src="/illustrations/app-error.svg"
					/>
					<h1
						class={tw`text-5xl`}
					>
						Oops...
					</h1>
					<p>
						Something went wrong and we cannot display this app.
						We'll try our best to fix it.
					</p>
					<a href="/">
						<Button>
							Go home
						</Button>
					</a>
				</Stack>
			</Container>
		</>
	);
}
