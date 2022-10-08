# Manifest

> Keep in mind that this is still work in progress and might change!

You can specify your app details on Paquet, using your `manifest.json` or `site.webmanifest` file.

Here is an example:

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
* `description`
* `categories`
* `icons`
* `screenshots` (soon)

### `name`

This is the name that is going to be used when showing your app.

### `description`

This is the description that will be shown on your app listing.

### `categories`

This is usually an array of categories. Paquet only fetches the first value that matches any of the list of available categories.

Here is a list of available categories:
* utilities
* social
* games
* music
* travel
* development

> Mind that if Paquet does not find any of the specified categories, the app will not be listed

### `icons`

Paquet grabs the highest quality icon present. Maskable icons are prioritized.

### `screenshots`

Not yet implemented.