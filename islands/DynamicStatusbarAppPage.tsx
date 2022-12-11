import { useEffect } from "preact/hooks";

interface Props {
	accentColor: string;
}

export default function DynamicStatusbarAppPage({ accentColor }: Props) {
	useEffect(() => {
		const metaTags = document.querySelectorAll("meta[name=theme-color]");
		metaTags.forEach((meta) => meta.remove());

		const metaTag = document.createElement("meta");
		metaTag.name = "theme-color";
		metaTag.media = "(prefers-color-scheme: dark)";
		metaTag.content = combineColors(accentColor + "50", "#121212");
		document.head.appendChild(metaTag);

		const metaTag2 = document.createElement("meta");
		metaTag2.name = "theme-color";
		metaTag2.media = "(prefers-color-scheme: light)";
		metaTag2.content = combineColors(accentColor + "50", "#ffffff");
		document.head.appendChild(metaTag2);

	}, [accentColor]);

	return <div class="hidden"/>;
}

const hexToDecimal = (hex: string) => parseInt(hex, 16);
const decimalToHex = (decimal: number) => decimal.toString(16);

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

	const afterOpacity = (fg: number[], o: number,bg=[255,255,255]) => fg.map((colFg,idx)=> Math.round(o*colFg+(1-o)*bg[idx]));

	const newColor = afterOpacity([c1r, c1g, c1b], c1a / 255, [c2r, c2g, c2b]);

	return "#" + decimalToHex(newColor[0]) + decimalToHex(newColor[1]) + decimalToHex(newColor[2]);
}
