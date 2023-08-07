# How updates work

Paquet fetches your app's details every 12 hours at 00:00 UTC.
This is called a **update cycle**. To save on resources,
we check for changes to your app's specification and app's manifest.

## When does it update?

Your app listing will update whenever the manifest's content changes
or when the **version number** has been increased in the [app specification](/docs/app-spec.md).
Other changes from the app specification will not trigger the update cycle to update your app.

> In the future we will also check if the filename has changed
