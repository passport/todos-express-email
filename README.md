# todos-express-email

This app illustrates how to use [Passport](https://www.passportjs.org/) with
[Express](https://expressjs.com/) to sign users in with email via [SendGrid](https://sendgrid.com/).
Use this example as a starting point for your own web applications.

## Quick Start

To run this app, clone the repository and install dependencies:

```bash
$ git clone https://github.com/passport/todos-express-email.git
$ cd todos-express-email
$ npm install
```

This app must be configured with a SendGrid API key.

Once credentials have been obtained, create a `.env` file and add the following
environment variables:

```
SENDGRID_API_KEY=__INSERT_API_KEY_HERE__
```

Start the server.

```bash
$ npm start
```

Navigate to [`http://localhost:3000`](http://localhost:3000).

## Overview

This example illustrates how to use Passport and the [`passport-magic-link`](https://www.passportjs.org/packages/passport-magic-link/)
strategy within an Express application to sign users in with email via SendGrid.

This app implements the features of a typical [TodoMVC](https://todomvc.com/)
app, and adds sign in functionality.  This app is a traditional web application,
in which all application logic and data persistence is handled on the server.

User interaction is performed via HTML pages and forms, which are rendered via
[EJS](https://ejs.co/) templates and styled with vanilla CSS.  Data is stored in
and queried from a [SQLite](https://www.sqlite.org/) database.

After users sign in, a login session is established and maintained between the
server and the browser with a cookie.  As authenticated users interact with the
app, creating and editing todo items, the login state is restored by
authenticating the session.

## License

[The Unlicense](https://opensource.org/licenses/unlicense)

## Credit

Created by [Jared Hanson](https://www.jaredhanson.me/)
