/**@jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { App } from "@/types/App.ts";

export const FEATURES = {
	desktop: {
		id: "desktop",
		name: "Desktop optimized",
		icon: "computer"
	},
	mobile: {
		id: "mobile",
		name: "Mobile optimized",
		icon: "smartphone"
	},
	offline: {
		id: "offline",
		name: "Works offline",
		icon: "cloud_off"
	},
	openSource: {
		id: "openSource",
		name: "Open source",
		icon: "code"
	},
}

type Props = {
	features: App["features"];
}

export default function Features(props: Props) {
	return (
		<div>
			<h3
				class={tw`text-2xl`}
			>
				Features
			</h3>
			<ul
				class={tw`flex flex-row gap-4 overflow-x-scroll mt-4`}
			>
				{Object.values(FEATURES).map(({ id, name, icon }) => (
					<li
						class={tw`flex flex-1 flex-col items-center text-center ${props.features?.[id as keyof App["features"]] || "opacity-50"}`}
					>
						<div
							class={tw`
								flex justify-center items-center
								rounded-full w-12 h-12 mb-2

								${props.features?.[id as keyof App["features"]] ? "bg-secondary" : "bg-black dark:bg-white"}
							`}
						>
							<span 
								class={tw`material-symbols-outlined text-white dark:text-black`}
							>
								{icon}
							</span>
						</div>
						{name}
					</li>
				))}
			</ul>
		</div>
	)
}