# Dynamic API Example

This example demonstrates the **Dynamic API** for accessing CloudBees Feature Management flags without pre-registration.

## What This Example Demonstrates

### Core Concept: Dynamic API

The **Dynamic API** allows you to access feature flags by name at runtime, without creating and registering `Flag`, `RoxString`, or `RoxNumber` instances. This is particularly useful when:

- Flag names come from external configuration
- You're building plugin or module systems
- You need to support dynamic feature catalogs
- Flag names are determined at runtime

## Static API vs Dynamic API

### Static API (Traditional Approach)

```typescript
// 1. Define flag instances
const flags = {
  enableDarkMode: new Flag(false),
  language: new RoxString('en', ['en', 'es', 'fr']),
  maxRetries: new RoxNumber(3, [1, 3, 5])
};

// 2. Register flags
Rox.register('', flags);

// 3. Setup SDK
await Rox.setup(sdkKey);

// 4. Use flags
if (flags.enableDarkMode.isEnabled()) {
  // Enable dark mode
}
```

**Pros:**
- Type-safe with TypeScript
- Autocompletion in IDE
- Compile-time errors for typos

**Cons:**
- Must know all flag names at compile time
- Can't add flags dynamically
- Less flexible for complex scenarios

### Dynamic API (Runtime Approach)

```typescript
// 1. Just setup SDK (no registration!)
await Rox.setup(sdkKey);

// 2. Access flags by name
const darkModeEnabled = Rox.dynamicApi.isEnabled('enableDarkMode', false);
const language = Rox.dynamicApi.value('language', 'en');
const maxRetries = Rox.dynamicApi.getNumber('maxRetries', 3);

// 3. Use the values
if (darkModeEnabled) {
  // Enable dark mode
}
```

**Pros:**
- No pre-registration needed
- Support runtime flag names
- Perfect for feature catalogs
- Flexible plugin systems

**Cons:**
- No type safety (string-based)
- No autocompletion
- Runtime errors for typos

## Project Structure

```
src/
├── feature-management/
│   ├── flags-config.ts         # Flag definitions for dynamic loading
│   ├── FeatureFlagsProvider.tsx # SDK setup (no registration!)
│   └── index.ts
├── App.tsx                      # Dynamic API demo
└── main.tsx
```

## Dynamic API Methods

### Boolean Flags

```typescript
Rox.dynamicApi.isEnabled(
  flagName: string,
  defaultValue: boolean,
  context?: unknown
): boolean
```

**Example:**
```typescript
const isEnabled = Rox.dynamicApi.isEnabled('enableNewFeature', false);

if (isEnabled) {
  showNewFeature();
}
```

### String Flags

```typescript
Rox.dynamicApi.value(
  flagName: string,
  defaultValue: string,
  context?: unknown
): string
```

**Example:**
```typescript
const apiEndpoint = Rox.dynamicApi.value('apiEndpoint', 'production');

const apiUrl = endpoints[apiEndpoint];
```

### Number Flags

```typescript
Rox.dynamicApi.getNumber(
  flagName: string,
  defaultValue: number,
  context?: unknown
): number
```

**Example:**
```typescript
const maxRetries = Rox.dynamicApi.getNumber('maxRetries', 3);

for (let i = 0; i < maxRetries; i++) {
  // Retry logic
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

### 4. Explore the Demo

The app shows:
- Side-by-side comparison of Static vs Dynamic API
- Live examples of all three flag types
- Common use case implementations
- Performance and best practices

## Real-World Use Cases

### Use Case 1: Feature Catalog

Load available features from a remote API:

```typescript
// Fetch feature catalog
const features = await fetch('/api/feature-catalog').then(r => r.json());

// [
//   { name: "analytics", flagName: "enableAnalytics", defaultValue: false },
//   { name: "chat", flagName: "enableChat", defaultValue: true },
//   ...
// ]

// Check each feature
features.forEach(feature => {
  const enabled = Rox.dynamicApi.isEnabled(
    feature.flagName,
    feature.defaultValue
  );

  if (enabled) {
    loadFeature(feature.name);
  }
});
```

### Use Case 2: Plugin System

Enable/disable plugins dynamically:

```typescript
const availablePlugins = ['analytics', 'chat', 'payments', 'notifications'];

