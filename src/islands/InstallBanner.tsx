declare global {
	interface Window {
		// deno-lint-ignore no-explicit-any
		installPrompt: any;
	}
}

import { useEffect, useState } from "preact/hooks";
import Button from "@/components/Button.tsx";
import Card from "@/components/Card.tsx";
import Stack from "@/components/Stack.tsx";
import Dialog from "@/islands/Dialog.tsx";
import { useBrowser } from "@/hooks/useBrowser.ts";

export default function InstallBanner() {
	const [installed, setInstalled] = useState<boolean | undefined>(undefined);
	const clientBrowser = useBrowser();
	const [dialogOpen, setDialogOpen] = useState(false);

	useEffect(() => {
		setInstalled(
			globalThis.matchMedia("(display-mode: standalone)").matches,
		);

		globalThis.matchMedia("(display-mode: standalone)").addEventListener(
			"change",
			(e) => {
				setInstalled(e.matches);
			},
		);
	}, []);

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

		// Desktop Firefox instructions
		if (props.browserName === "Firefox" && !props.type) {
			return `
				Unfortunately, Firefox has removed PWA support
				on desktop. You can use <a href="https://addons.mozilla.org/en-GB/firefox/addon/pwas-for-firefox/" target="_blank" rel="noreferrer noopener">this extension</a>
				to install Paquet.
			`;
		}

		return `
			Sorry, we don't have instructions for your browser.
			You could look it up though.
		`;
	};

	return (
		<Card
			class={`${installed !== false ? "hidden" : ""} my-4`}
		>
			<Stack>
				<h2 class="text-xl">Hello there!</h2>
				<p>
					It looks like Paquet isn't installed yet. Access your web
					app library easier by clicking the button below.
				</p>
				<Button
					fullWidth
					onClick={onClickInstall}
					icon="download"
					variant="primary"
				>
					Install
				</Button>
			</Stack>
			<Dialog
				title="Install Paquet"
				content={installInstructions(clientBrowser)}
				open={dialogOpen}
				setOpen={setDialogOpen}
				buttons={[
					{
						variant: "outlined",
						text: "OK",
						onClick: () => setDialogOpen(false),
					},
				]}
			/>
		</Card>
	);
}
