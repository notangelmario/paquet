/**@jsx h */
import { h } from "preact";
import { tw } from "@twind";


const Header = (props: h.JSX.IntrinsicElements["h1"]) => {
	return (
		<h1
			{...props}
			className={`${tw`text-5xl font-light pt-16`} ${props.className || ""}`}
		/>
	)
}

export default Header;