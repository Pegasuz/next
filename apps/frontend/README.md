# Frontend - Next.js 14

This is the frontend application built with Next.js 14, using the App Router, TypeScript, and Tailwind CSS.

## Architecture Overview

### Directory Structure
```
src/
├── app/                  # Next.js App Router pages
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── ui/               # Reusable UI components
│   └── features/         # Feature-specific components
├── lib/                  # Utility libraries
│   ├── api/              # API client and services
│   ├── hooks/            # Custom React hooks
│   └── utils/            # Utility functions
└── types/                # TypeScript type definitions
```

## Getting Started

### Install dependencies
```bash
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build
```bash
npm run build
```

### Production
```bash
npm run start
```

### Lint
```bash
npm run lint
```

## Key Features

- **App Router**: Using Next.js 14 App Router for improved routing
- **TypeScript**: Strict typing throughout the application
- **Tailwind CSS**: Utility-first CSS framework
- **Shared Types**: Imports types from `@monorepo/shared-types`
- **API Client**: Centralized API client for backend communication
- **Component Organization**: Separated by UI and feature components

## Environment Variables

Create a `.env.local` file in the root:

```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Best Practices

1. Use Server Components by default, Client Components only when needed
2. Keep components small and focused
3. Extract reusable logic into custom hooks
4. Use the shared types package for DTOs
5. Follow the established naming conventions
