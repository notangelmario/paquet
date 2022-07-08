/**@jsx h */
import { h } from "preact";
import { tw } from "@twind";


export default function SearchBox() {
	return (
		<div
			class={tw`
				flex flex-row
				items-center justify-between
				w-full rounded
				bg-paper-light dark:bg-paper-dark
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
				type="text"
				placeholder="Search"
				class={tw`
					p-2 w-full
					bg-transparent
					border-none
					outline-none
					text-black dark:text-white
					text-opacity-50
					
				`}
			/>
		</div>
	)
}