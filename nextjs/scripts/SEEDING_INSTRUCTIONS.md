# Sanity Data Seeding Instructions

## Prerequisites

1. Get a Sanity Write Token:
   - Go to https://www.sanity.io/manage
   - Select your project
   - Go to API → Tokens
   - Create a new token with "Editor" permissions
   - Copy the token

2. Add the token to your `.env.local`:
   ```
   SANITY_API_WRITE_TOKEN=your_token_here
   ```

## Running the Seed Script

```bash
cd /app/nextjs
node scripts/seed-sanity.js
```

## Manual Steps After Seeding

1. **Start Sanity Studio**:
   ```bash
   cd /app/nextjs
   npx sanity dev
   ```

2. **Upload Images**:
   - Open Sanity Studio (usually http://localhost:3333)
   - Navigate to:
     - Hero Section: Upload WSSC logo
     - Tech Stack: Upload logos for each technology
     - Encore Contact: Upload Encore logo

3. **Verify Content**:
   - Check that all documents were created
   - Review and edit content as needed
   - Publish any draft documents

## Image URLs to Use

**WSSC Logo**:
`https://customer-assets.emergentagent.com/job_wssc-digital-demo/artifacts/li5pnsrz_Wlogo-REVERSED-01.png`

**WSSC Favicon (for phone simulation)**:
`https://customer-assets.emergentagent.com/job_aqua-demo/artifacts/e3qln0ip_Wfavicon.png`

**Video Background**:
`https://customer-assets.emergentagent.com/job_aqua-demo/artifacts/ylicgxa5_water.mp4`

## Troubleshooting

- **Token errors**: Verify your SANITY_API_WRITE_TOKEN is correct
- **Project ID errors**: Check NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local
- **Duplicate content**: Delete existing documents in Sanity Studio before re-running
