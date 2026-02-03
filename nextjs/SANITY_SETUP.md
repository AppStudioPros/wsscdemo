# Sanity Studio Initialization Guide

## Step 1: Initialize Sanity Project

You need to create a Sanity project first. Run:

```bash
cd /app/nextjs
npx sanity init --project-name "WSSC Water Demo" --dataset production
```

Follow the prompts:
1. **Login**: Use your Sanity account (or create one)
2. **Create new project**: Yes
3. **Project name**: WSSC Water Demo
4. **Dataset name**: production
5. **Output path**: Use current directory

## Step 2: Get Your Project Credentials

After initialization, you'll receive:
- **Project ID**: Copy this
- **Dataset**: production (already set)

Update your `/app/nextjs/.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_BACKEND_URL=http://localhost:8001
```

## Step 3: Get API Tokens

1. Go to https://www.sanity.io/manage
2. Select your project
3. Navigate to **API** → **Tokens**
4. Create two tokens:
   - **Read Token** (Viewer permissions) - for Next.js app
   - **Write Token** (Editor permissions) - for seeding script

5. Add to `.env.local`:

```env
SANITY_API_READ_TOKEN=sk_your_read_token_here
SANITY_API_WRITE_TOKEN=sk_your_write_token_here
SANITY_REVALIDATE_SECRET=any_random_string_here
```

## Step 4: Deploy Sanity Studio

The Sanity Studio is already configured. Deploy it:

```bash
cd /app/nextjs
npx sanity deploy
```

Choose a studio hostname (e.g., `wssc-demo`)

Your studio will be available at: `https://your-hostname.sanity.studio`

## Step 5: Seed Content

Run the seeding script to populate initial content:

```bash
cd /app/nextjs
node scripts/seed-sanity.js
```

## Step 6: Upload Images

1. Open your Sanity Studio: `https://your-hostname.sanity.studio`
2. Navigate to each content type and upload images:
   - **Hero Section**: Upload WSSC logo from `https://customer-assets.emergentagent.com/job_wssc-digital-demo/artifacts/li5pnsrz_Wlogo-REVERSED-01.png`
   - **Tech Stack**: Upload logos for each technology
   - **Encore Contact**: Upload company logo

## Step 7: Build Next.js App

```bash
cd /app/nextjs
yarn build
yarn start
```

Open http://localhost:3000 to see your app!

## Alternative: Local Sanity Studio Development

If you prefer running Sanity Studio locally:

```bash
cd /app/nextjs
npx sanity dev
```

This starts the studio at `http://localhost:3333`

## Troubleshooting

### "Dataset not found" error
- Make sure you've run `sanity init` and created the project
- Verify your `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
- Check that the dataset name matches (should be "production")

### "Invalid credentials" error  
- Verify your API tokens are correct
- Make sure the read token has at least "Viewer" permissions

### Build fails with "No content found"
- Run the seeding script: `node scripts/seed-sanity.js`
- Or manually create content in Sanity Studio

## Quick Start (TL;DR)

```bash
# 1. Initialize Sanity
cd /app/nextjs
npx sanity init

# 2. Update .env.local with project ID and tokens

# 3. Deploy Studio
npx sanity deploy

# 4. Seed content
node scripts/seed-sanity.js

# 5. Build and run
yarn build
yarn start
```
