# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Create production build
- `npm start` - Run production server
- `npm run lint` - Run ESLint linting (deprecated in Next.js 16, migrate to ESLint CLI)

### Database Commands (Prisma)
- `npm run db:push` - Push schema changes to database
- `npm run db:generate` - Generate Prisma client after schema changes
- `npm run db:studio` - Open Prisma Studio database GUI
- `npm run db:seed` - Run database seeding script

### Development Workflow
1. After making schema changes: `npm run db:generate && npm run db:push`
2. For fresh database with sample data: `npm run db:seed`
3. Always run linting before commits

## Project Architecture

### Tech Stack
- **Framework**: Next.js 15.5.3 with App Router
- **Language**: TypeScript (strict mode) with `@/*` path alias
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5 with multi-provider support
- **UI**: TailwindCSS v4 + Radix UI components + Lucide Icons
- **Forms**: React Hook Form + Zod validation
- **Email**: Resend API for transactional emails
- **Fonts**: Geist Sans & Geist Mono

### Key Directory Structure
```
src/
├── app/                    # App Router (pages, layouts, API routes)
│   ├── (authen)/          # Auth-required routes group
│   ├── actions/(auth)/    # Server Actions organized by feature
│   └── api/               # API routes
├── components/            # Reusable components (kebab-case naming)
│   ├── auth/             # Authentication forms & components
│   ├── ui/               # Base UI components (Radix UI)
│   └── providers/        # React context providers
├── lib/                  # Utilities, configurations, clients
│   └── validations/      # Zod schemas for data validation
└── types/                # TypeScript type definitions
```

## Authentication System Architecture

### Multi-Provider Authentication
- **OAuth Providers**: Google, GitHub (configured via environment variables)
- **Credentials**: Email/Password with bcrypt hashing
- **Two-Factor Authentication**: 6-digit codes via email (5-minute expiry)
- **Email Verification**: UUID tokens (24-hour expiry)
- **Password Reset**: UUID tokens (1-hour expiry)

### Role-Based Access Control
- **Roles**: USER (default), ADMIN, MODERATOR
- **Middleware Protection**: Automatic route protection based on patterns
- **Protected Routes**: `/dashboard`, `/profile`, `/admin`, `/user`, `/api/protected`
- **Admin-Only Routes**: `/admin`, `/api/admin`
- **Session**: JWT strategy with 30-minute sessions

### Authentication Flow Patterns
1. **Sign Up**: Credentials → Email verification required → Login enabled
2. **Sign In**: Credentials → 2FA check (if enabled) → JWT session
3. **OAuth**: Auto-verified, immediate access
4. **Password Reset**: Email → Token → New password → Auto-login
5. **2FA**: Login → Email with 6-digit code → Verification → Session

## Database Schema Highlights

### User Model
- Full authentication support (OAuth + Credentials)
- Role-based permissions (USER/ADMIN/MODERATOR)
- 2FA support with token relationships
- Email verification tracking

### Token System
- `VerificationToken` - Email verification (24h expiry)
- `PasswordResetToken` - Password reset (1h expiry)
- `TwoFactorToken` - 2FA codes (5min expiry)

### Social Features Ready
- Posts with publishing status
- Comments and likes system
- Follow/follower relationships
- Tag system with many-to-many relations

## Form Patterns & Validation

### Standard Form Pattern
```typescript
// 1. Zod schema in src/lib/validations/
export const loginSchema = z.object({
  email: z.string().email({ message: "กรุณาใส่อีเมลที่ถูกต้อง" }),
  password: z.string().min(1, { message: "กรุณาใส่รหัสผ่าน" }),
});

// 2. Server Action in src/app/actions/
export async function signInAction(values: LoginInput) {
  const validatedFields = loginSchema.safeParse(values);
  // ... implementation
}

// 3. Form component with React Hook Form
const form = useForm<LoginInput>({
  resolver: zodResolver(loginSchema),
});
```

