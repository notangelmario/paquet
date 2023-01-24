# Getting started

:wave: Hi! Here is how you can add your app to Paquet. Adding a new app
is done by submiting an issue on our [GitHub repo](https://github.com/notangelmario/paquet).

> Verification on apps has been removed, because all apps are checked
> during the listing process.


## Using `manifest.json`

### Requirements:
* Web app manifest
* Service worker
* Name
* App icons

You can use your `manifest.json` or `site.webmanifest` to specify the app listing
details.

Here are the keys we use when displaying your app listing on Paquet:

* `name`
* `author`
* `description`
* `categories`
* `icons`
* `screenshots`

You can find more about manifest keys on the [manifest documentation](/docs/manifest.md)

## Updating

Paquet will periodically fetch new content using your manifest so you don't have to
worry about submitting a new issue each time you update your app.

We check for app updates daily, so keep that in mind.

## Issues

In case your app has some issues, it will be temporarily taken down, and you will be contacted
in order to fix the issues.