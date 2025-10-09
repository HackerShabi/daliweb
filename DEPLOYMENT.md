# Deployment Guide

## Vercel Deployment Setup

### Environment Variables Configuration

The build error you're experiencing is due to missing environment variables in your Vercel deployment. Follow these steps to fix it:

#### 1. Access Vercel Dashboard
- Go to [vercel.com](https://vercel.com)
- Navigate to your project dashboard
- Click on your project name

#### 2. Configure Environment Variables
- Go to **Settings** tab
- Click on **Environment Variables** in the sidebar
- Add the following variables:

**Required Variables:**
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**Firebase Variables:**
```
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

**API Configuration:**
```
NEXT_PUBLIC_API_URL=https://daliwebagencybackend.onrender.com
```

#### 3. Environment Scope
For each variable, select the appropriate environment:
- ✅ **Production** (required for live deployment)
- ✅ **Preview** (recommended for testing)
- ✅ **Development** (optional)

#### 4. Redeploy
After adding all environment variables:
- Go to **Deployments** tab
- Click **Redeploy** on the latest deployment
- Or push a new commit to trigger automatic deployment

### Common Issues

#### Build Error: "Invalid/Missing environment variable: MONGODB_URI"
**Solution:** Ensure `MONGODB_URI` is added to Vercel environment variables with the exact value provided above.

#### Firebase Authentication Not Working
**Solution:** Verify all `NEXT_PUBLIC_FIREBASE_*` variables are correctly set in Vercel.

#### API Calls Failing
**Solution:** Check that `NEXT_PUBLIC_API_URL` points to your backend server.

### Local Development

For local development, copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your actual values.

### Security Notes

- Never commit `.env.local` or `.env` files to git
- Keep your MongoDB credentials secure
- Rotate secrets regularly
- Use different databases for development and production

### Troubleshooting

If you continue to experience issues:

1. **Check Vercel Build Logs:**
   - Go to Deployments tab
   - Click on the failed deployment
   - Review the build logs for specific errors

2. **Verify Environment Variables:**
   - Ensure all required variables are set
   - Check for typos in variable names
   - Verify values don't contain extra spaces

3. **Test Locally:**
   - Run `npm run build` locally to test the build process
   - Ensure your `.env.local` matches Vercel configuration

4. **Contact Support:**
   - If issues persist, check Vercel documentation
   - Contact Vercel support for deployment-specific issues