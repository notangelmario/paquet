# Sandbox

> **Note:** This feature is experimental and may change in the future.

Sandbox is a feature that allows you to run web apps in a secure environment,
limiting the permissions that the app has access to. This is useful for
testing apps that you don't trust or that you don't know what they do.


Sandboxed apps can even be installed on your device, but they will be
run in a secure environment that limits the permissions that the app has access
to.

## How it works

When you use the sandbox feature, the app is run within a secure environment
that limits the permissions that the app has access to. This means that the app
can't access your files, your camera, your microphone, or any other sensitive


## How to enable sandbox installations

You need to allow CSP (Content Security Policy) headers in your app's server
to allow the app to be run within [paquet.app](https://paquet.app). This is
necessary to allow the app to be run in a secure environment.

After that, you need to enable the `allowSandbox` key in your
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
