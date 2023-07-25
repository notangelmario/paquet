import type { Handler } from "$fresh/server.ts";
// @ts-expect-error: This library is not typed
import { Image } from "https://deno.land/x/imagescript@1.2.15/mod.ts";

export const handler: Handler = async (req) => {
	const url = new URL(req.url);
	const imgUrl = url.searchParams.get("url");
	const width = parseInt(url.searchParams.get("width") || "0");
	const height = parseInt(url.searchParams.get("height") || "0");

	if (!imgUrl) {
		return new Response("Missing url param", { status: 400 });
	}

	const res = await fetch(imgUrl);
	
	if (!res.ok) {
		return new Response("Error fetching image", { status: 500 });
	}

	let img = await res.arrayBuffer();
	const imgType = res.headers.get("content-type") || "image/png";

	if (width || height) {
		// In case of failure, return the original image
		try {
			const imageToResize = await Image.decode(img);

			if (width && height) {
				imageToResize.resize(width, height);
			} else {
				imageToResize.resize(width || height, Image.RESIZE_AUTO);
			}

			img = await imageToResize.encode(1);
		} catch {
			console.error("Error resizing image");
		}
	}

	return new Response(img, {
		headers: {
			"content-type": imgType,
			"cache-control": "public, max-age=604800",
		},
	});
}
