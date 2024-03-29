# Sandbox Installations

> **Note:** This feature is experimental and may change in the future.

Sandbox installations allow you to install apps straight from Paquet, without
needing to visit the app's website. Apps gets installed in a sandboxed
environment.

No need for custom installation flows, just click and install.

## How it works

When you install an app from Paquet, the app is installed in a sandboxed
environment. This means that the app is installed in a separate container that
is isolated.

## How to enable sandbox installations

To allow sandbox installations, you need to enable the `allowSandbox` key in your
app's specification. This key is a boolean value that is set to `true`.

```json
{
	"id": "us.githubstat",
	"url": "https://githubstat.us",
	"manifestUrl": "https://githubstat.us/manifest.json",
	"features": [
		"mobile",
		"desktop"
	],
	"categories": [
		"utilities",
		"productivity",
		"development"
	],
	"author": "rtsfred3",
	"accentColor": "#54c48c",
	"allowSandbox": true
}
```
