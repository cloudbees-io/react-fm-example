# Basic Feature Flags Example

This is a simple React application demonstrating the fundamentals of CloudBees Feature Management.

## What This Example Demonstrates

- **Basic SDK Setup**: Initialize the CloudBees Feature Management SDK (`rox-browser`)
- **Simple Flag Types**:
  - Boolean flags (`showMessage`)
  - String flags with options (`fontColor`)
  - String flags without options (`message`)
  - Number flags with options (`fontSize`)
- **React Context Pattern**: Use React Context to provide flags throughout the app
- **Real-time Updates**: See flag value changes reflected immediately in the UI

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

### 4. Test the Integration

1. In the CloudBees platform UI, go to **Feature management**
2. You should see the following flags:
   - `showMessage` (Boolean)
   - `message` (String)
   - `fontSize` (Number)
   - `fontColor` (String)
3. Update any flag value and watch the changes appear in your running application

## Key Files

- **`src/feature-management/flags.ts`**: Flag definitions
- **`src/feature-management/FeatureFlagsProvider.tsx`**: SDK initialization and React Context provider
- **`src/feature-management/index.ts`**: Context setup and custom hook
- **`src/App.tsx`**: Example usage of feature flags in components

## Next Steps

After mastering this basic example, explore more advanced patterns:
- **02-nested-flags**: Learn about flag hierarchies and dependencies
- **03-config-management**: Manage flags with shared configuration files
- **04-impression-handler**: Track flag evaluations for analytics
- **05-dynamic-api**: Access flags by name without pre-registration
