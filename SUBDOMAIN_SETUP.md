# Subdomain Setup Guide for yousef.xyz

This guide explains how to set up subdomains for each project using Vercel.

## Projects & Subdomains

Based on your portfolio, here are the subdomains to set up:

1. **Main Portfolio**: `yousef.xyz` (already main domain)
2. **fazzah**: `fazzah.yousef.xyz`
3. **panoblue**: `panoblue.yousef.xyz`
4. **zerothreat**: `zerothreat.yousef.xyz`
5. **retroos**: `retroos.yousef.xyz` (or `retroOS.yousef.xyz`)

## Step 1: DNS Configuration (Domain Provider)

First, you need to configure DNS records at your domain registrar (where you bought yousef.xyz):

### Add DNS Records

Add these DNS records to your domain provider:

```
Type: CNAME
Name: @ (or leave blank for root domain)
Value: cname.vercel-dns.com

Type: CNAME
Name: fazzah
Value: cname.vercel-dns.com

Type: CNAME
Name: panoblue
Value: cname.vercel-dns.com

Type: CNAME
Name: zerothreat
Value: cname.vercel-dns.com

Type: CNAME
Name: retroos
Value: cname.vercel-dns.com

Type: CNAME
Name: icpchue
Value: cname.vercel-dns.com
```

**OR** if using Vercel's nameservers (easier option):

Change your domain's nameservers to:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

Then you can manage all DNS through Vercel.

## Step 2: Add Domains in Vercel

For each project deployment in Vercel:

### For Main Portfolio (yousefdev repository)

1. Go to your Vercel project dashboard
2. Click on your `yousefdev` project
3. Go to **Settings** → **Domains**
4. Add `yousef.xyz` and `www.yousef.xyz`
5. Follow Vercel's instructions to verify ownership

### For Each Project Subdomain

For each separate project (fazzah, panoblue, zerothreat, retroos, icpchue):

1. Create a **separate Vercel project** for each (or use existing projects)
2. Go to **Settings** → **Domains** in each project
3. Add the subdomain:
   - `fazzah.yousef.xyz` for fazzah project
   - `panoblue.yousef.xyz` for panoblue project
   - `zerothreat.yousef.xyz` for zerothreat project
   - `retroos.yousef.xyz` for retroos project
   - `icpchue.yousef.xyz` for icpchue project

## Step 3: Deploy Each Project

### Option A: Separate Repositories (Recommended)

Each project should be in its own repository and deployed separately:

1. **fazzah** - Deploy from its repository to `fazzah.yousef.xyz`
2. **panoblue** - Deploy from its repository to `panoblue.yousef.xyz`
3. **zerothreat** - Deploy from its repository to `zerothreat.yousef.xyz`
4. **retroos** - Deploy from its repository to `retroos.yousef.xyz`
5. **icpchue** - Deploy from its repository to `icpchue.yousef.xyz`

### Option B: Monorepo with Multiple Deployments

If all projects are in one repository, use Vercel's monorepo configuration:

1. Set up different build commands for each project
2. Configure different root directories
3. Deploy each as a separate Vercel project

## Step 4: SSL Certificates

Vercel automatically provisions SSL certificates for all domains and subdomains. This usually happens automatically within a few minutes after adding a domain.

## Step 5: Verify Setup

After setting up:

1. Wait 5-10 minutes for DNS propagation
2. Check each subdomain:
   - `https://fazzah.yousef.xyz`
   - `https://panoblue.yousef.xyz`
   - `https://zerothreat.yousef.xyz`
   - `https://retroos.yousef.xyz`
   - `https://icpchue.yousef.xyz`

## Troubleshooting

### DNS Not Resolving

- Check DNS propagation: https://www.whatsmydns.net/
- Verify CNAME records are correct
- Wait up to 24-48 hours for full propagation

### SSL Certificate Issues

- Ensure DNS is properly configured first
- Wait a few minutes after adding domain
- Check Vercel dashboard for SSL status

### Subdomain Not Connecting

- Verify the subdomain is added in Vercel project settings
- Check that the project is deployed and running
- Verify DNS records point to Vercel

## Vercel CLI Alternative

You can also add domains via Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Add domain to project
vercel domains add fazzah.yousef.xyz --project-name your-project-name
```

## Project Repository Structure (Recommended)

```
yousef.xyz/
├── yousefdev/          # Main portfolio (yousef.xyz)
├── fazzah/             # Fazzah project (fazzah.yousef.xyz)
├── panoblue/           # Panoblue project (panoblue.yousef.xyz)
├── zerothreat/         # Zerothreat project (zerothreat.yousef.xyz)
├── retroos/            # RetroOS project (retroos.yousef.xyz)
└── icpchue/            # ICPCHUE project (icpchue.yousef.xyz)
```

Each should be a separate GitHub repository and Vercel project.

