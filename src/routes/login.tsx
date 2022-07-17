/**@jsx h */
/**@jsxFrag Fragment */
import { Fragment, h } from "preact";
import Header from "@/components/Header.tsx";
import Container from "@/components/Container.tsx";
import Button from "@/components/Button.tsx";
import Stack from "@/components/Stack.tsx";
import Navbar from "@/islands/Navbar.tsx";


export default function Login() {
	return (
		<>
			<Navbar />
			<Container>
				<Stack>
					<Header>
						Login
					</Header>
					<a href="/api/auth/login">
						<Button>
							Login with GitHub
						</Button>
					</a>
				</Stack>
			</Container>
		</>
	);
}