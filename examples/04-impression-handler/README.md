# Impression Handler Example

This example demonstrates **impression handlers** for tracking feature flag evaluations in real-time.

## What This Example Demonstrates

### Core Concept: Impression Handler

An **impression handler** is a callback function that gets triggered every time a feature flag is evaluated (when `.isEnabled()` or `.getValue()` is called). This allows you to:

- Track which flags are being used
- Monitor what values they return
- Send data to analytics services
- Debug flag behavior
- Measure feature adoption

**Key Point:** The impression handler fires **every time** a flag is evaluated, not just once per page load.

## Project Structure

```
src/
├── utils/
│   ├── user-context.ts        # Generate sample user data
│   └── analytics.ts            # Store and display impressions
├── feature-management/
│   ├── flags.ts                # Simple flag definitions
│   ├── FeatureFlagsProvider.tsx # SDK setup with impression handler
│   └── index.ts
├── components/
│   └── AnalyticsDashboard.tsx  # Display tracked impressions
├── App.tsx
└── main.tsx
```

## How Impression Handlers Work

### 1. Setup the Impression Handler

In `FeatureFlagsProvider.tsx`, the impression handler is configured in `Rox.setup()`:

```typescript
await Rox.setup(sdkKey, {
  impressionHandler(reportingValue: any, _context: any) {
    // This function is called EVERY TIME a flag is evaluated
    trackFlagImpression({
      flagName: reportingValue.name || 'unknown',
      flagValue: reportingValue.value,
      timestamp: new Date(),
      userId: user.userId,
      context: {
        userTier: user.userTier,
        country: user.country,
      },
    });
  },
})
```

### 2. When Does It Fire?

The impression handler fires every time you call:

```typescript
// Boolean flags - fires when .isEnabled() is called
if (flags.enableDarkMode.isEnabled()) {
  // Handler fires here ↑
}

// String flags - fires when .getValue() is called
const theme = flags.themeVariant.getValue();
// Handler fires here ↑

// Number flags - fires when .getValue() is called
const limit = flags.maxItems.getValue();
// Handler fires here ↑
```

### 3. What Data Do You Get?

The `reportingValue` parameter contains:

```javascript
{
  name: "enableDarkMode",     // Flag name
  value: true,                // Current value
  // ... other SDK metadata
}
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Add Your SDK Key

Edit `src/feature-management/FeatureFlagsProvider.tsx` and add your SDK key:

```typescript
const sdkKey = 'your-actual-sdk-key'
```

### 3. Run the Application

```bash
npm run dev
# or
yarn dev
```

### 4. Watch Impressions Being Tracked

1. The app shows 3 simple feature flags (Boolean, String, and Number types)
2. Each time the component renders, flags are evaluated
3. Open the browser console to see impressions being tracked in real-time
4. Try changing flag values in the CloudBees platform and watch the impressions appear in the console

## Example Flags in This Demo

```typescript
// Boolean Flag
enableDarkMode: new Flag(false)           // Dark mode toggle

// String Flag
language: new RoxString('en', ['en', 'es', 'fr', 'de'])

// Number Flag
refreshInterval: new RoxNumber(30, [10, 30, 60])
```

## Real-World Use Cases

### Use Case 1: Analytics Integration

Send impressions to Google Analytics:

```typescript
impressionHandler(reportingValue: any, _context: any) {
  gtag('event', 'feature_flag_viewed', {
    flag_name: reportingValue.name,
    flag_value: reportingValue.value,
    user_id: user.userId,
  });
}
```

### Use Case 2: Debug Flag Usage

Log flag evaluations during development:

```typescript
impressionHandler(reportingValue: any, _context: any) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`🚩 Flag evaluated:`, {
      name: reportingValue.name,
      value: reportingValue.value,
      timestamp: new Date().toISOString(),
    });
  }
}
```

### Use Case 3: Feature Adoption Metrics

Track how often features are accessed:

```typescript
const featureAccessCounts = new Map<string, number>();

