/**@jsx h */
import { h } from "preact";
import { tw } from "@twind";

type Props = {
	text?: string;
	inputProps?: h.JSX.IntrinsicElements["input"];
}

export default function SearchBox(props?: Props & h.JSX.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			class={tw`
				flex flex-row
				items-center justify-between
				w-full rounded
				bg-paper-light dark:bg-paper-dark
				${props?.class || ""}
			`}
		>
			<span
				class={tw`
					pl-2
					material-symbols-outlined
					opacity-50
				`}
			>
				search
			</span>
			<input
				autocomplete="off"
				name="q"
				value={props?.text}
				type="text"
				placeholder="Search"
				{...props?.inputProps}
				class={tw`
					p-2 w-full
					bg-transparent
					border-none
					outline-none
					text-black dark:text-white
					${props?.inputProps?.class || ""}
				`}
			/>
		</div>
	)
}