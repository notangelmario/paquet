export const buildImageUrl = (url: string, width?: number, height?: number) => {
	// The origin doesn't matter here, we use only the pathname
	const imageUrl = new URL("https://paquet.app/api/image-proxy");

	imageUrl.searchParams.set("url", url);
	imageUrl.searchParams.set("width", width?.toString() || "0");
	imageUrl.searchParams.set("height", height?.toString() || "0");

	return imageUrl.pathname + imageUrl.search;
};
