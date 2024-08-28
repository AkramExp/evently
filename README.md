# Evently

Evently a comprehensive, full-stack platform for managing events. It serves as a hub, spotlighting diverse events taking place globally. Featuring seamless payment processing through Stripe, you have the capability to purchase tickets for any event or even initiate and manage your own events.

![s1](https://github.com/AkramExp/evently/blob/main/public/screenshot.png)

#### Live Site : https://evently-akramexp.vercel.app

## Features

The Reddit Clone offers a range of community-driven features, as listed below

- **Events (CRUD)**
  - Comprehensive functionality for creating, reading, updating, and deleting events, giving users full control over event management
- **Related Events**
  - Smartly connects events that are related and displaying on the event details page, making it more engaging for users
- **Organized Events**
  - Efficient organization of events, ensuring a structured and user-friendly display for the audience, i.e., showing events created by the user on the user profile
- **Search & Filter**
  - Empowering users with a robust search and filter system, enabling them to easily find the events that match their preferences
- **Checkout and Pay with Stripe**
  - Smooth and secure payment transactions using Stripe, enhancing user experience during the checkout process
- **Event Orders**
  - Comprehensive order management system, providing a clear overview of all event-related transactions
- **Search Orders**
  - Quick and efficient search functionality for orders, facilitating easy tracking and management

## Tech Stack

- **Tailwind CSS**
- **Typescript**
- **Next.js**
- **MongoDB**
- **Stripe**
- **Shadcn**
- **Node.js**

## Installation

### Start the next server

Add these env variables to your .env file in the root directory

```
MONGODB_URI =

UPLOADTHING_SECRET =
UPLOADTHING_APP_ID =

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY =
STRIPE_SECRET_KEY =
STRIPE_WEBHOOK_SECRET =

NEXT_PUBLIC_SERVER_URL =
```

Install Dependencies

```bash
npm install
```

Run the server

```bash
npm run dev
```
