# Nested Flags Example

This example demonstrates **nested flag configurations** using a simple notifications system.

## What This Example Demonstrates

### Core Concepts

1. **Master Flag (Container)**
   - One flag that controls an entire feature domain
   - Example: `enableNotifications` - turns the entire notification system on/off

2. **Child Flags (Dependent Features)**
   - Individual features that only work when the master flag is enabled
   - Examples: `emailNotifications`, `pushNotifications`, `smsNotifications`
   - Child flags are ignored when the master flag is OFF

3. **Shared Configuration**
   - Settings that apply to all enabled child features
   - Example: `notificationFrequency` - applies to all active notification channels
   - Keeps configuration consistent across related features

4. **Helper Functions**
   - Functions that check both master AND child flags
   - Example: `shouldShowNotificationType(flag)` - returns true only if both flags are enabled
   - Prevents code duplication and ensures consistent logic

## Flag Hierarchy

```
enableNotifications (Master Flag)
├── emailNotifications (Child)
├── pushNotifications (Child)
├── smsNotifications (Child)
└── notificationFrequency (Shared Config)
```

**How it works:**
- If `enableNotifications` is **OFF** → No notifications sent, child flags don't matter
- If `enableNotifications` is **ON** → Each channel can be individually enabled/disabled
- `notificationFrequency` applies to **all enabled channels**

## Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Add Your SDK Key

1. Go to **Feature management** > **Installation** in the CloudBees platform UI
2. Select an environment (or create a new one)
3. Copy the SDK key from the installation instructions
4. Open `src/feature-management/FeatureFlagsProvider.tsx`
5. Replace `<YOUR-SDK-KEY>` on line 7 with your actual SDK key

```typescript
const sdkKey = 'your-actual-sdk-key-here'
```

### 3. Run the Application

```bash
npm run dev
# or
yarn dev
```

Then open the provided URL (usually `http://localhost:5173`) in your browser.

### 4. Experiment with the Flags

The application creates these flags in your CloudBees environment:

**Flags:**
- `enableNotifications` (Boolean) - Master flag for notification system
- `emailNotifications` (Boolean) - Email channel toggle
- `pushNotifications` (Boolean) - Push notification channel toggle
- `smsNotifications` (Boolean) - SMS channel toggle
- `notificationFrequency` (String) - Options: immediate, hourly, daily, weekly

**Try this:**

1. **Turn OFF `enableNotifications`**
   - Watch all notification channels become unavailable
   - Individual channel settings don't matter when master is OFF

2. **Turn ON `enableNotifications`**
   - Now you can toggle individual channels
   - Enable email and SMS, but leave push disabled
   - All enabled channels use the same `notificationFrequency`

3. **Change `notificationFrequency`**
   - Set it to "daily"
   - This applies to ALL enabled channels at once

## Implementation Pattern

### In Your Code

```typescript
// Import helper function
import { shouldShowNotificationType } from './flags';

// Check if email notifications should be sent
if (shouldShowNotificationType(flags.emailNotifications)) {
  // Send email
  sendEmail({
    frequency: flags.notificationFrequency.getValue()
  });
}
```

### The Helper Function

```typescript
export const shouldShowNotificationType = (notificationFlag: Flag): boolean => {
  // Check master flag first, then child flag
  return flags.enableNotifications.isEnabled() && notificationFlag.isEnabled();
}
```

This ensures:
- ✅ Master flag is checked first (performance optimization)
- ✅ Child flag is only checked if master is enabled
- ✅ Consistent logic across your application
- ✅ Easy to read and maintain

## Real-World Use Cases

### Use Case 1: Emergency Disable
Turn off ALL notifications instantly without changing individual settings:
```
Set enableNotifications = OFF
```
All channels stop immediately, but their individual settings are preserved.

### Use Case 2: Gradual Rollout
Roll out notifications to different channels progressively:
1. Enable master flag for all users
2. Start with email only (90% of users)
3. Add push notifications (50% of users)
4. Finally add SMS (10% of users)

### Use Case 3: Compliance
Different regions might require different notification channels:
- EU: Email + SMS (for GDPR compliance)
- US: Email + Push
- Master flag allows quick regional control

### Use Case 4: Cost Control
SMS notifications are expensive:
- Keep master flag ON
- Turn OFF `smsNotifications` during high-volume periods
- Email and push continue working

## Key Files

- **`src/feature-management/flags.ts`**: Flag definitions and helper function
- **`src/components/NotificationsSection.tsx`**: UI showing the hierarchy
- **`src/App.tsx`**: Main application

## Best Practices

1. **Always Check Master First**
   ```typescript
   // Good ✅
   if (master.isEnabled() && child.isEnabled()) { ... }

   // Bad ❌ - wastes evaluation if master is off
   if (child.isEnabled() && master.isEnabled()) { ... }
   ```

2. **Use Helper Functions**
   - Don't repeat the check logic everywhere
   - Create one helper function and reuse it

3. **Clear Naming**
   - Master flags: `enable*` (enableNotifications, enablePremiumFeatures)
   - Child flags: descriptive names (emailNotifications, premiumAnalytics)

4. **Document Dependencies**
   - Make it clear which flags depend on others
   - Use code comments to explain the hierarchy

## Next Steps

After mastering nested flags, explore:
- **03-config-management**: Organize flags with namespaces and config files
- **04-advanced-patterns**: A/B testing, user targeting, and analytics

## Troubleshooting

**Q: I disabled the master flag but child flag changes still take effect?**
- Check your code - are you checking the master flag first?
- Use the helper function to ensure correct logic

**Q: How do I see the flags in CloudBees?**
- Make sure the app is running with a valid SDK key
- Refresh the Feature Management page
- Look for flags starting with the names above

**Q: Can I have multiple levels of nesting?**
- Yes! You can nest as deep as needed
- Example: enableNotifications → emailNotifications → enableHtmlEmail
- Just extend the helper function pattern
