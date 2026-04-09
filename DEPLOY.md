# Deployment Guide

## First-time setup

### 1. Install dependencies
```bash
npm install
```

### 2. Create Cloudflare KV namespaces
```bash
# Production
wrangler kv namespace create TENANTS_KV

# Preview
wrangler kv namespace create TENANTS_KV --preview
```
Copy the returned IDs into `wrangler.jsonc` → `kv_namespaces[0].id` and `env.preview.kv_namespaces[0].id`.

### 3. Create R2 cache buckets
```bash
wrangler r2 bucket create whale-landings-cache
wrangler r2 bucket create whale-landings-cache-preview
```

### 4. Set secrets
```bash
wrangler secret put CRM_WEBHOOK_URL
# Enter your whalebizcrm webhook URL
```

---

## Adding a new tenant landing

### Step 1 — Create config JSON
Copy `tenants/example-dentist-he.json`, fill in your niche content.

### Step 2 — Upload to KV
```bash
wrangler kv key put --binding=TENANTS_KV "dentist-haifa.whaledigital.co.il" "$(cat tenants/your-tenant.json)"
```

### Step 3 — Add domain in Cloudflare
- Go to Cloudflare → Workers & Pages → whale-landings → Settings → Domains
- Add `dentist-haifa.whaledigital.co.il` (or a custom domain)

That's it. The landing is live. No code changes, no redeployment.

---

## Deploy

```bash
# Development
npm run dev

# Build & deploy to production
npm run deploy

# Build & deploy to preview
npm run deploy:preview
```

---

## A/B Testing

Set two keys in KV for the same domain using a Cloudflare Worker split:
- Add middleware logic in `src/middleware.ts` to read a cookie or set one randomly
- Use two different KV keys: `domain.com:variant_a` and `domain.com:variant_b`
- PostHog feature flags are also supported — see `AnalyticsInit.tsx`

---

## Updating a tenant config
```bash
wrangler kv key put --binding=TENANTS_KV "hostname.co.il" "$(cat tenants/updated.json)"
```
No redeployment needed — KV reads on every request.
