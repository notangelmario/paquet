import { IS_BROWSER } from "$fresh/runtime.ts";
import { useMemo, useState } from "preact/hooks";
import type { App } from "@/types/App.ts";
import Button from "@/components/Button.tsx";
import { useUserLoved } from "@/hooks/useUserLoved.ts";
import Dialog from "@/islands/Dialog.tsx";

interface Props {
	app: App;
	ssrLoved: boolean;
}

export default function LoveAppButton({ app, ssrLoved }: Props) {
	const { apps, setApps, loading } = useUserLoved();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

	const loveApp = (app: App) => {
		if (!apps.find((a) => a.id === app.id)) {
			setApps([...apps, {
				id: app.id,
				name: app.name,
				icon: app.icon,
				url: app.url,
				author: app.author,
			}]);
			setDialogOpen(true);
		} else {
			setConfirmDeleteDialog(true);
		}
	};

	const isAppLoved = useMemo(() => {
		if (loading) {
			return ssrLoved;
		}

		return apps.find((a) => a.id === app.id);
	}, [apps, app]);

	const confirmDelete = () => {
		setApps(apps.filter((a) => a.id !== app.id));
		setConfirmDeleteDialog(false);
	};

	return (
		<>
			<Button
				outlined
				fullWidth
				disabled={!IS_BROWSER}
				icon={isAppLoved ? "broken-heart" : "heart"}
				onClick={() => loveApp(app)}
			>
				{isAppLoved ? "Remove from loved" : "Love this app"}
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
						outlined: true,
						onClick: () => setDialogOpen(false),
					},
				]}
			/>
			<Dialog
				title="Are you sure?"
				content={`Are you sure you want to remove ${app.name} from your loved apps? You can add it back anytime.`}
				open={confirmDeleteDialog}
				setOpen={setConfirmDeleteDialog}
				buttons={[
					{
						text: "Confirm",
						icon: "broken-heart",
						error: true,
						onClick: confirmDelete,
					},
					{
						text: "Cancel",
						outlined: true,
						onClick: () => setConfirmDeleteDialog(false),
					},
				]}
			/>
		</>
	);
}
