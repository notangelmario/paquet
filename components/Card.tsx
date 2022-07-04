/**@jsx h */
import { h } from "preact";
import { tw } from "@twind";


type Props = {
	disableGutters?: boolean
}

export default function Card(props: Props & h.JSX.IntrinsicElements["div"]) {
	return (
		<div
			className={
				`${tw`
					bg-paper-light
					dark:bg-paper-dark
					${!props.disableGutters && "p-4"}
					rounded
				`} 
				${props.className || ""}
			`}
		>
			{props.children}
		</div>
	)
}