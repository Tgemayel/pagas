## What is Pagas?

Pagas is an online platform that helps creators monetize their talents using Stellar. We make earning Stellar as easy as sharing a link. Its built with Next JS using Stellar and Mongo DB Atlas.

## What it does

Pagas empowers creators to sell products by handling the file distribution and payments. By leveraging Stellars unique features like fee_bump, sellers pay 0% and keep 100% of their sale

## Fully open source

Pagas is a fully open source, built using Node.js & React and designed in Figma.

## Who we are

Pagas is built by three cousins building better tools for the Stellar ecosystem.

* Karin Fernandez
* Daniel Fernandez
* Toni Gemayel

## What's next for Pagas

User authentication, analytics, customer management & more.

## About the project

This app is featuring dynamic import, by using component-level code splitting, which can minimize the JavaScript payloads and improve application load time.

It has Magic integrated, which allow an user to authenticate.
The Magic link is a "passwordless" sign up and login option that sends a unique link to your email inbox, which you can use to get into your Clipchamp account. Each magic link is unique and can only be used once.

The secuence of the events for authentication is:

- User enters their email and clicks "Log in".
- An email containing a magic link is sent to the user.
- User clicks the email link.
- User can go back to previous page and it is redirected to the home page

Building the Application

### Prerequisites

You will need Node.js version 10.13 or later installed on your system

MacOS, Windows (including WSL), and Linux are supported

### Installing

- Install dev dependencies

```
npm install
```

- Create file to save your environment variables

```
 touch .env .env.development .env.production
```

Add the following content to both files(per environment):

```
<!-- .env -->
MONGO_URI=mongodb+srv://admin:1234@cluster0-vf9xd.mongodb.net/Cluster0?retryWrites=true&w=majority
PAGAS_AWS_ACCESS_KEY=aws_access_key
PAGAS_AWS_SECRET_ACCESS_KEY=aws_secret_access_key
PAGAS_AWS_REGION=aws_region
BUCKET_NAME=your_aws_bucket_name

<!--  .env.development -->
PRODUCT_API_URL=http://localhost:4000
NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY=your_magic_publishable_key
ENCRYPTION_SECRET=32+_character_encryption_secret
MAGIC_SECRET_KEY=your_magic_secret_key

<!--  .env.development -->
PRODUCT_API_URL=http://localhost:4000
NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY=your_magic_publishable_key
ENCRYPTION_SECRET=32+_character_encryption_secret
MAGIC_SECRET_KEY=your_magic_secret_key

```

- To start developing

```
npm run dev
```

- To view the application

```
Visit http://localhost:4000/checkout (Currently only page created)
```

## Deployment

Deployments are handled by Vercel.

