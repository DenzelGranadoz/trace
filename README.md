# Trace

This is a To-Do Ticketing Tracking App to learn about NextJS, deployed on Vercel

## Demo

> - [Check me out!](trace-navy.vercel.app)

## Screenshots

<img width="1440" alt="Screenshot 2024-04-06 at 4 21 47 PM" src="https://github.com/DenzelGranadoz/trace/assets/84443588/a7348d10-25f5-419f-8e4c-498d05785aa3">
<img width="1440" alt="Screenshot 2024-04-06 at 10 04 31 PM" src="https://github.com/DenzelGranadoz/trace/assets/84443588/a19e3d35-9868-4dde-96ba-754fa2506eca">
<img width="362" alt="Screenshot 2024-04-06 at 10 07 27 PM" src="https://github.com/DenzelGranadoz/trace/assets/84443588/e0cb5690-794c-4140-8634-001608980bf4">

## Built with

- NextJS
- TypeScript
- MongoDB
- TailwindCSS
- NextAuth
- React Query
- RESTful APIs

## Getting Started

To get this project up and running locally, follow the steps below:

First, run the development server:

To get this project up and running locally, follow the steps below:

1. Clone repository:
   `git clone https://github.com/DenzelGranadoz/trace`

2. Change directory into the cloned repository:
   `cd trace`

3. Once you have cloned this project, you can install the required dependencies by using:
   `npm install`

4. Create a .env file similar to the .env.example

5. Distribution files can be produced using:
   `npm run dev`

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Features and Usage

- Responsive (Phone, Tablet, and Desktop friendly)
- There are 5 Main Pages
  -\* About Page
- Just a simple reminder of the importance of listing to-dos
- Serves as the homepage when user is not logged in
  -\* Dashboard Page
- Contains all tickets(to-do) fetched from the database
- Has a search bar to filter specific tickets
- Each ticket has a description, priority level, name, date created and estimated date of completion, status(progress).
  -\* Ticket Page
- Forms to take in data about ticket to be saved in the database
- Edit a ticket
- Delete a ticket
- Archive a ticket
  -\* Archived Page
- User has the option to archive a ticket once status has been set to completed
  -\* Auth Pages
- Login Page
- Logout Page
- Register Page
- Forget-Password Page
- Reset-Password Page

## Improvements

Features that can be added or improved on.

- Better UI Design
- Filtering tickets by property
- More information in the about page

## Getting Started

First, run the development server:

To get this project up and running locally, follow the steps below:

1. Clone repository:
   `git clone https://github.com/DenzelGranadoz/shopping-cart.git`

2. Change directory into the cloned repository:
   `cd shopping-cart`

3. Once you have cloned this project, you can install the required dependencies by using:
   `npm install`

4. Distribution files can be produced using:
   `npm run start`

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