const loadPlugins = async () => {
  for (const pluginName of availablePlugins) {
    // Construct flag name dynamically
    const flagName = `enable${capitalize(pluginName)}Plugin`;

    const isEnabled = Rox.dynamicApi.isEnabled(flagName, false);

    if (isEnabled) {
      console.log(`Loading ${pluginName} plugin...`);
      await import(`./plugins/${pluginName}`);
    }
  }
};
```

### Use Case 3: Multi-Tenant Configuration

Different configurations for different tenants:

```typescript
const getTenantConfig = (tenantId: string) => {
  // Construct tenant-specific flag names
  const maxUsers = Rox.dynamicApi.getNumber(
    `tenant_${tenantId}_maxUsers`,
    10
  );

  const tier = Rox.dynamicApi.value(
    `tenant_${tenantId}_tier`,
    'basic'
  );

  const featuresEnabled = Rox.dynamicApi.isEnabled(
    `tenant_${tenantId}_premiumFeatures`,
    false
  );

  return { maxUsers, tier, featuresEnabled };
};
```

### Use Case 4: A/B Test Variants

Dynamically load A/B test configurations:

```typescript
const experiments = [
  { name: 'homepage-design', variants: ['control', 'variant-a', 'variant-b'] },
  { name: 'checkout-flow', variants: ['single-page', 'multi-step'] },
  { name: 'pricing-display', variants: ['monthly', 'annual', 'both'] }
];

experiments.forEach(experiment => {
  const variant = Rox.dynamicApi.value(
    `experiment_${experiment.name}`,
    experiment.variants[0] // default to control
  );

  applyExperimentVariant(experiment.name, variant);
});
```

### Use Case 5: Configuration-Driven UI

Build UI from external configuration:

```typescript
// Load UI configuration
const uiConfig = await fetch('/api/ui-config').then(r => r.json());

// {
//   "theme": { "flag": "uiTheme", "default": "light" },
//   "layout": { "flag": "uiLayout", "default": "grid" },
//   "sidebarPosition": { "flag": "sidebarPosition", "default": "left" }
// }

// Apply settings dynamically
Object.entries(uiConfig).forEach(([setting, config]) => {
  const value = Rox.dynamicApi.value(config.flag, config.default);
  applyUISetting(setting, value);
});
```

## Best Practices

### 1. Centralize Flag Names

Create a constants file to avoid typos:

```typescript
// flag-names.ts
export const FLAG_NAMES = {
  DARK_MODE: 'enableDarkMode',
  API_ENDPOINT: 'apiEndpoint',
  MAX_RETRIES: 'maxRetries',
} as const;

// Usage
const enabled = Rox.dynamicApi.isEnabled(FLAG_NAMES.DARK_MODE, false);
```

### 2. Create Helper Functions

Wrap Dynamic API calls for consistency:

```typescript
// flag-helpers.ts
export const getFeatureFlag = (featureName: string): boolean => {
  return Rox.dynamicApi.isEnabled(`enable${featureName}`, false);
};

export const getConfigValue = (configKey: string, defaultValue: string): string => {
  return Rox.dynamicApi.value(`config_${configKey}`, defaultValue);
};

// Usage
if (getFeatureFlag('DarkMode')) {
  enableDarkMode();
}
```

### 3. Validate Flag Names

Log or alert on unknown flags:

```typescript
const knownFlags = ['enableDarkMode', 'apiEndpoint', 'maxRetries'];

const getDynamicFlag = (flagName: string, defaultValue: any) => {
  if (!knownFlags.includes(flagName)) {
    console.warn(`Unknown flag accessed: ${flagName}`);
  }

  if (typeof defaultValue === 'boolean') {
    return Rox.dynamicApi.isEnabled(flagName, defaultValue);
  } else if (typeof defaultValue === 'number') {
    return Rox.dynamicApi.getNumber(flagName, defaultValue);
  } else {
    return Rox.dynamicApi.value(flagName, String(defaultValue));
  }
};
```

### 4. Document Flag Configurations

Keep a manifest of all dynamic flags:

```typescript
// flags-manifest.ts
export const flagsManifest = {
  enableDarkMode: {
    type: 'boolean',
    defaultValue: false,
    description: 'Enable dark theme',
    usedIn: ['App.tsx', 'ThemeProvider.tsx']
  },
  apiEndpoint: {
    type: 'string',
    defaultValue: 'production',
    options: ['development', 'staging', 'production'],
    description: 'API endpoint environment',
    usedIn: ['api/client.ts']
  }
};
```

## Performance Considerations

### Caching Flag Values

Cache frequently accessed flags to avoid repeated evaluations:

```typescript
class FlagCache {
  private cache = new Map<string, { value: any, timestamp: number }>();
  private ttl = 5000; // 5 seconds

