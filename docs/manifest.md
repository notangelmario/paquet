# Manifest

You can specify your app details on Paquet, using your `manifest.json` or `site.webmanifest` file.

> This file is usually crawled by Paquet.

Here is a `manifest.json` example:

```json
{
	"name": "Paquet Shop",
	"author": "Savin Angel-Mario",
	"short_name": "Paquet",
	"description": "Check out Paquet to find the best web apps on the open web.",
	"id": "shop.paquet",
	"icons": [
		{
			"src": "/android-chrome-192x192.png",
			"sizes": "192x192",
			"type": "image/png"
		},
		{
			"src": "/android-chrome-512x512.png",
			"sizes": "512x512",
			"type": "image/png"
		},
		{
			"src": "/android-chrome-192x192.png",
			"sizes": "192x192",
			"type": "image/png",
			"purpose": "maskable"
		},
		{
			"src": "/android-chrome-512x512.png",
			"sizes": "512x512",
			"type": "image/png",
			"purpose": "maskable"
		}
	],
	"theme_color": "#8267be",
	"background_color": "#ffffff",
	"display": "standalone",
	"start_url": "/?utm_source=pwa",
	"scope": "/"
}
```

The values Paquet uses in your app listing are:

-   `name`
-   `author`
-   `description`
-   `categories`
-   `icons`
-   `screenshots`

### `name`

This is the name that is going to be used when showing your app.

## `author`

This is the name of the author. It is prefered to use the same
names across multiple apps published to Paquet to share
verification status

> This property is not used often, so when not present,
> Paquet will look for an author in the web page.

### `description`

This is the description that will be shown on your app listing.

> Most apps do not have a `description` property, so Paquet
> will look for one in the web page if not present.

### `categories`

This is usually an array of categories.
Paquet fetches this manifest property and reflects it to your app.
Only the available categories will be displayed.

Paquet also uses aliases so apps are better categorised.

[Here is a list of available categories.](https://paquet.app/category)

### `icons`

Paquet will fetch the first maskable icon that is 96x96 pixels.

If this icon is not found, Paquet will search for 128x128, 192x192, 256x256, 512x512.
The first found will be set as icon. The accent color will be grabbed from
the icon.

> Since 3.2.0, Paquet does not store the app's icon anymore.
> Please make sure your icons does not have a cross origin restriction.

### `screenshots`

We fetch for all screenshots no matter the size. We recomend
you to add screenshots for all suported devices. Screenshots
will also improve your visibility on Paquet.

> Since 3.2.0, Paquet does not store the app's screenshots anymore.
> Please make sure your screenshots does not have a cross origin restriction.