### Error Handling Pattern
- Server Actions return `{ error: string }` or `{ success: string }`
- NextAuth errors are mapped to Thai messages
- Client-side toast notifications via Sonner
- Form-level error display with Alert components

## Important Development Notes

### Email Configuration
- Uses Resend API with `onboarding@resend.dev` sender
- Thai language email templates
- All email functions in `src/lib/mail.ts`

### Security Considerations
- bcrypt password hashing (12 rounds)
- CSRF protection via NextAuth
- Rate limiting on auth actions (built-in NextAuth)
- Token cleanup on expiry

### Environment Variables Required
```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# OAuth Providers
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Email
RESEND_API_KEY=""
```

### Testing Data (npm run db:seed)
- Admin: `admin@example.com` / `password123`
- User: `test@example.com` / `password123`
- Sample posts and tags included

### Common Pitfalls
- Always run `npm run db:generate` after schema changes
- NextAuth v5 error handling requires checking `cause.err.message`
- 2FA tokens are single-use and auto-deleted
- Thai language used throughout UI and validations
- Geist fonts loaded via next/font/google

### Code Style
- Components: Functional with hooks, kebab-case files
- Server Actions: "use server" directive, organized by feature
- Styling: Tailwind utility classes, minimal custom CSS
- Icons: Lucide React with consistent sizing (h-4 w-4)
- Forms: Always use Zod + React Hook Form + Server Actions pattern

### Code Reusability & DRY Principles
- **ALWAYS analyze existing code first**: Before creating new components, hooks, utilities, or data fetchers:
  1. Search existing codebase for similar functionality using Grep/Glob tools
  2. Check `src/components/`, `src/lib/`, `src/hooks/`, `src/types/` directories
  3. Review existing patterns and conventions in the codebase
  4. Reuse and extend existing components/utilities instead of creating duplicates
- **Component reuse**: Look for existing UI components in `src/components/ui/` and `src/components/`
- **Hook reuse**: Check `src/hooks/` or component files for existing custom hooks
- **Utility reuse**: Examine `src/lib/` for existing helper functions, validators, and utilities
- **Type reuse**: Review `src/types/` for existing TypeScript definitions
- **Data fetching**: Check existing Server Actions and API routes before creating new ones
- **Ask before creating**: If similar functionality might exist, ask user for confirmation before creating new files

### Semantic HTML & Accessibility Standards
- **ALWAYS use semantic HTML elements**: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- **Required ARIA attributes**: Add `role`, `aria-label`, `aria-labelledby`, `aria-expanded`, `aria-controls` where appropriate
- **Heading hierarchy**: Use proper h1-h6 structure, add `sr-only` class for hidden headings when needed
- **Navigation**: Mark all nav areas with `role="navigation"` and descriptive `aria-label`
- **Interactive elements**: Always include `aria-label` for buttons, links that open in new windows
- **Icons**: Add `aria-hidden="true"` to decorative icons, descriptive labels for functional icons
- **Forms**: Connect labels with form controls, use fieldsets for grouped inputs
- **Images**: Always include meaningful `alt` attributes or `aria-hidden="true"` for decorative images

### SEO Standards
- **Page metadata**: Always include proper `<title>`, `<meta description>`, and Open Graph tags
- **Structured data**: Add JSON-LD schema markup for content types (Article, Organization, Website)
- **URL structure**: Use descriptive, keyword-rich slugs with proper hierarchy
- **Internal linking**: Include relevant internal links with descriptive anchor text
- **Image SEO**: Optimize `alt` attributes for search engines, use descriptive filenames
- **Performance**: Implement lazy loading, optimize Core Web Vitals (LCP, FID, CLS)
- **Mobile-first**: Ensure responsive design and mobile usability
- **Canonical URLs**: Add canonical tags to prevent duplicate content issues
- **Robots meta**: Use appropriate `robots` meta tags for indexing control
- **Sitemap**: Generate and maintain XML sitemap for better crawling