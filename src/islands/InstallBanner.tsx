/**@jsx h */
/**@jsxFrag Fragment */
import { h } from "preact";
import Button from "../components/Button.tsx";
import Card from "../components/Card.tsx";
import { tw } from "@twind";
import Stack from "../components/Stack.tsx";
import { useInstalled } from "../hooks/useInstalled.ts";


type Props = {
	installed: boolean;
}

export default function InstallBanner(props: Props) {
	const installed = useInstalled(props.installed);

	const onClickInstall = () => {
		if (window.installPrompt) {
			window.installPrompt.prompt();
		} else {
			window.location.href = "/install";
		}
	}


	return (
		<div>
			{!installed && <Card
				className={tw`!bg-gradient-to-bl from-primary to-secondary !text-white`}
			>
				<Stack>
					<h2 className={tw`text-xl`}>Install</h2>
					<p>
						It looks like Paquet isn't installed yet.
						You can install it by clicking the button below.
					</p>
					<Button
						fullWidth
						outlined
						onClick={onClickInstall}
						icon="add_to_home_screen"
					>
						Install
					</Button>
				</Stack>
			</Card>}
		</div>
	);
}