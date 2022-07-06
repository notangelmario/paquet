import UAParser from "ua-parser-js";
import { useEffect, useState } from "preact/hooks";



export const useBrowser = () => {
	const [result, setResult] = useState<UAParser.IResult>();

	useEffect(() => {
		const parser = new UAParser();
		const result = parser.getResult();
		setResult(result);
	}, [])

	return {
		isIos: result?.os.name === "iOS",
	}
};

export const useBrowserServerSide = (req: Request) => {
	const parser = new UAParser(req.headers.get("user-agent") || "");

	return {
		isIos: parser.getOS().name === "iOS",
	}
}