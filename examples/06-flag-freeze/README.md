# Flag Freeze Example

This example demonstrates **flag freeze** - a CloudBees Feature Management feature that controls when configuration changes take effect in your application.

## What This Example Demonstrates

- **Flag Freeze Concept**: Prevent flags from updating automatically
- **Freeze Levels**: None, UntilForeground, and UntilLaunch
- **Manual Unfreezing**: Control when frozen flags update
- **Comparison**: Auto-update vs frozen flag behavior
- **Use Cases**: When and why to freeze flags

## What is Flag Freeze?

Flag freeze is a feature that prevents flags from updating automatically when configuration changes are fetched from the CloudBees platform. This gives you precise control over when changes take effect in your application.

### Freeze Levels

CloudBees Feature Management supports three freeze levels:

| Freeze Level | Browser Behavior | Mobile Behavior | Use Case |
|--------------|-----------------|-----------------|----------|
| **`None`** (default) | Updates immediately | Updates immediately | Real-time feature updates |
| **`UntilForeground`** | Manual unfreeze required | Updates when app comes to foreground | Mobile app lifecycle management |
| **`UntilLaunch`** | Manual unfreeze required | Updates on app restart | Critical flows, consistency |

**Important for Browser Apps:** In browser/web applications, `UntilForeground` and `UntilLaunch` require manual unfreezing via `flag.unfreeze()` or `Rox.unfreeze()`. These levels are primarily designed for mobile apps where app lifecycle events (foreground/launch) are more distinct.

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
const sdkKey = 'your-actual-sdk-key-here'
```

### 3. Run the Application

```bash
npm run dev
# or
yarn dev
```

## How to Use Flag Freeze

### Creating a Frozen Flag

```typescript
import {Flag, RoxFlagFreezeLevel} from "rox-browser";

// Boolean flag with freeze
const frozenFlag = new Flag(false, {
  freeze: RoxFlagFreezeLevel.UntilLaunch
});
```

### Unfreezing Flags

#### Unfreeze a Specific Flag

```typescript
// Unfreeze the flag
frozenFlag.unfreeze();

// Fetch latest configuration from CloudBees
await Rox.fetch();
```

#### Unfreeze All Flags

```typescript
import Rox from 'rox-browser';

// Unfreeze all frozen flags
Rox.unfreeze();

// Fetch latest configuration
await Rox.fetch();
```

#### Unfreeze by Namespace

```typescript
// Unfreeze flags in a specific namespace
Rox.unfreeze('payment');

// Fetch latest configuration
await Rox.fetch();
```

**Critical:** `unfreeze()` only unlocks the flag. You must call `Rox.fetch()` to pull the latest configuration from CloudBees.

## Testing Flag Freeze

### Test Auto-Update Flag

1. Toggle `autoUpdateFlag` in CloudBees dashboard
2. Watch it update immediately in the app (no freeze)

### Test Frozen Flag

1. Change `frozenFlag` in CloudBees
2. Notice value doesn't update (it's frozen)
3. Click the "Unfreeze" button
4. Value updates to match CloudBees dashboard
5. Repeat - change flag and click "Unfreeze" to see new value each time

## Real-World Use Cases

### 1. Maintain Consistency During Checkout

```typescript
const checkoutFlags = new Flag(true, {
  freeze: RoxFlagFreezeLevel.UntilLaunch
});

// User goes through checkout flow
// Flags remain frozen - consistent behavior

// After checkout completes
onCheckoutComplete(async () => {
  checkoutFlags.unfreeze();
  await Rox.fetch(); // Get latest values
});
```

**Why:** Prevents flag changes from affecting users mid-checkout, ensuring a consistent payment experience.

### 2. Prevent UI Changes During Form Filling

```typescript
const formConfigFlags = new Flag(false, {
  freeze: RoxFlagFreezeLevel.UntilLaunch
});

// User fills out a complex form
// Form UI remains stable

// After form submission
onFormSubmit(async () => {
  formConfigFlags.unfreeze();
  await Rox.fetch();
});
```

**Why:** Keeps form layout and behavior stable while users interact with it, preventing confusion from mid-interaction changes.

### 3. Reduce Re-renders During Heavy Operations

```typescript
async function processLargeDataset() {
  // Freeze all flags to prevent re-renders during processing
  // (flags are already frozen with UntilLaunch)

  // Heavy data processing...
  await processData();

  // After processing, allow flags to update
  Rox.unfreeze();
  await Rox.fetch();
}
```

**Why:** Prevents performance degradation from flag-triggered re-renders during CPU-intensive operations.

### 4. Critical User Flows

```typescript
// Freeze flags during critical flows like:
// - Password reset
// - Account deletion
// - Payment processing
// - Data export

const criticalFlowFlags = new Flag(true, {
  freeze: RoxFlagFreezeLevel.UntilLaunch
});

onCriticalFlowComplete(async () => {
  criticalFlowFlags.unfreeze();
  await Rox.fetch();
});
```

**Why:** Ensures critical operations complete without unexpected behavior changes.

### 5. A/B Test Consistency

```typescript
const abTestVariant = new RoxString('control', ['control', 'variant_a', 'variant_b'], {
  freeze: RoxFlagFreezeLevel.UntilLaunch
});

