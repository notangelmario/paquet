/**@jsx h */
/**@jsxFrag Fragment */
import { Fragment, h } from "preact";
import { tw } from "@/lib/twind.ts";
import { FEATURES } from "@/lib/features.ts";
import type { App } from "@/types/App.ts";
import Container from "@/components/Container.tsx";
import SlideContainer from "@/components/SlideContainer.tsx";
import SlideItem from "@/components/SlideItem.tsx";
import Icon from "@/components/Icon.tsx";

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
								<Icon
									name={icon}
									width={24}
									height={24}
									class="filter dark:!invert-0 invert"
								/>
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
