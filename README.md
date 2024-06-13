# Nizzy Starter

An SaaS (Service as a Software) template starter kit already set up, that requires bare minimum configuration. For more details, watch [Free & Open Source SaaS Template Starter Kit](https://youtu.be/Q6jDdtbkMIU) on YouTube.

## Tech Stack

- NextJS 14
- Prisma
- TailwindCSS

## Saas Features

- Simple elegant UI
- Light and dark mode
- Manual authentication and OAuth (Google and GitHub)
- Database integration using Prisma
- Admin analytics page
- Payment system using Stripe
- Email integration with Resend and React Email

## Getting started

Here will be a step by step guide of how to setup the SaaS starter kit on your machine.

### Cloning the repository

Firstly, you need to clone the repository. You can do it like this:

```bash
# Using Git
git clone https://github.com/NizarAbiZaher/nizzy-starter.git

# Using GitHub CLI
gh repo clone NizarAbiZaher/nizzy-starter
```

Alternatively, you can also clone it using [GitHub Desktop](https://desktop.github.com/) application.

### Setup using NPM

This starter kit currently uses NPM as the package manager, if you use any other package manager follow [this section](#setup-using-different-package-managers).

Follow the steps below to correctly setup the project on your machine, and ensure everything works as expected.

First, install the modules and dependencies:

```bash
npm install
```

When that's done, you need to setup your `.env` file. On the root folder of your project you should see a file called `.env.example`. That file already contains a written guide to get the variables you need, but bellow will be the same steps in case you can't find it.

### Setup using different package managers

Follow the steps below to correctly setup the project on your machine, and ensure everything works as expected.

Since you wont use NPM, you need to remove the `package-lock.json` to prevent any possible conflicts.

Install the modules and dependencies:

```bash
# Using pnpm
pnpm install

# Using yarn
yarn install

# Using bun
bun install
```

If you dont use any of these, find the equivalent command for your package manager.

#### Create the environment variables file

On the root folder of your project, create a file called `.env` or `.env.local` and paste the following:

```env
DATABASE_URL=""
DIRECT_URL=""
APP_URL="http://localhost:3000"
AUTH_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
RESEND_API_KEY=""
STRIPE_API_KEY=""
STRIPE_WEBHOOK_SECRET=""
```

You are not required to use quotes your variables, although its recommended because in some cases, due to some special characters, it can mess up the variable.

#### Connect your database

You can use any database of your choice, i like to use [Neon](https://neon.tech/). You can watch [this video](https://youtu.be/ZAjOep8-M-Y?si=L94KHhlbV27y-V_O) if you want help related to database configuration.

If you already have a database prepared and know how to use it, you can just get the Database URL and Direct URL.

Example:

```env
DATABASE_URL="postgresql://username:password@hostname:port/database_name"
DIRECT_URL="postgresql://username:password@hostname:port/database_name"
```

#### App URL

Change this value when deploying your application.

Example:

```env
APP_URL="https://example.com/"
```

#### Auth Secret

The auth system was made using NextAuth, which required an auth secret for it to work. You can use any Secret generator, such as [https://generate-secret.vercel.app/32](https://generate-secret.vercel.app/32).

Example:

```env
AUTH_SECRET="bae23fc1c21a41743058c56a366459a2"
```

#### GitHub Client ID and Client Secret

Go to [GitHub Developers](https://github.com/settings/developers) and click on **OAuth Apps** then **New OAuth App**. Fill in the details as follows:

1. Homepage URL: http://localhost:3000 (change to your domain when deploying)
2. Authorization callback URL: http://localhost:3000/api/auth/callback/github (replace `localhost:3000` with your domain when deploying)
3. Click on Register Application

After creating a new OAuth App, copy the required Client ID and Client Secret and populate the respective variables.

Example:

```env
GITHUB_CLIENT_ID="abc123def456ghi789jkl"
GITHUB_CLIENT_SECRET="s3cr3tK3yV@lu3!"
```

Disclaimer: This was generated as an example from ChatGPT and will not work.

#### Google Client ID and Client Secret

Go to [Google Cloud Console](https://console.cloud.google.com) and click on **Create project** at the top and do as follows:

1. Name your project and click create
2. Go to the search, find and go to **APIs and Services**.
3. Click on **OAuth Consent Screen** on the sidebar, select **External** and fill out the **App Name**, **Support Email**, and **Developer Contact Information**. You may **Add Domain** if you have one, else leave it blank.
4. Click on **Save and Continue** until you reach the summary page.
5. Click on **Credentials** on the sidebar, click on **Create Credentials** and select **OAuth client ID**
6. Click on **Web Application** then on **Add URI** for both **Authorized JavaScript Origins** and **Authorized Redirect URIs**. Fill in the details as follows:
   - Authorized JavaScript Origins: http://localhost:3000 (change to your domain when deploying)
   - Authorized Redirect URIs: http://localhost:3000/api/auth/callback/google (change to your domain when deploying)

After creating a new OAuth App, copy the required Client ID and Client Secret and populate the respective variables.

Example:

```env
GOOGLE_CLIENT_ID="1234567890-abcde12345fghij67890klmno.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="XyZ_1234567890AbCdEfGhIj"
```

#### Resend API Key

Go to [Resend Website](https://resend.com/home) and on the **API Keys** section create a new API key. Fill the inputs and configure the settings as you wish, then copy the key and populate the respective variable.

Example:

```env
RESEND_API_KEY="re_2514c2801e44bed9a3bdf9e094e2ce1c"
```

#### Stripe API Key and Webhook Secret

You can find both at [Stripe](https://stripe.com). For more setup information you can checkout [this video](https://youtu.be/5hSEEod_BuA?si=377LS1z0ThLcs46T).

Example:

```env
STRIPE_API_KEY="sk_test_4eC39HqLyjWDarjtT1zdp7dc"
STRIPE_WEBHOOK_SECRET="whsec_1234567890abcdef1234567890abcdef"
```

#### Full `.env` file example

```env
DATABASE_URL="postgresql://username:password@hostname:port/database_name"
DIRECT_URL="https://api.example.com/endpoint"
APP_URL="https://example.com/"
AUTH_SECRET="bae23fc1c21a41743058c56a366459a2"
GITHUB_CLIENT_ID="abc123def456ghi789jkl"
GITHUB_CLIENT_SECRET="s3cr3tK3yV@lu3!"
GOOGLE_CLIENT_ID="1234567890-abcde12345fghij67890klmno.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="XyZ_1234567890AbCdEfGhIj"
RESEND_API_KEY="re_2514c2801e44bed9a3bdf9e094e2ce1c"
STRIPE_API_KEY="sk_test_4eC39HqLyjWDarjtT1zdp7dc"
STRIPE_WEBHOOK_SECRET="whsec_1234567890abcdef1234567890abcdef"
```

### Generating the Database tables

Now that the env variables are setup, we need to create the tables in your database in order for the authentication and analytics to work. To do so, run the following command:

```bash
npm run database
```

If you have any trouble in this process, please open an issue or join my discord for help.

### Running the project

In order to verify if everything is working properly and to further customize the project to your own SaaS, you need to start a local development server. You can do so using any of the following commands:

```bash
# Using npm
npm run dev

# Using pnpm
pnpm run dev

# Using yarn
yarn run dev

# Using bun
bun run dev
```

It should output something like this:

```bash
  ▲ Next.js 14.2.3
  - Local:        http://localhost:3000
  - Environments: .env.local

  ✓ Starting...
  ✓ Ready in 2.4s
```

If this is the case, you can just **CTRL** + **Click** on http://localhost:3000, or manually opening it on your browser.

If this is not the case, make sure you didn't miss any of the steps before. If the error persists and you don't know what to do, open an issue [here](https://github.com/NizarAbiZaher/nizzy-starter/issues).

### That's it!

You should now be able to edit and change whatever you'd like, if you are having trouble with specific libraries, make sure to check out the respective documentation and properly research about the issue.

Make sure you remove the Alert at the top if you intend to use this starter kit. To do so go to `app/layout.tsx` and remove the `<AlertDemo />` component (you may also delete it from `components/alert.tsx`).

### Theme configuration

The project is theme based, which means it is based on one color for the entire thing. The theme color is [Vivid blue](https://www.colorhexa.com/1f8eef) and it's defined in HSL.

You can find the theme colors in `app/globals.css`. To change the main theme color replace the `--primary` with HSL or RBG, without comas seperating them (I'm not sure if it is possible to use other color models, but feel free to try it out).

Here is how you can do it using CSS variables:

```css
/* Using HSL */
--primary: 208 87% 53%; /* Background colors, borders,... */
--primary-foreground: 0 0% 0%; /* Foreground in buttons */

/* Using RBG Decimal */
--primary: 31 142 239;
--primary-foreground: 0 0 0;

/* Using RBG Percent */
--primary: 12.2% 55.7% 93.7%;
--primary-foreground: 0% 0% 0%;
```

The reason for the colors not being defined like `hsl(208, 87%, 53%)` is because the project uses tailwind for styling, and with the current definition we can control the alpha within the class, for example `bg-primary/20` (this will make the primary color have an alpha value of 0.2).

If you do change the main color please consider changing the `--primary-foreground` as well, since it is currently a shade of white and it might not look good on the color you chose.

### Aditional information

SaaS Starter Kit Author: NizarAbiZaher

#### Special thanks to all the contributors below:

- [dpaulos6](https://github.com/dpaulos6)

### Socials

- [YouTube](https://www.youtube.com/@NizzyABI)
- [GitHub](https://github.com/NizarAbiZaher)
- [Discord Community](https://discord.com/invite/nizar)
