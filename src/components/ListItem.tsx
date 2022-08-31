/**@jsx h */
/**@jsxFrag Fragment */
import { Fragment, h, type JSX } from "preact";
import { tw } from "@/lib/twind.ts";
import { btn } from "@/lib/ui.ts";
import Icon from "@/components/Icon.tsx";
import Divider from "@/components/Divider.tsx";

export type Props = {
	button?: boolean;
	icon?: string;
	image?: string;

	title?: string;
	subtitle?: string;
	imageProps?: h.JSX.IntrinsicElements["img"];
	divider?: boolean;
};

export default function ListItem(props: Props & JSX.IntrinsicElements["div"]) {
	return (
		<>
			<div
				{...props}
				class={tw`
						${props.button && btn} 
						flex items-center p-4

						${props.class || ""}
					`}
			>
				{props.icon || props.image
					? props.icon
						? (
							<div
								class={tw`
									flex justify-center items-center w-12 h-12 mr-4
								`}
							>
								<Icon
									name={props.icon}
									width={28}
									height={28}
								/>
							</div>
						)
						: (
							<img
								src={props.image}
								alt={props.title}
								width="48px"
								height="48px"
								{...props.imageProps}
								class={tw` 
									w-12 h-12 rounded 
									mr-4 
									${props.imageProps?.class || ""}
								`}
							/>
						)
					: null}

				<div>
					<h2 class={tw`text-lg`}>
						{props.title}
					</h2>
					<p class={tw`text-sm opacity-50`}>
						{props.subtitle}
					</p>
				</div>
			</div>
			{props.divider && <Divider inset />}
		</>
	);
}
