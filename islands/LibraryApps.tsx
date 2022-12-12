import { useEffect, useState } from "preact/hooks";
import type { App } from "@/types/App.ts";
import { btn } from "@/lib/ui.ts";
import { tw } from "twind";


export default function LibraryApps() {
	const [apps, setApps] = useState<App[]>([]);
	
	useEffect(() => {
		const apps = JSON.parse(localStorage.getItem("library") || "")["apps"] as App[];

		if (apps) {
			setApps(apps);
		}
	}, []);

	const removeApp = (app: App) => {
		apps.splice(apps.indexOf(app), 1);
		localStorage.setItem("library", JSON.stringify({ apps }));
	}

	return (
		<div
			class="grid grid-cols-3 gap-4 md:grid-cols-6 lg:grid-cols-8"
		>
			{apps.map(app => (
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
						width={64}
						height={64}
					/>
					<p
						class="text-xl"
					>
						{app.name}
					</p>
					<a 
						href="#" 
						class="underline opacity-50"
						onClick={e => {
							e.preventDefault();
							removeApp(app);
						}}
					>
						Remove
					</a>
				</a>
			))}
		</div>
	)
}
