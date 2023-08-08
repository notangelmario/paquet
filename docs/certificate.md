# Certificate

Certificates are simply JSON files that prove ownership
of web apps.

This will result in a [verified badge](https://paquet.app/app/org.eu.ciorogarla) on your app.

## Generate certificate

You can generate a certificate [here](https://paquet.app/certificate).
You only need to suply your app URL.

## Add the certificate

1. Download the `certificate.json` and host it somewhere in your app.
2. After that, update your [app specficiation](/docs/app-spec.md).
3. On the next [update cycle](/docs/updating.md), your app will display a verified badge
if the certificate verification is successful.
