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

This is usually an array of categories. ~Paquet only fetches the first value that matches any of the list of available categories~.
Paquet now fetches and uses the first category found in the list of available categories.

Here is a list of available categories:
* utilities
* social
* games
* music
* travel
* development

> Mind that if Paquet does not find any of the specified categories, the app will not be listed
> in the category pages

### `icons`

Paquet dynamically grab the high resolution icon and the low resolution icon.

Paquet prioritized 512x512 and 128x128 icons, but 192x192 and 256x256 icons are
also accepted.

> Keep in mind that in future versions, Paquet will prioritize
> 256x256 icons and 128x128 icons.

> If the icons are not found the app will not be approved.

### `screenshots`

We fetch for all screenshots no matter the size.
