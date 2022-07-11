/**@jsx h */
/**@jsxFrag Fragment */
import { h, Fragment } from "preact";
import { tw } from "@twind";
import { useEffect, useState } from "preact/hooks";
import SearchBox from "../components/SearchBox.tsx";


export default function Search() {
	const [ open, setOpen ] = useState(false);
	
	useEffect(() => {
		if (open) {
			document.documentElement.style.overflow = "hidden";
		} else {
			document.documentElement.style.overflow = "";
		}
	}, [open]);

	return (
		<>
			<div
				class={tw`
					${open ? 
						"opacity-100 pointer-events-auto"
						: 
						"opacity-0 pointer-events-none"
					}
					fixed top-0 left-0 right-0 bottom-0 flex justify-center items-end
					bg-black bg-opacity-50 z-40
					transition-opacity duration-150 ease-in-out
				`}
				onClick={(e) => {
					if (e.target !== e.currentTarget) return;
					setOpen(false);
				}}
			>
			</div>
			<SearchBox
				class={tw`z-50`}
				inputProps={{
					onFocus: () => setOpen(true),
					onBlur: () => setOpen(false),
				}}
			/>
		</>
	)
}