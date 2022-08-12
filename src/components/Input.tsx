/**@jsx h */
import { h, type JSX } from "preact";
import { theme, tw } from "@twind";
import { css } from "twind/css";

export default function Input(props: JSX.IntrinsicElements["input"]) {
	return (
		<input
			{...props}
			class={tw`
				block w-full
				px-3 py-1.5 text-base
				font-normal text-black
				bg-paper-light bg-clip-padding
				border border-solid border-black border-opacity-25
				rounded transition ease-in-out m-0
				focus:bg-paper-light focus:border-primary focus:outline-none

				dark:(bg-paper-dark focus:bg-paper-dark text-white border-white border-opacity-25)

				${props.class || ""}

				${
				css({
					"accent-color": theme("colors.primary"),
				})
			}
			`}
		/>
	);
}
