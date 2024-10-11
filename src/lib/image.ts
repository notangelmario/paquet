import { Image } from "https://deno.land/x/imagescript@1.3.0/mod.ts";

export const buildImageUrl = (url: string, width?: number, height?: number) => {
	// The origin doesn't matter here, we use only the pathname
	const imageUrl = new URL("https://paquet.app/api/image-proxy");

	imageUrl.searchParams.set("url", url);
	imageUrl.searchParams.set("width", width?.toString() || "0");
	imageUrl.searchParams.set("height", height?.toString() || "0");

	return imageUrl.pathname + imageUrl.search;
};

export const getImageSize = async (url: string) => {
	const res = await fetch(url);

	if (!res.ok) {
		return null;
	}

	const img = await res.arrayBuffer();

	try {
		const imageToResize = await Image.decode(img);

		return {
			width: imageToResize.width,
			height: imageToResize.height,
		};
	} catch {
		return null;
	}
};
