# Manifest

You can specify your app details on Paquet, using your `manifest.json` or `site.webmanifest` file.

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
            "type": "image/png",
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
* `name`
* `author`
* `description`
* `categories`
* `icons`
* `screenshots`

### `name`

This is the name that is going to be used when showing your app.

## `author`

This is the name of the author. It is prefered to use the same
names across multiple apps published to Paquet to share 
verification status

### `description`

This is the description that will be shown on your app listing.

### `categories`

This is usually an array of categories.
Paquet now fetches and uses the first category found in the list of available categories.

Here is a list of available categories:

* productivity
* utilities
* social
* games
* music
* travel
* development

> Mind that if Paquet does not find any of the specified categories, the app will not be listed
> in the category pages

### `icons`

Paquet will fetch the first maskable icon that is 128x128 pixels.

If this icon is not found, Paquet will search for 192x192, 256x256, 512x512.
The first found will be set as icon. The accent color will be grabbed from
the icon.

### `screenshots`

We fetch for all screenshots no matter the size. We recomend
you to add screenshots for all suported devices. Screenshots
will also improve your visibility on Paquet.
