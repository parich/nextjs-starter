# Repository Guidelines

## Project Structure & Module Organization
- App routes and pages: `src/app/*` (Next.js App Router)
- UI and features: `src/components/*` (component files use kebab-case, `.tsx`)
- Utilities & validation: `src/lib/*`, `src/lib/validations/*`
- Types: `src/types/*`
- Prisma schema & migrations: `prisma/schema.prisma`
- Static assets: `public/*`
- Config: `next.config.ts`, `eslint.config.mjs`, `tsconfig.json`
- Scripts: `scripts/seed-database.js`

## Build, Test, and Development Commands
- `npm run dev` — Start local dev server at `http://localhost:3000`
- `npm run build` — Production build
- `npm start` — Run production server
- `npm run lint` — ESLint (Next core-web-vitals + TypeScript)
- Database (Prisma): `npm run db:push`, `npm run db:generate`, `npm run db:studio`, `npm run db:seed`

## Coding Style & Naming Conventions
- Language: TypeScript (strict). Path alias `@/*` → `src/*`
- Indentation: 2 spaces; max line length ~100 where practical
- File naming: kebab-case for files (e.g., `create-post-form.tsx`); named exports preferred
- React: functional components, hooks-first patterns, server actions where appropriate
- Styling: Tailwind CSS v4. Co-locate component styles with components; prefer utility classes over custom CSS
- Linting: fix issues reported by `npm run lint` before committing

## Testing Guidelines
- No test runner is configured yet. If adding tests, prefer Vitest + React Testing Library
- Naming: `*.test.ts`/`*.test.tsx` alongside source or under a local `__tests__` folder
- Keep tests deterministic; mock network/DB. Target ≥70% line coverage for new code

## Commit & Pull Request Guidelines
- Git history is informal; adopt Conventional Commits going forward: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`
- PRs should include: concise description, linked issue (if any), setup/validation steps, and screenshots for UI changes

## Security & Configuration Tips
- Do NOT commit real secrets. Use `.env.local` for development; keep example keys in `.env.example`
- Required envs: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `NEXT_PUBLIC_APP_URL`, OAuth provider keys, `RESEND_API_KEY`
- After schema changes: `npm run db:generate && npm run db:push`; use `db:seed` for local demo data
- Avoid logging PII/secrets; rotate credentials if exposed