// User sees consistent variant throughout their session
// Unfreeze on session end or explicit trigger
```

**Why:** Prevents users from seeing different A/B test variants mid-session, which would skew analytics.

## Best Practices

### 1. Use Sparingly

Only freeze flags when necessary. Most flags should update in real-time to benefit from CloudBees' dynamic configuration capabilities.

```typescript
// ❌ Bad: Freezing everything
const flags = {
  feature1: new Flag(false, { freeze: RoxFlagFreezeLevel.UntilLaunch }),
  feature2: new Flag(false, { freeze: RoxFlagFreezeLevel.UntilLaunch }),
  feature3: new Flag(false, { freeze: RoxFlagFreezeLevel.UntilLaunch }),
};

// ✅ Good: Only freeze critical flags
const flags = {
  checkoutEnabled: new Flag(true, { freeze: RoxFlagFreezeLevel.UntilLaunch }), // Critical
  newDashboard: new Flag(false), // Auto-update is fine
  darkMode: new Flag(false), // Auto-update is fine
};
```

### 2. Document Freeze Reasons

Always comment why a flag is frozen:

```typescript
// Frozen during checkout to prevent payment flow changes
const checkoutFlags = new Flag(true, {
  freeze: RoxFlagFreezeLevel.UntilLaunch
});
```

### 3. Always Unfreeze + Fetch

```typescript
// ❌ Bad: Only unfreezing
frozenFlag.unfreeze();

// ✅ Good: Unfreeze + Fetch
frozenFlag.unfreeze();
await Rox.fetch();
```

### 4. Test Both States

Test your application with:
- Flags frozen (initial state)
- Flags unfrozen (after update)
- Multiple freeze/unfreeze cycles

### 5. Consider User Experience

Frozen flags prevent important updates from reaching users. Unfreeze flags as soon as the critical operation completes.

### 6. Use None for Most Flags

Default to `RoxFlagFreezeLevel.None` (or omit the freeze option) for flags that don't require consistency during critical flows.

## Freeze Level Decision Tree

```
Does the flag affect a critical user flow?
├─ NO  → Use freeze: None (default) ✅
└─ YES → Is mid-flow consistency required?
    ├─ NO  → Use freeze: None (default) ✅
    └─ YES → Use freeze: UntilLaunch
             Remember to unfreeze after flow completes! ⚠️
```

## Common Patterns

### Pattern 1: Session-Based Freezing

```typescript
// Freeze on session start
onSessionStart(() => {
  // Flags are already frozen with UntilLaunch
  console.log('Session started with frozen flags');
});

// Unfreeze on session end
onSessionEnd(async () => {
  Rox.unfreeze();
  await Rox.fetch();
  console.log('Flags unfrozen for next session');
});
```

### Pattern 2: Feature-Specific Freezing

```typescript
// Only freeze specific feature flags
const paymentFlags = {
  enableStripe: new Flag(true, { freeze: RoxFlagFreezeLevel.UntilLaunch }),
  enablePayPal: new Flag(true, { freeze: RoxFlagFreezeLevel.UntilLaunch }),
};

// Other flags auto-update
const uiFlags = {
  darkMode: new Flag(false), // No freeze
  compactView: new Flag(false), // No freeze
};
```

### Pattern 3: Time-Based Unfreezing

```typescript
// Unfreeze after a certain time period
setTimeout(async () => {
  console.log('Timeout reached, unfreezing flags');
  Rox.unfreeze();
  await Rox.fetch();
}, 5 * 60 * 1000); // 5 minutes
```

## Troubleshooting

### Flag Not Updating After Unfreeze

**Problem:** Called `unfreeze()` but flag still shows old value.

**Solution:** Must call `Rox.fetch()` after unfreezing:

```typescript
flag.unfreeze();
await Rox.fetch(); // ← Don't forget this!
```

### All Flags Frozen

**Problem:** All flags seem frozen even those without freeze option.

**Solution:** Check if you accidentally set global freeze in `Rox.setup()`:

```typescript
// ❌ This freezes ALL flags
await Rox.setup(sdkKey, {
  freeze: RoxFlagFreezeLevel.UntilLaunch
});

// ✅ Only specific flags frozen
await Rox.setup(sdkKey);
```

### Unfreeze Not Working

**Problem:** Called `Rox.unfreeze()` but nothing happens.

**Solution:** Ensure you're calling it after `Rox.setup()` completes:

```typescript
await Rox.setup(sdkKey);
// Now you can call unfreeze
Rox.unfreeze();
await Rox.fetch();
```

## Additional Resources

- [CloudBees Flag Freeze Documentation](https://docs.cloudbees.com/docs/cloudbees-feature-management/latest/feature-flags/flag-freeze)
- [JavaScript Browser SDK Reference](https://docs.cloudbees.com/docs/cloudbees-feature-management-api/latest/api-reference/javascript-browser-api)
- [Feature Management Best Practices](https://docs.cloudbees.com/docs/cloudbees-feature-management/latest/)

## Next Steps

After mastering flag freeze, explore other examples:
- **01-basic-example**: Learn basic SDK integration
- **02-nested-flags**: Flag hierarchies and dependencies
- **03-config-management**: Multi-environment configurations
- **04-impression-handler**: Track flag evaluations
- **05-dynamic-api**: Access flags without pre-registration
