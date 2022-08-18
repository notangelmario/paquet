/**@jsx h */
/**@jsxFrag Fragment */
import { Fragment, h } from "preact";
import { tw } from "@/lib/twind.ts";
import type { App } from "@/types/App.ts";
import Container from "@/components/Container.tsx";
import SlideContainer from "@/components/SlideContainer.tsx";
import SlideItem from "@/components/SlideItem.tsx";

export const FEATURES = {
	desktop: {
		id: "desktop",
		name: "Desktop optimized",
		icon: "computer",
	},
	mobile: {
		id: "mobile",
		name: "Mobile optimized",
		icon: "smartphone",
	},
	offline: {
		id: "offline",
		name: "Works offline",
		icon: "cloud_off",
	},
	openSource: {
		id: "openSource",
		name: "Open source",
		icon: "code",
	},
};

export type Props = {
	features: App["features"];
};

export default function Features(props: Props) {
	return (
		<>
			<Container>
				<h3
					class={tw`text-2xl mb-2`}
				>
					Features
				</h3>
			</Container>
			<SlideContainer
				snap
			>
				{Object.values(FEATURES).map(({ id, name, icon }, idx) => (
					<SlideItem
						isLast={idx === Object.entries(FEATURES).length - 1}
					>
						<div
							class={`
								${
								!props.features?.[id as keyof App["features"]]
									? "opacity-50"
									: ""
							}

								flex flex-row justify-center items-center gap-2
							`}
						>
							<div
								class={tw`
									flex flex-shrink-0 justify-center items-center
									rounded-full w-12 h-12

									${
									props.features
											?.[id as keyof App["features"]]
										? "bg-secondary"
										: "bg-black dark:bg-white"
								}
								`}
							>
								<span
									class={tw`material-symbols-outlined text-white dark:text-black`}
								>
									{icon}
								</span>
							</div>

							<p
								class={tw`text-xs`}
							>
								{name}
							</p>
						</div>
					</SlideItem>
				))}
			</SlideContainer>
		</>
	);
}
