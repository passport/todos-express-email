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

## License

[The Unlicense](https://opensource.org/licenses/unlicense)

## Credit

Created by [Jared Hanson](https://www.jaredhanson.me/)
