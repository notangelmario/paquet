import { useState } from "preact/hooks";
import Stack from "@/components/Stack.tsx";
import Dialog from "@/islands/Dialog.tsx";
import { useLibrary } from "@/hooks/useLibrary.ts";
import { btn } from "@/lib/ui.ts";
import { tw } from "twind";

interface Props {
	offline?: boolean;
	supabaseUrl: string;
	supabaseKey: string;
}

export default function LibraryApps({}: Props) {
	const [confirmDialog, setConfirmDialog] = useState(false);
	const [toDeleteId, setToDeleteId] = useState("");
	const [toDeleteName, setToDeleteName] = useState("");
	const { apps, setApps, loading } = useLibrary();

	const removeApp = (id: string) => {
		setToDeleteId(id);
		setToDeleteName(apps.find((app) => app.id === id)?.name || "");
		setConfirmDialog(true);
	};

	const confirmToDelete = () => {
		if (!toDeleteId) return;
		setApps(apps.filter((a) => a.id !== toDeleteId));
		setConfirmDialog(false);
	};

	// Update apps
	// useEffect(() => {
	// 	if (offline) return

	// }, [])

	return loading ? <div /> : (
		<div>
			{apps.length
				? (
					<div class="grid grid-cols-3 gap-4 items-start md:grid-cols-6 lg:grid-cols-8">
						{apps.map((app) => (
							<a
								key={app.id}
								href={app.url}
								target="_blank"
								rel="noopener noreferrer"
								class={tw`${btn} flex flex-col space-y-2 justify-center items-center p-4 text-center`}
							>
								<img
									src={app.icon}
									alt={app.name}
									class="rounded"
									width={64}
									height={64}
								/>
								<p class="text-xl">
									{app.name}
								</p>
								<a
									href="#"
									class="underline opacity-50"
									onClick={(e) => {
										e.preventDefault();
										removeApp(app.id);
									}}
								>
									Remove
								</a>
							</a>
						))}
						<Dialog
							title="Are you sure?"
							content={`Are you sure you want to remove ${toDeleteName} from your library? You can add it back anytime.`}
							open={confirmDialog}
							setOpen={setConfirmDialog}
							buttons={[
								{
									text: "Confirm",
									error: true,
									onClick: confirmToDelete,
								},
								{
									text: "Cancel",
									outlined: true,
									onClick: () => setConfirmDialog(false),
								},
							]}
						/>
					</div>
				)
				: (
					<Stack>
						<img
							src="/illustrations/apps.svg"
							data-fresh-disable-lock
							alt=""
							class="h-64"
						/>
						<p class="text-center">
							You have no apps in your library yet. Add any app
							you like here for easier access.
						</p>
					</Stack>
				)}
		</div>
	);
}
