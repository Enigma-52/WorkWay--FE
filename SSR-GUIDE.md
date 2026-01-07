# SSR (Server-Side Rendering) Setup

This project is configured with **Vite SSR** to provide server-side rendering capabilities for all pages.

## Architecture

The SSR setup uses:
- **Entry Client** (`src/entry-client.tsx`) - Hydrates the app on the client side
- **Entry Server** (`src/entry-server.tsx`) - Renders the app on the server side
- **Express Server** (`server.js`) - Serves the SSR application
- **SSR Utilities** (`src/lib/ssr-utils.ts`) - Helper functions for SSR-safe code

## Key Features

### 1. Automatic SSR for All Pages
All routes defined in `src/routes.tsx` are automatically server-side rendered. Any new pages you add will also be SSR by default.

### 2. SSR-Safe Component Development
Use the utilities provided in `src/lib/ssr-utils.ts` to write SSR-safe code:

```typescript
import { isClient, isServer, onClient } from '@/lib/ssr-utils';

// Check if running on client
if (isClient) {
  // Client-only code
}

// Execute function only on client
onClient(() => {
  window.localStorage.setItem('key', 'value');
});
```

### 3. useEffect for Browser APIs
All browser APIs (window, document, etc.) should be accessed inside `useEffect`:

```typescript
useEffect(() => {
  // Safe to use window/document here
  if (typeof window !== 'undefined') {
    const handler = () => console.log(window.scrollY);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }
}, []);
```

## Development

```bash
# Start SSR development server
npm run dev

# Start client-only development (faster, no SSR)
npm run dev:client
```

## Building for Production

```bash
# Build both client and server bundles
npm run build

# Preview production build with SSR
npm run preview
```

## Creating New Pages

1. Create your page component in `src/pages/`
2. Add the route to `src/routes.tsx`
3. The page will automatically be SSR-enabled

Example:
```typescript
// src/pages/NewPage.tsx
const NewPage = () => {
  return <div>New SSR Page</div>;
};

export default NewPage;

// src/routes.tsx
import NewPage from "./pages/NewPage";

export const routes: RouteObject[] = [
  // ... existing routes
  {
    path: "/new",
    element: <NewPage />,
  },
];
```

## Best Practices

1. **Always guard browser APIs**: Use `typeof window !== 'undefined'` before accessing window/document
2. **Use useEffect for side effects**: Browser APIs should be called in useEffect, not during render
3. **Initial state for hooks**: Set undefined/null as initial state for values that depend on browser APIs
4. **Test in SSR mode**: Always test with `npm run dev` (SSR mode) before deploying

## Troubleshooting

### "window is not defined" error
This means browser APIs are being accessed during server rendering. Wrap the code in:
```typescript
if (typeof window !== 'undefined') {
  // your code
}
```

### Component not rendering
Check if the component uses any browser-only libraries. These may need to be lazy-loaded:
```typescript
const BrowserComponent = lazy(() => import('./BrowserComponent'));
```
