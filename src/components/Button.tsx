import type { JSX } from "preact";
import Icon, { Props as IconProps } from "@/components/Icon.tsx";

export type Props = {
	icon?: string;
	iconProps?: IconProps;
	fullWidth?: boolean;
	outlined?: boolean;
	primary?: boolean;
	error?: boolean;
};

export default function Button(props: Props & JSX.IntrinsicElements["button"]) {
	return (
		<button
			{...props}
			class={`
				${!props.outlined ? "btn-outset" : "btn"}
				relative rounded px-8 py-2 text-base
				${props.error ? "border-error" : "border-current"}
				
				${props.outlined
					? `bg-light border dark:bg-dark ${props.error ? "text-error" : "text-current"}`
					: `${props.error
						? "bg-error shadow-error text-white"
						: ""}`
				}
				${props.primary ? "bg-primary shadow shadow-outset-primary text-white" : ""}
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
							: props.primary ? "#ffffff" : undefined}
						size={18}
						inline
						{...props.iconProps}
					/>
				)}
			{props.children}
		</button>
	);
}