  get(flagName: string, defaultValue: any): any {
    const cached = this.cache.get(flagName);

    if (cached && Date.now() - cached.timestamp < this.ttl) {
      return cached.value;
    }

    const value = this.evaluateFlag(flagName, defaultValue);

    this.cache.set(flagName, { value, timestamp: Date.now() });

    return value;
  }

  private evaluateFlag(flagName: string, defaultValue: any): any {
    if (typeof defaultValue === 'boolean') {
      return Rox.dynamicApi.isEnabled(flagName, defaultValue);
    } else if (typeof defaultValue === 'number') {
      return Rox.dynamicApi.getNumber(flagName, defaultValue);
    } else {
      return Rox.dynamicApi.value(flagName, String(defaultValue));
    }
  }
}
```

### Batch Flag Checks

Check multiple flags at once:

```typescript
const checkMultipleFlags = (flagConfigs: Array<{ name: string, default: any }>) => {
  const results: Record<string, any> = {};

  flagConfigs.forEach(config => {
    if (typeof config.default === 'boolean') {
      results[config.name] = Rox.dynamicApi.isEnabled(config.name, config.default);
    } else if (typeof config.default === 'number') {
      results[config.name] = Rox.dynamicApi.getNumber(config.name, config.default);
    } else {
      results[config.name] = Rox.dynamicApi.value(config.name, config.default);
    }
  });

  return results;
};
```

## When to Use Dynamic API

### ✅ Use Dynamic API When:

- Flag names come from external configuration files
- Building plugin or extension systems
- Supporting multi-tenant applications with tenant-specific flags
- Creating feature catalogs or marketplaces
- Flag names are constructed at runtime
- Need maximum flexibility

### ❌ Don't Use Dynamic API When:

- All flags are known at compile time
- Type safety is critical
- Working on a simple application
- Team prefers strong typing and autocompletion
- No dynamic flag name requirements

## Combining Both APIs

You can use both Static and Dynamic APIs in the same application:

```typescript
// Static API for core features
const coreFlags = {
  enableAuth: new Flag(true),
  enableLogging: new Flag(true),
};

Rox.register('core', coreFlags);

await Rox.setup(sdkKey);

// Use static API for core features
if (coreFlags.enableAuth.isEnabled()) {
  setupAuth();
}

// Use dynamic API for plugin features
const plugins = await loadPluginConfig();
plugins.forEach(plugin => {
  const enabled = Rox.dynamicApi.isEnabled(plugin.flagName, false);
  if (enabled) {
    loadPlugin(plugin);
  }
});
```

## Troubleshooting

**Q: My dynamic flags always return the default value**
- Ensure flags are created in the CloudBees dashboard
- Check flag names match exactly (case-sensitive)
- Verify SDK is initialized (`await Rox.setup()`)
- Check browser console for errors

**Q: How do I know which flags are available?**
- Check the CloudBees dashboard
- Create a flag catalog/manifest file
- Use `Rox.flags` to see registered flags (static API only)

**Q: Can I use contexts with Dynamic API?**
- Yes! Pass context as the third parameter:
  ```typescript
  Rox.dynamicApi.isEnabled('featureFlag', false, { userId: '123' })
  ```

**Q: Does Dynamic API work with impression handlers?**
- Yes! Impression handlers fire for both Static and Dynamic API calls

## Additional Resources

- [CloudBees Dynamic API Documentation](https://docs.cloudbees.com/docs/cloudbees-feature-management/latest/feature-flags/dynamic-api)
- [JavaScript SDK Reference](https://docs.cloudbees.com/docs/cloudbees-feature-management-api/latest/api-reference/javascript-browser-api)
- [Feature Flag Best Practices](https://docs.cloudbees.com/docs/cloudbees-feature-management/latest/)