impressionHandler(reportingValue: any, _context: any) {
  const count = featureAccessCounts.get(reportingValue.name) || 0;
  featureAccessCounts.set(reportingValue.name, count + 1);

  // Send to analytics every 100 impressions
  if (count % 100 === 0) {
    analytics.track('Feature Usage Milestone', {
      feature: reportingValue.name,
      total_uses: count,
    });
  }
}
```

## Integrating with Analytics Services

### Google Analytics (gtag.js)

```typescript
impressionHandler(reportingValue: any) {
  gtag('event', 'feature_flag', {
    event_category: 'Feature Flags',
    event_label: reportingValue.name,
    value: String(reportingValue.value),
  });
}
```

### Amplitude

```typescript
impressionHandler(reportingValue: any) {
  amplitude.track('Feature Flag Evaluated', {
    flag: reportingValue.name,
    value: reportingValue.value,
    timestamp: Date.now(),
  });
}
```

### Mixpanel

```typescript
impressionHandler(reportingValue: any) {
  mixpanel.track('Feature Flag Viewed', {
    'Flag Name': reportingValue.name,
    'Flag Value': reportingValue.value,
  });
}
```

### Segment

```typescript
impressionHandler(reportingValue: any) {
  analytics.track('Feature Flag Evaluated', {
    flagName: reportingValue.name,
    flagValue: reportingValue.value,
  });
}
```

## Best Practices

### 1. Batch Analytics Calls

Don't send every impression immediately - batch them:

```typescript
const impressionQueue: any[] = [];

impressionHandler(reportingValue: any) {
  impressionQueue.push({
    flag: reportingValue.name,
    value: reportingValue.value,
    timestamp: Date.now(),
  });
}

// Send in batches every 10 seconds
setInterval(() => {
  if (impressionQueue.length > 0) {
    analytics.track('Feature Flags Batch', {
      impressions: impressionQueue,
    });
    impressionQueue.length = 0;
  }
}, 10000);
```

### 2. Sample High-Volume Flags

For flags evaluated thousands of times, consider sampling:

```typescript
impressionHandler(reportingValue: any) {
  // Only track 10% of impressions for high-volume flags
  if (reportingValue.name === 'highVolumeFlag') {
    if (Math.random() < 0.1) {
      trackImpression(reportingValue);
    }
  } else {
    trackImpression(reportingValue);
  }
}
```

### 3. Include User Context

Add relevant context for better analysis:

```typescript
impressionHandler(reportingValue: any) {
  trackFlagImpression({
    ...reportingValue,
    context: {
      userId: user.userId,
      userTier: user.tier,
      country: user.country,
      deviceType: user.deviceType,
      appVersion: APP_VERSION,
    },
  });
}
```

### 4. Handle Errors Gracefully

Don't let impression tracking break your app:

```typescript
impressionHandler(reportingValue: any) {
  try {
    trackFlagImpression(reportingValue);
  } catch (error) {
    console.error('Failed to track impression:', error);
    // Don't throw - let app continue
  }
}
```

## Performance Considerations

### Minimize Flag Evaluations

```typescript
// ❌ BAD: Evaluates flag on every render
function MyComponent() {
  return (
    <div>
      {flags.showFeature.isEnabled() && <Feature />}
      {flags.showFeature.isEnabled() && <AnotherFeature />}
    </div>
  );
}

// ✅ GOOD: Evaluate once, reuse result
function MyComponent() {
  const showFeature = flags.showFeature.isEnabled();
  return (
    <div>
      {showFeature && <Feature />}
      {showFeature && <AnotherFeature />}
    </div>
  );
}
```

### Async Analytics

Make analytics calls non-blocking:

```typescript
impressionHandler(reportingValue: any) {
  // Send asynchronously - don't block flag evaluation
  setTimeout(() => {
    analytics.track('Flag Viewed', reportingValue);
  }, 0);
}
```

## Troubleshooting

**Q: Impression handler not firing?**
- Ensure it's configured in `Rox.setup()` options (not as a separate method call)
- Check that flags are actually being evaluated (`.isEnabled()` or `.getValue()` is called)
- Look for JavaScript errors in the handler that might be silently failing

**Q: Too many impressions being tracked?**
- Flags in render loops get evaluated multiple times
- Consider caching flag values or using React.useMemo()
- Implement sampling for high-volume flags

**Q: Can I have multiple impression handlers?**
- No, only one impression handler can be registered
- But you can call multiple tracking services from within one handler

**Q: Does the handler slow down my app?**
- Handler should be very fast (< 1ms)
- Avoid synchronous analytics calls
- Use batching and async sends

## Additional Resources

- [CloudBees Impression Handler Documentation](https://docs.cloudbees.com/docs/cloudbees-feature-management/latest/reporting/impression-handler)
- [Analytics Integration Guide](https://docs.cloudbees.com/docs/cloudbees-feature-management/latest/reporting)
- [JavaScript SDK Reference](https://docs.cloudbees.com/docs/cloudbees-feature-management-api/latest/api-reference/javascript-browser-api)
