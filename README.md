# next-strapi-static

Static-Site-Generation (SSG) using Next.js with Strapi as CMS.

## Getting Started

### Install all dependencies

```bash
pnpm install:all
```

Make sure that your .env files are created in both `/backend` and `/frontend` folders

### Start Strapi instance

```bash
pnpm strapi:build
pnpm strapi:dev
```

### Start Next.js development server

```bash
pnpm next:dev
```

### Build Next.js site

```bash
pnpm next:build
```
