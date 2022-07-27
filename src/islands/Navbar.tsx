/**@jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { useScroll } from "../hooks/useScroll.ts";
import { iconBtn } from "../utils/sharedUi.ts";

export type Props = {
	back?: boolean;
	rightIcon?: string;
	rightIconHref?: string;
};

export default function Navbar(props: Props) {
	const trigger = useScroll({
		threshold: 16,
	});

	return (
		<div
			class={tw`
					fixed flex w-full bg-white dark:bg-dark
					-top-px left-0 right-0
					items-center content-center
					
					border-opacity-25 border-black dark:(border-white border-opacity-25)

					${trigger && "border-b-1"}

					px-2 py-2 z-30
				`}
		>
			<div>
				{props.back && (
					<button
						class={tw(iconBtn)}
						onClick={() => history.back()}
					>
						<span class="material-symbols-outlined">
							arrow_back
						</span>
					</button>
				)}
			</div>
			{props.rightIcon && (
				<a class={tw`${iconBtn} ml-auto`} href={props.rightIconHref}>
					<span class="material-symbols-outlined">
						{props.rightIcon}
					</span>
				</a>
			)}
		</div>
	);
}
