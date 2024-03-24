import UAParser from "ua-parser-js";
import { useEffect, useState } from "preact/hooks";

type BrowserDetails = {
	isIos: boolean;
	browserName: string | undefined;
	osVersion: string | undefined;
	type: string | undefined;
};

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
		osVersion: result?.os.version,
		type: result?.device.type,
	};
};

export const useBrowserServerSide = (req: Request): BrowserDetails => {
	const parser = new UAParser(req.headers.get("user-agent") || "");
	const result = parser.getResult();

	return {
		isIos: result?.os.name === "iOS",
		browserName: result?.browser.name,
		osVersion: result?.os.version,
		type: result?.device.type,
	};
};
