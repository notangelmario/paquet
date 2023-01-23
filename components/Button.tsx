import type { JSX } from "preact";
import { btn, btnOutset } from "@/lib/ui.ts";
import { tw } from "twind";
import Icon, { Props as IconProps } from "@/components/Icon.tsx";

export type Props = {
	icon?: string;
	iconProps?: IconProps;
	fullWidth?: boolean;
	outlined?: boolean;
	error?: boolean;
};

export default function Button(props: Props & JSX.IntrinsicElements["button"]) {
	return (
		<button
			{...props}
			class={`
				${!props.outlined ? tw(btnOutset) : tw(btn)}
				relative rounded px-8 py-2 text-base
				${props.error ? "border-error" : "border-current"}
				
				${
				props.outlined
					? `bg-light border dark:bg-dark ${
						props.error ? "text-error" : "text-current"
					}`
					: `${
						props.error
							? "bg-error shadow-error"
							: "bg-primary override:shadow-primary"
					} text-white`
			}
				flex flex-row flex-nowrap gap-2 justify-center items-center
				
				${props.fullWidth ? "w-full" : ""}
				${props.class || ""}
			`}
		>
			{props.icon &&
				(
					<Icon
						name={props.icon}
						color={props.outlined
							? props.error ? "#ff0000" : undefined
							: "#ffffff"}
						size={18}
						inline
						{...props.iconProps}
					/>
				)}
			{props.children}
		</button>
	);
}
