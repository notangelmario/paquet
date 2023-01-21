# Privacy policy

The only data that Paquet collects about you is your name, email, profile image
and what provider you used to log in which are provided by your auth provider
(Google, GitHub, etc.). This information is only used to display a profile
in the [settings page](https://paquet.shop/settings).

Paquet keeps data about the apps that you love. The apps that you love are
queried to make a ranking system for most loved apps. The apps that you love
are associated with an ID, but the ID can not be traced back to you by other
users. **Your name, email or profile image are not public and cannot be seen by
other users**.

Paquet **does not share** any data about you with any third party, and is not
used to make a profit in any way.

## Account deletion

You can request an account deletion at [savin@paquet.shop](mailto:savin@paquet.shop).
Once you send the email, you confirm that you are sure that you want your account deleted.
The email has to be sent from the same email that is associated with the account.

**Account deletion is permanent and we do not keep any traces of your account in our database.**

## For short

All the data that we keep about is: name, email, profile image, authentication provider
and apps you loved. No one except Paquet administrator(s) can see this information. Paquet
administrator(s) will only access this data when requested by a user. (troubleshooting, deleting account)

## FAQ

Q: Paquet is open source, couldn't anyone just query the production database and compromise user accounts?\
A: No. Even though Paquet is open source, we have certain limitations on the database that prevents even
the server from accessing sensitive information. The only way that anyone could access the database
is by having access to a specific secret key. To access this secret key, you would need to bypass
GitHub Account 2FA, then Supabase Account 2FA. Pretty unlikely.

Q: Couldn't anyone just grab your computer and compromise the whole app?\
A: My data is encrypted and my computer is protected by a 12+ alphanumeric password. Still pretty unlikely.

Q: How do I know that you won't just sell my data to other third parties?\
A: First of all, there isn't a lot of data to sell to make a significant profit. Second, I kept the data
that Paquet uses to a minimum because I respect other's privacy the same way I respect mine. I want
Paquet to be strong figher against a world where data is the new currency.
