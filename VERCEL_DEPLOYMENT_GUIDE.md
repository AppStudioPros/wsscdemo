# Vercel Deployment Configuration Guide

## Problem
The repository has multiple projects:
- `/frontend` - Legacy React app (used locally as a proxy)
- `/nextjs` - The actual Next.js application that should be deployed
- `/backend` - FastAPI backend

Vercel needs to be configured to deploy the `/nextjs` subdirectory.

## Solution

### Option 1: Configure Root Directory in Vercel Dashboard (RECOMMENDED)

1. Go to your Vercel project settings
2. Navigate to **Settings** → **General** → **Root Directory**
3. Set the Root Directory to: `nextjs`
4. Click **Save**
5. Redeploy

This tells Vercel to treat the `nextjs` folder as the project root.

### Option 2: Use Repository Root with vercel.json

If you want to keep the root at `/app`, use the `/app/vercel.json` configuration:

```json
{
  "buildCommand": "cd nextjs && yarn build",
  "outputDirectory": "nextjs/.next",
  "installCommand": "cd nextjs && yarn install",
  "framework": "nextjs"
}
```

**Note:** This approach is less clean because Vercel will still try to auto-detect the framework from the root.

## Current File Structure

```
/app/
├── vercel.json              # Root config (Option 2)
├── frontend/
│   ├── vercel.json          # Old config (ignore this)
│   └── package.json         # Has proxy scripts for local dev
├── nextjs/                  # The actual Next.js app
│   ├── vercel.json          # Direct deployment config
│   ├── package.json         # Contains Next.js dependency
│   ├── app/
│   ├── components/
│   └── public/
└── backend/                 # FastAPI (not deployed to Vercel)
```

## Recommended Deployment Strategy

**Use Option 1** - Set Root Directory to `nextjs` in Vercel dashboard. This is the cleanest approach and what Vercel recommends for monorepo structures.

### Steps:
1. In Vercel Dashboard: **Settings → General → Root Directory → `nextjs`**
2. The `/app/nextjs/vercel.json` will be automatically detected
3. Framework will be auto-detected as Next.js
4. Build and deploy will work correctly

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
