/**@jsx h */
import { h } from 'preact';
import Root from "../components/Root.tsx";
import Stack from "../components/Stack.tsx";
import Header from "../components/Header.tsx";
import Container from "../components/Container.tsx";
import Button from "../components/Button.tsx";


export default function Install() {
	return (
		<Root>
			<Container>
				<Stack>
					<Header>
						Install
					</Header>
					<Button
						fullWidth
						outlined
						icon="add_to_home_screen"
					>
						Install
					</Button>
					<p>
						Paquet works just fine in your browser,
						but if you want to have quick and easy
						access, consider adding Paquet to your
						homescreen.
					</p>
				</Stack>
			</Container>
		</Root>
	)
}