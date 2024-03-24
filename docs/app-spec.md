# App specification

This is a sample specification:

```json
{
    "id": "app.paquet",
    "url": "https://paquet.app/home",
    "manifestUrl": "https://paquet.app/manifest.json",
    "features": ["openSource", "mobile", "desktop"],
    "githubUrl": "https://github.com/roseto/paquet",
    "version": 1
}
```

## Keys

### `id` 

This is required. This must be the domain of your app reversed.
If your app is hosted at a subdomain, append the pathname at the end.

Example 1: `https://paquet.app -> app.paquet` \
Example 2: `https://roseto.github.io/paquet -> io.github.roseto.paquet`

### `url`

This is the URL to your app. This can point to your app's landing page or the app itself.

### `manifestUrl`

This is the url pointing to your app's manifest. If your app generates
different manifest files with a different pathname on every deployment,
you can exclude this value as Paquet will dynamically look for your manifest
file in your app. 

It is typically recommended to include this in your app specification.

### `features`

This represents the features that your app offers.
The available features are: 

- `openSource`: If the app is open source
- `mobile`: Is mobile optimized
- `desktop`: Is desktop optimized
- `auth`: Requires authentication
- `offline`: Works offline


### `version`

This is used to keep track of the changes to your app specification
You can use your app's version as a string (`"version": "1.0.0"`) or
use a number and increment it on each app specification update (`"version": 1`)


## Additional keys

### `githubUrl` & `gitlabUrl`

This URL points to the public repository of your app.

### `categories`

This will include the categories that your app is included in.
It is preferable to use the `categories` key in your app's manifest.

### `author` & `authorLink`

If you want to have a different author text from the one in your app's manifest,
you can add an `author` key. You can also add `authorLink` to link to your
website or GitHub profile.

### `accentColor`

This is if you want a separate theme color from the one in your app's manifest.

### `certificateUrl`

This URL points to your certificate that is used to prove ownership of your app.
