import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect, useState } from "preact/hooks";
import { useScroll } from "@/hooks/useScroll.ts";
import Icon from "@/components/Icon.tsx";

export type Props = {
	transparentTop?: boolean;
	color?: string;
	back?: boolean;
	right?: {
		icon: string;
		href: string;
	}[];
};

export default function Navbar(props: Props) {
	const darkAccent = combineColors(props.color + "50", "#121212");
	const lightAccent = combineColors(props.color + "50", "#dddddd");

	const [visitedHome, setVisitedHome] = useState(
		!!globalThis.sessionStorage?.getItem("visitedHome"),
	);

	const trigger = useScroll({
		threshold: 16,
	});

	useEffect(() => {
		if (props.color) {
			const metaTags = document.querySelectorAll(
				"meta[name=theme-color]",
			);
			metaTags.forEach((meta) => meta.remove());

			const metaTag = document.createElement("meta");
			metaTag.name = "theme-color";
			metaTag.media = "(prefers-color-scheme: dark)";
			metaTag.content = darkAccent;
			document.head.appendChild(metaTag);

			const metaTag2 = document.createElement("meta");
			metaTag2.name = "theme-color";
			metaTag2.media = "(prefers-color-scheme: light)";
			metaTag2.content = lightAccent;
			document.head.appendChild(metaTag2);
		}
	}, []);

	useEffect(() => {
		const darkMetaTag = document.querySelector(
			"meta[name=theme-color][media='(prefers-color-scheme: dark)']",
		);
		const lightMetaTag = document.querySelector(
			"meta[name=theme-color][media='(prefers-color-scheme: light)']",
		);

		if (props.transparentTop && !trigger) {
			darkMetaTag?.setAttribute("content", darkAccent);
			lightMetaTag?.setAttribute("content", lightAccent);
		} else if (props.transparentTop && trigger) {
			darkMetaTag?.setAttribute("content", "#121212");
			lightMetaTag?.setAttribute("content", "#dddddd");
		}
	}, [trigger]);

	useEffect(() => {
		if (!visitedHome && globalThis.location.pathname === "/home") {
			setVisitedHome(true);
			globalThis.sessionStorage.setItem("visitedHome", "true");
		}
	}, []);

	const goBack = () => {
		if (visitedHome) {
			globalThis.history.back();
		} else {
			setVisitedHome(true);
			globalThis.sessionStorage.setItem("visitedHome", "true");

			globalThis.location.replace("/home");
		}
	};

	return (
		<div
			class={`
				${props.transparentTop && !trigger
					? "bg-transparent"
					: "bg-light dark:!bg-dark"
				}
				fixed flex w-full 
				-top-px left-0 right-0
				items-center 

				transition-colors
				px-2 py-2 z-30

				${trigger ? "shadow-md" : ""}
			`}
		>
			<div>
				{props.back
					? IS_BROWSER
						? (
							<button
								class="btn-icon"
								onClick={goBack}
							>
								<Icon
									name="back"
									size={24}
								/>
							</button>
						)
						: (
							<a
								href="/home"
								class="btn-icon"
							>
								<Icon
									name="back"
									size={24}
								/>
							</a>
						)
					: null}
			</div>
			<div class="flex flex-row ml-auto items-center gap-2">
				{props.right &&
					props.right.map(({ icon, href }) => (
						<a class="btn-icon" href={href}>
							<Icon
								name={icon}
								size={24}
							/>
						</a>
					))}
			</div>
		</div>
	);
}

const hexToDecimal = (hex: string) => parseInt(hex, 16);
const decimalToHex = (decimal: number) =>
	decimal.toString(16).length < 2
		? `0${decimal.toString(16)}`
		: decimal.toString(16);

// Please don't touch this. It took me 2 hours to make
// When I made it I knew how it worked. Now I don't.
// And I don't want to figure out. It's magic.
//
// First color is the overlay
// Second is opaque background
function combineColors(c1: string, c2: string) {
	const c1r = hexToDecimal(c1.replace("#", "").slice(0, 2));
	const c1g = hexToDecimal(c1.replace("#", "").slice(2, 4));
	const c1b = hexToDecimal(c1.replace("#", "").slice(4, 6));
	const c1a = hexToDecimal(c1.replace("#", "").slice(6, 8));

	const c2r = hexToDecimal(c2.replace("#", "").slice(0, 2));
	const c2g = hexToDecimal(c2.replace("#", "").slice(2, 4));
	const c2b = hexToDecimal(c2.replace("#", "").slice(4, 6));
	// const c2a = hexToDecimal(c2.replace("#", "").slice(6, 8));

	const afterOpacity = (fg: number[], o: number, bg = [255, 255, 255]) =>
		fg.map((colFg, idx) => Math.round(o * colFg + (1 - o) * bg[idx]));

	const newColor = afterOpacity([c1r, c1g, c1b], c1a / 255, [c2r, c2g, c2b]);

	return "#" + decimalToHex(newColor[0]) + decimalToHex(newColor[1]) +
		decimalToHex(newColor[2]);
}
