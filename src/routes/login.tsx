/**@jsx h */
/**@jsxFrag Fragment */
import { h, Fragment } from "preact";
import Header from "@/components/Header.tsx";
import Container from "@/components/Container.tsx";
import Stack from "@/components/Stack.tsx";
import Button from "@/components/Button.tsx";
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
					<a href="/api/login">
						<Button>
							Login with GitHub
						</Button>
					</a>			
				</Stack>
			</Container>
		</>
	)
}