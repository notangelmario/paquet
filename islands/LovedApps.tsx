import type { App } from "@/types/App.ts";
import { useUserLoved } from "@/hooks/useUserLoved.ts";
import ListItem from "@/components/ListItem.tsx";

interface Props {
	ssrApps: App[];
}

export default function LovedApps({ ssrApps }: Props) {
	const { apps } = useUserLoved(ssrApps);

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
