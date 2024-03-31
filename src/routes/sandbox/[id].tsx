import { RouteContext } from "@/types/Handler.ts";
import { RouteConfig } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getApp } from "@/lib/db.ts";

export const config: RouteConfig = {
	skipAppWrapper: true,
	skipInheritedLayouts: true
}

export default async function Sandbox(_: Request, ctx: RouteContext) {
	const appId = ctx.params.id
	const app = await getApp(appId || "");

	if (!appId || !app) {
		return new Response(null, { 
			status: 302,
			headers: {
				Location: "/home"
			}
		});
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
						border: 2px dashed red;
					}
				`}
				</style>
			</Head>
			<body>
				<iframe
					id="app"
					src={app.url}
					frameborder="0"
				></iframe>
				<div id="sandbox-indicator"></div>
			</body>
		</html>
	)
}
