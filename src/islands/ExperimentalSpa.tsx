/**@jsx h */
import { h } from "preact";
import { useEffect } from "preact/hooks";

export default function ExperimentalSpa() {
	useEffect(() => {
		const links = document.querySelectorAll("a");

		links.forEach((link) => {
			link.setAttribute("onclick", `window.experimentalNavigateTo('${link.attributes.getNamedItem("href")?.value}')`);
			link.removeAttribute("href");
		});

		window.experimentalNavigateTo = async (href) => {
			const res = await fetch(location.origin + href);

			const html = await res.text();
			const dummyDom = document.createElement("html");
			dummyDom.innerHTML = html.replace("<!DOCTYPE html>", "")
			const body = dummyDom.getElementsByTagName("body")[0];

			document.body.innerHTML = body.innerHTML
		}
	})

	return <div></div>;
}

declare global {
	interface Window {
		experimentalNavigateTo: (href: string) => void;
	}
}