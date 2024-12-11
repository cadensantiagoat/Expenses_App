# Expense Tracker
Expense Tracker provides users with a simple and intuitive interface to track and manage their personal expenses. Users can add expenses with details such as amount, category, and due date, and view a list of their expenses. The app addresses the common problem of financial disorganization by offering a user-friendly solution for staying on top of daily expenses.

- **Frontend**: Next.js (React framework)
- **Database**: Supabase database (Postgres)
  - **ORM**: Prisma
- **Authentication**: Clerk.js


## Getting Started

_This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)._

Install the required dependencies:

```
npm install
```


Synchronize the Prisma schema with the database schema:

```
npx prisma db push
```



then, run the development server:

```bash
npm run dev

# or

yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The entry point to our app: `app/page.tsx`.


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

Deployment method has yet to be determined.
