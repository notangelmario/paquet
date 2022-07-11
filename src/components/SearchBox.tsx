/**@jsx h */
import { h } from "preact";
import { tw } from "@twind";

type Props = {
	text?: string;
	resetButton?: boolean;
	onReset?: () => void;
	inputProps?: h.JSX.IntrinsicElements["input"];
	inputRef?: h.JSX.IntrinsicElements["input"]["ref"];
}

export default function SearchBox(props?: Props & h.JSX.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			{...props}
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
				ref={props?.inputRef}
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
					placeholder-black
					dark:placeholder-white
					placeholder-opacity-50
					focus:placeholder-opacity-50
					text-black dark:text-white
					${props?.inputProps?.class || ""}
				`}
			/>
			{props?.resetButton && (
				<span
					class={tw`
						material-symbols-outlined
						p-2
					`}
					onClick={props.onReset}
				>
					close
				</span>
			)}
		</div>
	)
}