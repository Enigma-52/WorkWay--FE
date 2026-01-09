# EQHQ - AI Equity Research Platform

EQHQ is an India-first AI-powered equity research platform that transforms filings, concalls, and news into audit-able, decision-ready briefs — so you spend time deciding, not collecting.

## What EQHQ Does

- **Stock Research** - Comprehensive stock pages with AI-generated insights, financial metrics, and peer comparisons
- **Concall Analysis** - Earnings call transcripts with AI-powered summaries and key highlights
- **News Aggregation** - Real-time market news with relevance filtering and stock tagging
- **Watchlists** - Create lists to track stocks and get personalized news feeds
- **AI Chat** - Ask questions about stocks, earnings, and market trends
- **Quarterly Results** - Browse and filter quarterly earnings across the market
- **Sector Analysis** - Explore sectors and industries with comparative data

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 + React Router 7 |
| State Management | Zustand |
| Data Fetching | TanStack React Query |
| Styling | TailwindCSS 4, class-variance-authority |
| UI Components | Radix UI + shadcn/ui |
| Charts | Lightweight Charts, D3, Recharts |
| Build Tool | Vite |
| Language | TypeScript |

## Project Structure

```
app/
├── api/
│   ├── api.ts              # Unified API layer
│   └── services/           # Domain-specific API services
├── components/
│   ├── common/             # Shared components
│   ├── ui/                 # shadcn/ui primitives
│   ├── Instruments/        # Stock page components
│   ├── Watchlist/          # Watchlist components
│   └── chat/               # AI chat components
├── layouts/                # Page layouts
├── lib/
│   ├── constants.ts        # App constants
│   ├── stores/             # Zustand stores
│   └── hooks/              # Custom hooks
├── routes/                 # Page routes
├── types/                  # TypeScript definitions
└── utils/                  # Helper functions
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
git clone https://github.com/front-page/web-invest-ai.git
cd web-app
npm install

# Enable git hooks
git config core.hooksPath .githooks
```

### Environment Variables

Create a `.env` file:

```env
VITE_ENV=dev
PROXY_SERVER_URL=<backend-api-url>
AMPLITUDE_TRACKING_ID=<amplitude-id>
AMPLITUDE_SAMPLING_RATE=1
TURNSTILE_SITE_KEY=<cloudflare-turnstile-key>

# Google OAuth (required for authentication)
GOOGLE_CLIENT_ID=<google-client-id>
GOOGLE_CLIENT_SECRET=<google-client-secret>
GOOGLE_REDIRECT_URI=http://localhost:5173/auth/google/callback
```

#### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select a project
3. Navigate to **APIs & Services > Credentials**
4. Create an **OAuth 2.0 Client ID** (Web application type)
5. Add authorized redirect URIs:
   - Local: `http://localhost:5173/auth/google/callback`
   - Production: `https://eqhq.ai/auth/google/callback`
6. Copy Client ID and Secret to your `.env` file

### Development

```bash
npm run dev
```

App runs at `http://localhost:5173`

### Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run typecheck` | Type checking |
| `npm start` | Start production server |

## Routes Overview

| Route | Description |
|-------|-------------|
| `/` | Home - Search, news highlights, market indices |
| `/stock/:name` | Stock overview with charts and AI insights |
| `/stock/:name/financials/:tab` | Income statement, balance sheet, cash flow |
| `/stock/:name/concall/:quarter/:tab` | Concall transcripts and AI summaries |
| `/stock/:name/peers` | Peer comparison |
| `/stock/:name/ratios` | Financial ratios |
| `/stock/:name/shareholdings` | Shareholding patterns |
| `/watchlist/:name` | Watchlist with news feed |
| `/chat/:threadId` | AI chat threads |
| `/quarterly-results` | Quarterly earnings browser |
| `/sector-overview` | Sector performance |
| `/indices/:slug` | Index details |
| `/news` | Global news feed |
| `/macro` | Macro news scanner |
| `/auth/signin` | Initiates Google OAuth login |
| `/auth/google/callback` | Google OAuth callback handler |

## Deployment

### Kubernetes (Production)

The app is deployed on Azure Kubernetes Service (AKS).

**Deployment:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: prod-web-app-eqhq
  namespace: eqhq-prod
spec:
  replicas: 1
  selector:
    matchLabels:
      app: prod-web-app-eqhq
  template:
    metadata:
      labels:
        app: prod-web-app-eqhq
    spec:
      containers:
        - name: eqhq-web-app
          image: eqhqai.azurecr.io/prod-web-app:latest
          ports:
            - containerPort: 5173
          envFrom:
            - configMapRef:
                name: eqhq-web-config
```

**ConfigMap:**
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: eqhq-web-config
  namespace: eqhq-prod
data:
  VITE_ENV: "production"
  PORT: "5173"
  GOOGLE_CLIENT_ID: "<google-client-id>"
  GOOGLE_CLIENT_SECRET: "<google-client-secret>"
  GOOGLE_REDIRECT_URI: "https://eqhq.ai/auth/google/callback"
  PROXY_SERVER_URL: "http://eqhq-backend-service"
  AMPLITUDE_TRACKING_ID: "<amplitude-id>"
```

### Docker

```bash
docker build -t eqhq-web .
docker run -p 5173:5173 eqhq-web
```

### Manual

```bash
npm run build
npm start
```

## Branch Strategy

- Main branch: `dev`
- Feature branches: `feature/*`, `fix/*`

## License

Proprietary - All rights reserved.
