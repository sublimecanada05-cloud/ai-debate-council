# Deployment Guide

## Deploy to Render (Free)

### Step 1: Prepare Your Code

✅ Already done! Your code is ready.

### Step 2: Push to GitHub

```bash
cd ai-debate-council
git add .
git commit -m "Ready for deployment"
git push origin initial-ai-debate-app
```

### Step 3: Create Render Account

1. Go to https://render.com
2. Click "Sign up" and use GitHub
3. Authorize Render to access your GitHub repos

### Step 4: Deploy Backend

1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Select your `ai-debate-council` repo
4. Fill in these settings:

```
Name: ai-debate-council-backend
Environment: Node
Build Command: cd backend && npm install
Start Command: cd backend && npm start
Plan: Free (or Starter if free unavailable)
```

5. Click "Create Web Service"
6. Wait 2-3 minutes for deployment
7. Get your URL: `https://ai-debate-council-backend.onrender.com`

### Step 5: Deploy Frontend

1. Go to https://vercel.com
2. Click "New Project" → "Import Git Repository"
3. Select your `ai-debate-council` repo
4. Fill in these settings:

```
Framework: React
Root Directory: ./frontend
Build Command: npm run build
Environment Variables:
  REACT_APP_API_URL=https://ai-debate-council-backend.onrender.com
  REACT_APP_WS_URL=wss://ai-debate-council-backend.onrender.com
```

5. Click "Deploy"
6. Get your URL: `https://ai-debate-council.vercel.app`

### Step 6: Troubleshooting

#### Backend not starting?

```bash
# Check logs in Render dashboard
# Common issues:
- Missing dependencies (npm install fails)
- Port not exposed (should be 5000)
- Missing environment variables
```

#### Fix: Update backend start script

Edit `backend/package.json`:

```json
"scripts": {
  "dev": "tsx watch src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js",
  "start:dev": "tsx src/server.ts"
}
```

In Render, set:
```
Start Command: npm run start:dev
```

#### Frontend not connecting to backend?

In `frontend/src/App.tsx`, update:

```typescript
const apiUrl = process.env.REACT_APP_API_URL || 'https://ai-debate-council-backend.onrender.com';
const wsUrl = process.env.REACT_APP_WS_URL || 'wss://ai-debate-council-backend.onrender.com';
```

## Quick Checklist Before Deploying

- [ ] Backend package.json has correct start command
- [ ] Frontend has correct API URL environment variable
- [ ] Both repos committed to GitHub
- [ ] Render account created
- [ ] Vercel account created
- [ ] Environment variables set in both services

## After Deployment

1. Test backend health:
   ```
   curl https://your-backend-url/health
   ```

2. Open frontend in browser:
   ```
   https://your-frontend-url
   ```

3. Try creating a debate

## Free Tier Limits

- Render Free: 750 hours/month (= full month)
- Vercel Free: Unlimited
- Cold starts: May take 30-60 seconds on first request

Upgrade anytime for faster speeds.
