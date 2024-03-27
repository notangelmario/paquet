# How updates work

Paquet fetches your app's details every 12 hours at 00:00 UTC.
This is called an **update cycle**.

During an update cycle, Paquet will fetch your app's manifest file and compare it with the existing data.
If there are any changes, Paquet will update your app's details in the database.

Apps are forcefully updated whenever there are changes to the app specification.
This means that if you update your app's specification, Paquet will update your app's details in the database immediately.