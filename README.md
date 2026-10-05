# Project Explorer

Next.js Product Explorer with Google OAuth authentication.

## Run locally

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and fill in your Google OAuth credentials:

```env
AUTH_GOOGLE_ID=...
AUTH_GOOGLE_SECRET=...
AUTH_SECRET=...
```

In Google Cloud Console, add this redirect URI for local development:

```text
http://localhost:3000/api/auth/callback/google
```

The root page (`/`) redirects unauthenticated users to `/login`. After Google login, users return to Project Explorer. The logout button ends the session and returns to the login page.
