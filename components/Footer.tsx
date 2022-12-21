import Container from "@/components/Container.tsx";

export default function Footer() {
	return (
		<footer class="my-8 text-center">
			<Container>
				<a
					href="https://angelmario.eu"
					target="_blank"
					class="hover:underline opacity-75 text-center"
				>
					Made with <span role="img">❤</span>
					<br />
					by Savin Angel-Mario
				</a>
			</Container>
		</footer>
	);
}
