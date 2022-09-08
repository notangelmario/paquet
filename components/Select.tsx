import { type JSX } from "preact";
import { tw } from "@/lib/twind.ts";

export default function Select(props: JSX.IntrinsicElements["select"]) {
	return (
		<select
			{...props}
			class={tw`
				form-control block w-full
				px-3 py-1.5 text-base
				font-normal text-black
				bg-paper-light bg-clip-padding
				border border-solid border-black border-opacity-25
				rounded transition ease-in-out m-0
				focus:bg-paper-light focus:border-primary focus:outline-none

				dark:(bg-paper-dark focus:bg-paper-dark text-white border-white border-opacity-25)

				${props.class || ""}
			`}
		/>
	);
}
