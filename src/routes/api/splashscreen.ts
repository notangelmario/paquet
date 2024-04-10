import { Handler } from "@/types/Handler.ts";
// @ts-expect-error: This library is not typed
import { Image } from "https://deno.land/x/imagescript@1.3.0/mod.ts";

export const handler: Handler = async (req) => {
	const url = new URL(req.url);
	const iconUrl = url.searchParams.get("icon");
	const bkgColor = url.searchParams.get("bkgColor");
	const width = parseInt(url.searchParams.get("width") || "0");
	const height = parseInt(url.searchParams.get("height") || "0");

	const image = new Image(width, height);

	image.fill(parseInt("0x" + (bkgColor || "ffffff") + "ff"));

	const iconRes = await fetch(iconUrl || "");

	if (!iconRes.ok) {
		return new Response("Error fetching icon", { status: 500 });
	}

	const icon = await iconRes.arrayBuffer();


	try {
		const iconImage = await Image.decode(icon);
		image.composite(iconImage.resize(256, 256).cropCircle(), width / 2 - iconImage.width / 2, height / 2 - iconImage.height / 2);
	} catch {
		console.error("Error compositing image");
	}

	const img = await image.encode(1);

	return new Response(img, {
		headers: {
			"content-type": "image/png",
			"cache-control": "public, max-age=604800",
		},
	});
}
