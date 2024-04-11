import type { JSX } from "preact";
import Icon from "@/components/Icon.tsx";

export type Props = {
	icon?: string;
};

export default function Header(props: Props & JSX.IntrinsicElements["h1"]) {
	return (
		<div class="flex flex-row gap-1 items-center mt-[calc(6rem_+_env(safe-area-inset-top))]">
			{props.icon && (
				<Icon
					name={props.icon}
					size={48}
					inline
				/>
			)}
			<h1
				{...props}
				class={`text-5xl font-medium ${props.class || ""}`}
			>
				{props.children}
			</h1>
		</div>
	);
}
