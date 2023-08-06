import { IS_BROWSER } from "$fresh/runtime.ts";
import { useState } from "preact/hooks";
import type { App } from "@/types/App.ts";
import Button from "@/components/Button.tsx";
import Dialog from "@/islands/Dialog.tsx";

interface Props {
	app: App;
	ssrLoved: boolean;
}

export default function LoveAppButton({ app, ssrLoved }: Props) {
	const [throttle, setThrottle] = useState(false);
	const [isLoved, setLoved] = useState(ssrLoved);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(
		false,
	);

	const openDialogs = () => {
		if (!isLoved) {
			loveAppToggle();
			setDialogOpen(true);
		} else {
			setConfirmDeleteDialogOpen(true);
		}
	};

	const loveAppToggle = () => {
		if (throttle) return;

		if (!isLoved) {
			setDialogOpen(true);
		} else {
			setConfirmDeleteDialogOpen(true);
		}

		setLoved(!isLoved);
		setThrottle(true);
		fetch(`/api/user/love/` + app.id, {
			method: isLoved ? "DELETE" : "POST",
		})
			.finally(() => setThrottle(false));
	};

	const confirmDelete = () => {
		loveAppToggle();
		setConfirmDeleteDialogOpen(false);
	};

	return (
		<>
			<Button
				variant="outlined"
				fullWidth
				disabled={!IS_BROWSER}
				icon={isLoved ? "broken-heart" : "heart"}
				onClick={openDialogs}
			>
				{isLoved ? "Remove from loved" : "Love this app"}
			</Button>
			<Dialog
				title="You love this app!"
				content={`Added ${app.name} to your loved apps for easier access. You can remove it at any time.`}
				open={dialogOpen}
				setOpen={setDialogOpen}
				buttons={[
					{
						text: "Open loved apps",
						icon: "heart",
						onClick: () => window.location.href = "/loved",
					},
					{
						text: "Ok",
						variant: "outlined",
						onClick: () => setDialogOpen(false),
					},
				]}
			/>
			<Dialog
				title="Are you sure?"
				content={`Are you sure you want to remove ${app.name} from your loved apps? You can add it back anytime.`}
				open={confirmDeleteDialogOpen}
				setOpen={setConfirmDeleteDialogOpen}
				buttons={[
					{
						text: "Confirm",
						icon: "broken-heart",
						variant: "error",
						onClick: confirmDelete,
					},
					{
						text: "Cancel",
						variant: "outlined",
						onClick: () => setConfirmDeleteDialogOpen(false),
					},
				]}
			/>
		</>
	);
}
