/**@jsx h */
import { h } from "preact";
import { tw } from "@twind";



export default function Card(props: h.JSX.IntrinsicElements["div"]) {
	return (
		<div
			className={
				`${tw`
					bg-paper-light
					dark:bg-paper-dark
					p-2
					rounded
				`} 
				${props.className || ""}
			`}
		>
			{props.children}
		</div>
	)
}