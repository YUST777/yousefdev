# Microsoft Clarity Setup Guide

## Installation ✅
Microsoft Clarity has been installed and integrated into your Next.js application.

## Setup Instructions

### 1. Get Your Clarity Project ID
1. Go to [Microsoft Clarity](https://clarity.microsoft.com/)
2. Sign in with your Microsoft account
3. Create a new project or select an existing one
4. Go to **Settings > Overview**
5. Copy your **Project ID**

### 2. Add Project ID to Environment Variables

Create a `.env.local` file in the root of your project (`/root/01studio/me/.env.local`) and add:

```env
NEXT_PUBLIC_CLARITY_PROJECT_ID=your-project-id-here
```

Replace `your-project-id-here` with your actual Clarity project ID.

### 3. Restart the Server

After adding the environment variable, restart your Next.js server:

```bash
pm2 restart 01studio
```

## Features Available

Once configured, Microsoft Clarity will automatically track:

- ✅ **Session Replays** - Watch how users interact with your site
- ✅ **Heatmaps** - See where users click, scroll, and move their mouse
- ✅ **Insights** - Get intelligent summaries and actionable insights
- ✅ **Clarity Copilot** - AI-powered analysis of user behavior

## Advanced Usage

The Clarity component is located at `/components/ClarityAnalytics.tsx`. You can extend it to use additional Clarity features:

### Custom Identify API
```typescript
Clarity.identify("user-id", "session-id", "page-id", "User Name");
```

### Custom Tags
```typescript
Clarity.setTag("userType", "premium");
Clarity.setTag("features", ["feature1", "feature2"]);
```

### Custom Events
```typescript
Clarity.event("button-clicked");
Clarity.event("form-submitted");
```

### Cookie Consent (if required)
```typescript
Clarity.consent(true); // User has consented
Clarity.consent(false); // User has not consented
```

### Upgrade Session (prioritize recording)
```typescript
Clarity.upgrade("important-interaction");
```

## Privacy & Compliance

Microsoft Clarity is GDPR compliant and respects user privacy. Make sure to:
- Add a privacy policy link
- Inform users about analytics tracking (if required by your jurisdiction)
- Use cookie consent if your project requires it

## Documentation

- [Clarity Documentation](https://docs.microsoft.com/en-us/clarity/)
- [Clarity Support](mailto:clarityms@microsoft.com)
- [Clarity Privacy Policy](https://clarity.microsoft.com/terms)

