import type { App } from "@/types/App.ts";
import { useUserLoved } from "@/hooks/useUserLoved.ts";
import ListItem from "@/components/ListItem.tsx";
import { buildImageUrl } from "@/lib/image.ts";

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
						image={buildImageUrl(app.icon, 64, 64)}
						subtitle={app.author}
					/>
				</a>
			))}
		</>
	);
}
