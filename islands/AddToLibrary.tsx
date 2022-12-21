import { useMemo, useState } from "preact/hooks";
import type { App } from "@/types/App.ts";
import Button from "@/components/Button.tsx";
import { useLibrary } from "@/hooks/useLibrary.ts";
import Dialog from "@/islands/Dialog.tsx";

interface Props {
	app: App;
}

export default function AddToLibrary({ app }: Props) {
	const { apps, setApps } = useLibrary();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

	const addToLibrary = (app: App) => {
		if (!apps.find((a) => a.id === app.id)) {
			setApps([...apps, {
				id: app.id,
				name: app.name,
				icon: app.icon,
				url: app.url,
			}]);
			setDialogOpen(true);

			navigator.serviceWorker.controller?.postMessage({
				type: "CACHE_URLS",
				data: [app.icon],
			});
		} else {
			setConfirmDeleteDialog(true);
		}
	};

	const isAppInLibrary = useMemo(() => {
		return apps.find((a) => a.id === app.id);
	}, [apps, app]);

	const confirmDelete = () => {
		setApps(apps.filter((a) => a.id !== app.id));
		navigator.serviceWorker.controller?.postMessage({
			type: "WIPE_URLS",
			data: [app.icon],
		});
		setConfirmDeleteDialog(false);
	};

	return (
		<>
			<Button
				outlined
				fullWidth
				icon={isAppInLibrary ? "done" : "add"}
				onClick={() => addToLibrary(app)}
			>
				{isAppInLibrary ? "Added to library" : "Add to library"}
			</Button>
			<Dialog
				title="Library"
				content={`Added ${app.name} to library for easier access. You can remove it from the library at any time.`}
				open={dialogOpen}
				setOpen={setDialogOpen}
				buttons={[
					{
						text: "Open library",
						icon: "dashboard",
						onClick: () => window.location.href = "/library",
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
				content={`Are you sure you want to remove ${app.name} from your library? You can add it back anytime.`}
				open={confirmDeleteDialog}
				setOpen={setConfirmDeleteDialog}
				buttons={[
					{
						text: "Confirm",
						red: true,
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
