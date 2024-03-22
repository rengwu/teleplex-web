# next-strapi-static

Static-Site-Generation (SSG) using Next.js with Strapi as CMS.

## Getting Started

Make sure that your .env files are created in both `/backend` and `/frontend` folders based on their respective `.env.example` files.

### Start Strapi instance

```bash
cd backend
npm run build
npm run develop
```

### Start Next.js development server

```bash
cd frontend
npm run dev
```

### Build static Next.js site

```bash
cd frontend
npm run build
```
