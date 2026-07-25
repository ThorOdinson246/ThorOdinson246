# Deployment

The portfolio is a Next.js app that builds to a static export and is served on
GitHub Pages at `mukeshpoudel.com.np`.

## How it ships

`.github/workflows/deploy.yml` builds `vscode-portfolio/` and publishes
`vscode-portfolio/out` to Pages on any push to `main` that touches the app. The
`mukeshpoudel.com.np` CNAME is carried into the export via `public/CNAME`.

## One-time setup

In the repository settings, set **Pages → Build and deployment → Source** to
**GitHub Actions**. After that, every push to `main` redeploys automatically.

## Local

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to ./out
```
