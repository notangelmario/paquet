import UAParser from "ua-parser-js";
import { useEffect, useState } from "preact/hooks";

type BrowserDetails = {
	isIos: boolean;
	browserName: string | undefined;
	type: string | undefined;
};

/**
 * This hook returns the browser details.
 * This is to be used client side.
 * 
 * @returns Browser details
 */
export const useBrowser = (): BrowserDetails => {
	const [result, setResult] = useState<UAParser.IResult>();

	useEffect(() => {
		const parser = new UAParser();
		const result = parser.getResult();
		setResult(result);
	}, []);

	return {
		isIos: result?.os.name === "iOS",
		browserName: result?.browser.name,
		type: result?.device.type,
	};
};

/**
 * This hook returns the browser details.
 * This is to be used server side.
 * 
 * @param req Request object
 * @returns Browser details
 */
export const useBrowserServerSide = (req: Request): BrowserDetails => {
	const parser = new UAParser(req.headers.get("user-agent") || "");
	const result = parser.getResult();

	return {
		isIos: result?.os.name === "iOS",
		browserName: result?.browser.name,
		type: result?.device.type,
	};
};
