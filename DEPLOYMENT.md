# Vercel Deployment Guide

This Next.js application is fully configured for deployment on Vercel with all API routes properly set up.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code should be pushed to the GitHub repository
3. **Environment Variables**: Prepare your API keys and environment variables

## Quick Deployment

### Method 1: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (from project root)
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: customer360 (or your preferred name)
# - Directory: ./
# - Override settings? No
```

### Method 2: Deploy via Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure settings (see below)
5. Click "Deploy"

## Environment Variables Setup

In Vercel Dashboard → Project → Settings → Environment Variables, add:

```env
# Required API Keys
LUSHA_API_KEY=your_lusha_api_key_here
WHATSAPP_API_KEY=your_whatsapp_api_key_here
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id_here
WHATSAPP_ACCESS_TOKEN=your_access_token_here
APOLLO_API_KEY=your_apollo_api_key_here

# Next.js Configuration
NODE_ENV=production
NEXTAUTH_SECRET=your_secure_random_string_here
NEXTAUTH_URL=https://your-deployed-domain.vercel.app

# Database (if applicable)
DATABASE_URL=your_database_connection_string
```

## Build Configuration

The following files are already configured for optimal Vercel deployment:

- ✅ `vercel.json` - Vercel deployment configuration
- ✅ `next.config.js` - Next.js optimizations enabled
- ✅ `package.json` - Build scripts configured
- ✅ `.env.example` - Environment variable template

## API Routes

All API routes are configured as serverless functions:

- **Lusha Integration**: `/api/lusha/*`
- **WhatsApp Integration**: `/api/whatsapp/*`
- **General APIs**: `/api/test`, `/api/test-whatsapp`

## Post-Deployment Checklist

1. **Test API Endpoints**:
   ```bash
   curl https://your-domain.vercel.app/api/test
   curl https://your-domain.vercel.app/api/lusha/test-config
   ```

2. **Verify Environment Variables**:
   - Check `/api/lusha/test-config` endpoint
   - Ensure all required keys are configured

3. **Test Core Functionality**:
   - Lusha API integration
   - WhatsApp messaging
   - Apollo API integration

## Domain Configuration

### Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Update `NEXTAUTH_URL` environment variable

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check TypeScript errors: `npm run lint`
   - Verify dependencies: `npm install`

2. **API Route Errors**:
   - Ensure environment variables are set
   - Check serverless function logs in Vercel dashboard

3. **Static Export Issues**:
   - All API routes use `force-dynamic` for serverless functions
   - Images are optimized for Vercel

### Performance Monitoring

- Use Vercel Analytics for performance insights
- Monitor API function execution times
- Check serverless function logs for errors

## Development vs Production

- **Development**: `npm run dev`
- **Build Test**: `npm run build && npm start`
- **Production**: Automatic deployment via Vercel

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [API Routes Documentation](https://nextjs.org/docs/api-routes/introduction)