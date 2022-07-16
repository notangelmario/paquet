/**@jsx h */
/**@jsxFrag Fragment */
import { h, Fragment } from "preact";
import Header from "@/components/Header.tsx";
import Container from "@/components/Container.tsx";
import Navbar from "@/islands/Navbar.tsx";


export default function Login() {
	return (
		<>
			<Navbar />
			<Header>
				Login
			</Header>
		</>
	)
}

