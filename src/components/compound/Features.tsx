import { FEATURES } from "@/lib/features.ts";
import Container from "@/components/Container.tsx";
import SlideContainer from "@/components/SlideContainer.tsx";
import SlideItem from "@/components/SlideItem.tsx";
import Icon from "@/components/Icon.tsx";

export type Props = {
	features: string[];
};

export default function Features(props: Props) {
	return (
		<>
			<Container>
				<h3 class="text-2xl mb-2">
					Features
				</h3>
			</Container>
			<SlideContainer>
				{FEATURES.map(({ id, name, icon }, idx) => (
					<SlideItem
						isLast={idx === Object.entries(FEATURES).length - 1}
					>
						<div
							class={`
								${props.features &&
									!props.features?.find((value) =>
										value === id
									)?.length
									? "opacity-50"
									: ""
								}

								flex flex-row justify-center items-center gap-2
							`}
						>
							<div
								class={`
									flex flex-shrink-0 justify-center items-center
									rounded-full w-12 h-12

									${props.features &&
										props.features?.find((value) =>
											value === id
										)?.length
										? "bg-secondary shadow shadow-outset-secondary"
										: "bg-light-dark"
									}
								`}
							>
								<Icon
									name={icon}
									size={24}
									color="#ffffff"
								/>
							</div>

							<p class="text-xs">
								{name}
							</p>
						</div>
					</SlideItem>
				))}
			</SlideContainer>
		</>
	);
}
