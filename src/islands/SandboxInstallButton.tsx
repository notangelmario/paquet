declare global {
	interface Window {
		// deno-lint-ignore no-explicit-any
		installPrompt: any;
	}
}

import { useState } from "preact/hooks";
import Button from "@/components/Button.tsx";
import Dialog from "@/islands/Dialog.tsx";
import { useBrowser } from "@/hooks/useBrowser.ts";

export default function InstallBanner() {
	const clientBrowser = useBrowser();
	const [dialogOpen, setDialogOpen] = useState(false);

	const onClickInstall = () => {
		if (window.installPrompt) {
			window.installPrompt.prompt();
		} else {
			setDialogOpen(true);
		}
	};

	const installInstructions = (props: typeof clientBrowser) => {
		const header = ``;

		if (props.isIos && (props.browserName === "Mobile Safari" || parseFloat(props.osVersion || "0") >= 16.4)) {
			return header + `
				Add Paquet by tapping
				the share button
				and tap "Add to Home Screen".
			`;
		}

		if (props.isIos && props.browserName !== "Mobile Safari") {
			return header + `
				Unfortunately, Paquet on iOS only works in Safari.
				Open Paquet in Safari and tap 
				the share button
				and tap "Add to Home Screen".
			`;
		}

		// Desktop Chrome instructions
		if (props.browserName === "Chrome" && !props.type) {
			return header + `
				Add Paquet by clicking
				the install button
				in the address bar and click "Install".
			`;
		}

		// Desktop Firefox instructions
		if (props.browserName === "Firefox" && !props.type) {
			return header + `
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
		<>
			<Button
				fullWidth
				onClick={onClickInstall}
				icon="download"
				variant="outlined"
			>
				Install
			</Button>
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
		</>
	);
}
