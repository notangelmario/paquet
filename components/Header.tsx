/**@jsx h */
import { h } from "preact";
import { tw } from "@twind";


const Header = (props: h.JSX.IntrinsicElements["h1"]) => {
	return (
		<h1
			{...props}
			className={`${tw`text-8xl font-thin mt-16`} ${props.className}`}
		>
			{props.children}
		</h1>
	)
}

export default Header;