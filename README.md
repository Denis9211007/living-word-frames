# Living Word Frames

Living Word Frames is a premium Next.js storefront for custom biblical verse frames. It combines an immersive UI, interactive frame designer, and Prisma-backed product API for managing a PostgreSQL product catalog.

## Features

- Modern responsive landing page with glassmorphism styling
- Interactive custom frame designer and cart drawer
- Server-side product API route using Next.js App Router
- Prisma data model with PostgreSQL datasource
- TypeScript-first implementation with Tailwind CSS styles

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Prisma 7
- PostgreSQL
- Tailwind CSS / PostCSS

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- PostgreSQL database

### Install

```bash
git clone https://github.com/Denis9211007/living-word-frames.git
cd living-word-frames
npm install
```

### Environment

Create a `.env` file in the project root with your PostgreSQL connection string:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

### Prisma setup

When setting up locally, run:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

The schema is defined in `prisma/schema.prisma`.

### Run locally

```bash
npm run dev
```

Open http://localhost:3000 to view the app.

### Build for production

```bash
npm run build
npm run preview
```

## Project Structure

- `src/app/` — Next.js App Router pages and layouts
- `src/app/api/products/route.ts` — product API route
- `src/lib/prisma.ts` — Prisma client wrapper
- `prisma/schema.prisma` — Prisma data model
- `src/generated/prisma/` — generated Prisma client output

## Prisma Schema

The app uses a simple `Product` model:

- `id` — primary key
- `title` — product name
- `slug` — unique URL key
- `description` — product description
- `price` — product price
- `imageUrl` — image URL
- `createdAt` — creation timestamp

## Available Scripts

- `npm run dev` — start development server
- `npm run build` — create production build
- `npm run preview` — preview production build locally
- `npm run lint` — run TypeScript type checking

## Notes

- `.next/` is ignored by git and not included in the repository
- Keep `DATABASE_URL` private and avoid committing `.env` to version control

## License

This project does not include a license file by default. Add one if you want to publish or share the repository.
