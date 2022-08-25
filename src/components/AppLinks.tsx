/** @jsx h */
import { h } from "preact";
import { tw } from "@/lib/twind.ts";
import Card from "@/components/Card.tsx";
import ListItem from "@/components/ListItem.tsx";

export interface Props {
	github?: string,
	gitlab?: string
}

export default function AppLinks({ github, gitlab }: Props) {
	return (
		<Card
			disableGutters
		>
			{github &&
				<a
					href={github}
					target="_blank"
					rel="noopener noreferrer"
				>
					<ListItem
						button
						title="GitHub"
						subtitle={github.replace("https://github.com/", "")}
						image="/icons/github.svg"
						imageProps={{
							class: tw`p-3 filter dark:invert`,
						}}
						divider={!!gitlab}
					/>
				</a>
			}
			{gitlab &&
				<a
					href={github}
					target="_blank"
					rel="noopener noreferrer"
				>
					<ListItem
						button
						title="GitLab"
						subtitle={gitlab.replace("https://gitlab.com/", "")}
						image="/icons/gitlab.svg"
						imageProps={{
							class: tw`p-3 filter dark:invert`,
						}}
					/>
				</a>
			}
		</Card>
	)
}