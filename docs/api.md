# Paquet API

Paquet exposes a simple API you can use that to query apps listed on Paquet.
All API requests are to be made to `https://paquet.app`.

> Paquet is hosted at edge in 35+ locations.
> Typically you are going to get responses from the nearest location.

## `Get /api`

Checks which region you are requesting.

## `GET /api/apps/[id]`

Gets full details about a certain app.

[Example](https://paquet.app/api/apps/com.bundlejs)

## `GET /api/image-proxy?url=[image-url]&width=[width]&height=[height]`

Gets a proxied image that strips away things like CORS.

[Example](http://localhost:3000/api/image-proxy?url=https%3A%2F%2Fscreenrecorderweb.app%2Ffavicon-192.png&width=96&height=96&__frsh_c=e44a4e08748802c2e2d726ee5bc1afe1d3df01eda)
