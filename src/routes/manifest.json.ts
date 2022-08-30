import "dotenv";
import type { Handler } from "@/types/Handler.ts";
import { DEV_MODE } from "@/lib/app.ts";

export const handler: Handler = (req) => {
	const manifest = {
	    name: DEV_MODE ? "Paquet Shop Development Preview" : "Paquet Shop",
	    short_name: DEV_MODE ? "Paquet Dev" : "Paquet",
	    author: "Savin Angel-Mario",
	    description: "Check out Paquet to find the best web apps on the open web.",
	    id: DEV_MODE ? "shop.paquet.dev" : "shop.paquet",
	    icons: [
	        {
	            src: "/android-chrome-192x192.png",
	            sizes: "192x192",
	            type: "image/png"
	        },
	        {
	            src: "/android-chrome-512x512.png",
	            sizes: "512x512",
	            type: "image/png"
	        },
	        {
	            src: "/android-chrome-192x192.png",
	            sizes: "192x192",
	            type: "image/png",
	            purpose: "maskable"
	        },
	        {
	            src: "/android-chrome-512x512.png",
	            sizes: "512x512",
	            type: "image/png",
	       		purpose: "maskable"
        	}
    	],
    	theme_color: "#8267be",
		background_color: "#ffffff",
    	display: "standalone",
	    start_url: "/?utm_source=pwa",
	    scope: "/"
	};

	return new Response(JSON.stringify(manifest, null, 4))
}