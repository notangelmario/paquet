/**@jsx h */
import { h, type JSX } from "preact";
import { tw } from "@/lib/twind.ts";
import Icon from "@/components/Icon.tsx";

export type Props = {
	icon?: string;
};

export default function Header(props: Props & JSX.IntrinsicElements["h1"]) {
	return (
		<h1
			{...props}
			class={`${tw`text-5xl font-light pt-16`} ${props.class || ""}`}
		>
			{props.icon &&
				(
					<Icon
						name={props.icon}
						width={48}
						height={48}
						inline
					/>
				)}
			{props.children}
		</h1>
	);
}
