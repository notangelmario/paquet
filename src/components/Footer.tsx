import Container from "@/components/Container.tsx";

export default function Footer() {
	return (
		<footer class="my-8 text-center">
			<Container>
				<a
					href="https://notangelmario.dev"
					target="_blank"
					class="hover:underline opacity-75 text-center"
				>
					Made with <span role="img">❤</span>{" "}
					by Savin Angel-Mario
				</a>
				<div class="flex flex-row gap-2 mt-4 justify-center">
					<a
						href="/privacy"
						class="underline opacity-75"
					>
						Privacy Policy
					</a>&middot;
					<a
						href="/terms-and-conditions"
						class="underline opacity-75"
					>
						Terms and Conditions
					</a>
				</div>

				<div class="flex flex-row gap-2 mt-4 justify-center">
					<a
						href="/docs"
						class="underline opacity-75"
					>
						Docs
					</a>
				</div>
			</Container>
		</footer>
	);
}
