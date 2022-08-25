/**@jsx h */

declare global {
	interface Window {
		// deno-lint-ignore no-explicit-any
		installPrompt: any;
	}
}

import { h } from "preact";
import { useState } from "preact/hooks";
import Button from "@/components/Button.tsx";
import Card from "@/components/Card.tsx";
import { tw } from "@/lib/twind.ts";
import Stack from "@/components/Stack.tsx";
import { useInstalled } from "@/hooks/useInstalled.ts";
import Dialog from "@/islands/Dialog.tsx";
import { useBrowser } from "@/hooks/useBrowser.ts";

type Props = {
	initialInstalled: boolean;
};

export default function InstallBanner(props: Props) {
	const clientBrowser = useBrowser();
	const installed = useInstalled(props.initialInstalled);
	const [dialogOpen, setDialogOpen] = useState(false);

	const onClickInstall = () => {
		if (window.installPrompt) {
			window.installPrompt.prompt();
		} else {
			setDialogOpen(true);
		}
	};

	const installInstructions = (props: typeof clientBrowser) => {
		if (props.isIos && props.browserName === "Mobile Safari") {
			return `
				Add Paquet by tapping
				the share button
				and tap "Add to Home Screen".
			`;
		}

		if (props.isIos && props.browserName !== "Mobile Safari") {
			return `
				Unfortunately, Paquet on iOS only works in Safari.
				Open Paquet in Safari and tap 
				the share button
				and tap "Add to Home Screen".
			`;
		}

		// Desktop Chrome instructions
		if (props.browserName === "Chrome" && !props.type) {
			return `
				Add Paquet by clicking
				the install button
				in the address bar and click "Install".
			`;
		}

		return `
			Sorry, we don't have instructions for your browser.
			You could look it up though.
		`;
	};

	return !installed
		? (
			<Card
				class={tw`!bg-gradient-to-tr from-primary to-secondary !text-white`}
			>
				<Stack>
					<h2 class={tw`text-xl`}>Welcome to Paquet!</h2>
					<p>
						It looks like Paquet isn't installed yet. You can
						install it by clicking the button below.
					</p>
					<Button
						fullWidth
						outlined
						onClick={onClickInstall}
						icon="install_mobile"
					>
						Install
					</Button>
					<a href="/about">
						<Button
							fullWidth
							outlined
							icon="info"
						>
							About
						</Button>
					</a>
				</Stack>
				<Dialog
					title="Install Paquet"
					content={installInstructions(clientBrowser)}
					open={dialogOpen}
					setOpen={setDialogOpen}
					buttons={[
						{
							outlined: true,
							text: "OK",
							onClick: () => setDialogOpen(false),
						},
					]}
				/>
			</Card>
		)
		: <div class={tw`-mb-2`} />;
}
