import { useEffect, useState } from "preact/hooks";


export const usePath = () => {
	const [path, setPath] = useState(globalThis.location?.pathname || "");
	
	useEffect(() => {
		const listener = () => setPath(globalThis.location.pathname);
		globalThis.addEventListener("popstate", listener);
		return () => globalThis.removeEventListener("popstate", listener);
	}, []);

	return path;
}
