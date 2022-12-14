import type { JSX } from "preact";
import Icon from "@/components/Icon.tsx";

export type Props = {
	icon?: string;
};

export default function Header(props: Props & JSX.IntrinsicElements["h1"]) {
	return (
		<div class="flex flex-row gap-1 items-center mt-24">
			{props.icon && (
				<Icon
					name={props.icon}
					data-disable-fresh-lock
					width={48}
					height={48}
					inline
				/>
			)}
			<h1
				{...props}
				class={`text-5xl font-light ${props.class || ""}`}
			>
				{props.children}
			</h1>
		</div>
	);
}
