import { RouteContext } from "@/types/Handler.ts";
import { RouteConfig } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getApp } from "@/lib/db.ts";

export const config: RouteConfig = {
	skipAppWrapper: true,
	skipInheritedLayouts: true
}

export default async function Sandbox(req: Request, ctx: RouteContext) {
	const appId = ctx.params.id
	const params = new URL(req.url).searchParams;
	const allowScripts = params.get("scripts") === "true";
	const allowPointerLock = params.get("pointer-lock") === "true";
	const allowAutoplay = params.get("autoplay") === "true";
	const allowAccelerometer = params.get("accelerometer") === "true";
	const allowGeolocation = params.get("geolocation") === "true";
	const allowGyroscope = params.get("gyroscope") === "true";
	const app = await getApp(appId || "");

	if (!appId || !app) {
		return new Response(null, { 
			status: 302,
			headers: {
				Location: "/home"
			}
		});
	}

	const createAllowList = () => {
		const allowList = [];

		if (allowAutoplay) {
			allowList.push("autoplay");
		}

		if (allowAccelerometer) {
			allowList.push("accelerometer");
		}

		if (allowGeolocation) {
			allowList.push("geolocation");
		}
		
		if (allowGyroscope) {
			allowList.push("gyroscope");
		}

		return allowList.join("; ");
	}

	return (
		<html lang="en">
			<Head>
				<link rel="icon" href={app.icon} />
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<link rel="manifest" href={`/sandbox/manifest.json?id=${appId}`} />
				<meta name="theme-color" content={app.accentColor} />
				<title>{app.name} &middot; Paquet Sandbox</title>
				<style>{`
					* {
						margin: 0;
						padding: 0;
						box-sizing: border-box;
					}

					body {
						width: 100%; 
						height: 100%; 
						overflow: hidden; 
						background-color: ${app.accentColor};
					}

					iframe {
						position: fixed;
						top: 0;
						left: 0;
						bottom: 0;
						right: 0;
						width: 100%;
						height: 100%;
						border: none;
						margin: 0;
						padding: 0;
						overflow: hidden;
						z-index: 999998;
						background-color: #fff;
					}

					#sandbox-indicator {
						position: fixed;
						top: 0;
						left: 0;
						bottom: 0;
						right: 0;
						width: 100vw;
						height: 100vh;
						pointer-events: none;
						z-index: 999999;
					}
				`}
				</style>
			</Head>
			<body>
				<iframe
					id="app"
					src={app.url}
					frameborder="0"
					sandbox={`allow-same-origin ${allowScripts ? "allow-scripts" : ""} ${allowPointerLock ? "allow-pointer-lock" : ""}`}
					allow={createAllowList()}
				></iframe>
				<div id="sandbox-indicator"></div>
			</body>
		</html>
	)
}
