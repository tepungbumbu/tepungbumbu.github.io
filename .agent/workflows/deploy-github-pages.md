---
description: Deploy Astro site to GitHub Pages
---

# Deploy to GitHub Pages Workflow

This workflow guides you through deploying your Astro site to **https://tepungbumbu.github.io/** (root domain).

## Prerequisites

✅ **Repository Name**: Your repository is correctly named `tepungbumbu.github.io` (verified)  
✅ **Astro Config**: Your `astro.config.mjs` is configured for root deployment with `base: '/'`

## Steps

### 1. Verify GitHub Actions Workflow File

Ensure the GitHub Actions workflow file exists at `.github/workflows/deploy.yml`:

// turbo

```bash
cat .github/workflows/deploy.yml
```

If the file doesn't exist, create it:

```bash
mkdir -p .github/workflows
```

Then create `.github/workflows/deploy.yml` with this content:

```yaml
name: Deploy to GitHub Pages

on:
    push:
        branches: [main]
    workflow_dispatch:

permissions:
    contents: read
    pages: write
    id-token: write

jobs:
    build:
        runs-on: ubuntu-latest
        steps:
            - name: Checkout your repository using git
              uses: actions/checkout@v4

            - name: Install, build, and upload your site
              uses: withastro/action@v2

    deploy:
        needs: build
        runs-on: ubuntu-latest
        environment:
            name: github-pages
            url: ${{ steps.deployment.outputs.page_url }}
        steps:
            - name: Deploy to GitHub Pages
              id: deployment
              uses: actions/deploy-pages@v4
```

### 2. Commit and Push Changes

// turbo

```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
```

### 3. Enable GitHub Pages in Repository Settings

1. Go to: **https://github.com/tepungbumbu/tepungbumbu.github.io/settings/pages**
2. Under **Source**, select **GitHub Actions**
3. Click **Save**

### 4. Monitor Deployment

1. Go to: **https://github.com/tepungbumbu/tepungbumbu.github.io/actions**
2. Watch the deployment workflow run
3. Wait for completion (usually 2-5 minutes)

### 5. Verify Your Live Site

Once deployment completes, visit: **https://tepungbumbu.github.io/**

## Troubleshooting

### Build Fails

- Check the Actions logs for errors
- Verify all dependencies are in `package.json`
- Ensure no TypeScript/build errors locally

### 404 Errors

- Confirm `base: '/'` in `astro.config.mjs`
- Clear browser cache
- Wait a few minutes for DNS propagation

### Assets Not Loading

- Verify asset paths don't hardcode subdirectories
- Use `import.meta.env.BASE_URL` for dynamic paths

## Re-deploying

After making changes, simply:

// turbo-all

```bash
git add .
git commit -m "Update site content"
git push origin main
```

The deployment triggers automatically on every push to `main`.
