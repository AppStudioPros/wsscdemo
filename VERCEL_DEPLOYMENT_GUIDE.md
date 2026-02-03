# Vercel Deployment Configuration Guide

## Problem
The repository has multiple projects:
- `/frontend` - Legacy React app (used locally as a proxy)
- `/nextjs` - The actual Next.js application that should be deployed
- `/backend` - FastAPI backend

Vercel needs to be configured to deploy the `/nextjs` subdirectory.

## ✅ SOLUTION (CONFIGURED)

### Root Directory is Set to `nextjs`

The Vercel project is now configured with:
- **Root Directory**: `nextjs`
- **Framework Detection**: Automatic (Next.js 16.1.6)
- **Build Command**: `next build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)

No `vercel.json` is needed because Vercel auto-detects everything from the `package.json` in the `nextjs` directory.

## Current File Structure

```
/app/
├── frontend/
│   └── package.json         # Has proxy scripts for local dev only
├── nextjs/                  # ✅ The actual Next.js app (Vercel root)
│   ├── package.json         # Contains Next.js 16.1.6 dependency
│   ├── app/
│   ├── components/
│   ├── public/
│   └── (no vercel.json needed - auto-detection works)
└── backend/                 # FastAPI (not deployed to Vercel)
```

## Deployment Steps

1. ✅ **Root Directory is set to `nextjs`** in Vercel Dashboard
2. ✅ Framework auto-detects as Next.js
3. ✅ Build command is `next build`
4. Push to GitHub → Vercel deploys automatically

## Local Development

The local setup uses a workaround in `/app/frontend/package.json`:
```json
"scripts": {
  "start": "cd ../nextjs && yarn dev --port 3000"
}
```

This is managed by supervisor and doesn't affect Vercel deployment.

## Verification

After deploying, check:
- ✅ Build logs show Next.js is detected
- ✅ Dependencies install from `nextjs/package.json`
- ✅ Build runs from `nextjs` directory
- ✅ Output directory is `nextjs/.next`

## Backend API Routes

The backend API runs separately on FastAPI. For production, you'll need to:
1. Deploy the backend separately (e.g., Railway, Render, or another Vercel project)
2. Update environment variables in Next.js to point to the production backend URL
