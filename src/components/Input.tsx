import { JSX } from "preact/jsx-runtime";

export interface InputProps {
	fullWidth?: boolean;
}

export default function Input(
	props: InputProps & JSX.IntrinsicElements["input"],
) {
	return (
		<input
			class={`
				rounded px-4 py-2
				bg-transparent
				grainy
				border-none
				outline-none
				placeholder-opacity-50
				text-black dark:text-white
				shadow-inset-light dark:shadow-inset-dark
				${props.fullWidth ? "w-full" : ""}
				${props.class ?? ""}
			`}
			{...props}
		/>
	);
}
