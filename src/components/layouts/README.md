# Layout System

## Overview

This layout system provides consistent spacing and header handling across all pages with the fixed Header1 component.

## Components

### MainLayout

Basic layout with header and main content area.

```tsx
import MainLayout from "@/components/layouts/MainLayout";

export default function Page() {
  return (
    <MainLayout>
      <div>Your content here</div>
    </MainLayout>
  );
}
```

### MainLayoutPadded

Layout with default padding and container styling.

```tsx
import { MainLayoutPadded } from "@/components/layouts/MainLayout";

export default function Page() {
  return (
    <MainLayoutPadded>
      <div>Your content here</div>
    </MainLayoutPadded>
  );
}
```

## CSS Classes

### .main-content

Basic spacing for main content area with responsive header offset.

- Mobile: `pt-24` (96px)
- SM: `pt-28` (112px)
- LG: `pt-32` (128px)

### .main-content-padded

Includes main-content spacing plus default padding:

- Responsive header offset
- Horizontal padding: `px-4`
- Bottom padding: `pb-12`

### .header-offset

Utility class for consistent spacing when not using layout components.

## Responsive Breakpoints

| Screen Size  | Header Height | Top Padding |
| ------------ | ------------- | ----------- |
| Mobile       | ~96px         | pt-24       |
| SM (640px+)  | ~112px        | pt-28       |
| LG (1024px+) | ~128px        | pt-32       |

## Usage Examples

### Standard Page

```tsx
import { MainLayoutPadded } from "@/components/layouts/MainLayout";

export default function AboutPage() {
  return (
    <MainLayoutPadded>
      <h1>About Us</h1>
      <p>Content here...</p>
    </MainLayoutPadded>
  );
}
```

### Custom Layout

```tsx
import MainLayout from "@/components/layouts/MainLayout";

export default function CustomPage() {
  return (
    <MainLayout className="bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1>Custom Content</h1>
      </div>
    </MainLayout>
  );
}
```

### Without Layout Component

```tsx
import Header1 from "@/components/headers/Header1";

export default function SpecialPage() {
  return (
    <div>
      <Header />
      <main className="main-content px-4">
        <div className="container mx-auto">
          Content here
        </div>
      </main>
    </div>
  );
}
```
