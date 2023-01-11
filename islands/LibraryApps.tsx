import type { App } from "@/types/App.ts";
import { useLibrary } from "@/hooks/useLibrary.ts";
import ListItem from "@/components/ListItem.tsx";

interface Props {
	ssrApps: App[];
}

export default function LibraryApps({ ssrApps }: Props) {
	const { apps, setApps } = useLibrary(ssrApps);

	return (
		<>
			{apps.map((app) => (
				<a
					href={`/app/${app.id}`}
				>
					<ListItem
						title={app.name}
						image={app.icon}
						subtitle={app.author}
					/>
				</a>
			))}
		</>
	);
}
