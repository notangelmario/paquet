import { Handler } from "@/types/Handler.ts";
import { CSS as gfmCSS } from "gfm";

// TODO(lucacasonato): hash the file and use the hash as the filename, and serve
// with high-cacheability headers.

const CSS = `${gfmCSS}

ol.nested {
	counter-reset: item;
}

ol.nested li {
	display: block;
}

ol.nested li:before {
	font-feature-settings: "kern" 1, "tnum" 1;
	-webkit-font-feature-settings: "kern" 1, "tnum" 1;
	-ms-font-feature-settings: "kern" 1, "tnum" 1;
	-moz-font-feature-settings: "kern" 1, "tnum" 1;
	content: counters(item, ".") ". ";
	counter-increment: item;
}

.markdown-body ul {
	list-style: disc;
}

.markdown-body ol {
	list-style: numeric;
}

.toggle:checked + .toggled {
	display: block;
}

.markdown-body a {
	color: #8267be
}

@media (prefers-color-scheme: dark) {
	[data-color-mode=auto][data-dark-theme=dark] {
		--color-canvas-subtle: #323232
	}
}

@media (prefers-color-scheme: light) {
	[data-color-mode=auto][data-dark-theme=dark] {
		--color-canvas-subtle: #f0f0f0
	}
}

`;

export const handler: Handler = () => new Response(CSS, {
	headers: {
		"content-type": "text/css",
		"cache-control": "public, max-age=31536000, immutable",
	},
});
