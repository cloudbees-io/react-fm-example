# Configuration Management Example

This example demonstrates **configuration-based feature management** with **namespace organization** and **environment-specific defaults**.

## What This Example Demonstrates

### Core Concepts

1. **Namespace Organization**
   - Group related flags using Rox namespaces (`ui`, `features`, `performance`, `integrations`)
   - Flags appear in CloudBees platform as `namespace.flagName` (e.g., `ui.theme`, `features.enableSearch`)
   - Makes large flag sets more manageable and organized

2. **Shared Configuration Files**
   - Centralized flag definitions in `src/config/flag-defaults.ts`
   - Type-safe configuration with TypeScript interfaces
   - Single source of truth for flag defaults
   - Easy to share across teams and projects

3. **Environment-Specific Defaults**
   - Different default values for development, staging, and production
   - Automatic environment detection
   - Override base defaults per environment
   - Examples:
     - Development: All features enabled, short timeouts for testing
     - Staging: Production-like with some beta features
     - Production: Conservative defaults, optimized settings

4. **Configuration Export/Import**
   - Export current flag states as JSON
   - Share configurations for documentation
   - Debug environment-specific issues
   - Track configuration changes over time

## Project Structure

```
src/
├── config/
│   ├── flag-defaults.ts      # Default values and environment overrides
│   ├── environment.ts         # Environment detection and SDK keys
│   └── index.ts               # Config exports
├── feature-management/
│   ├── flags.ts               # Flag definitions organized by namespace
│   ├── FeatureFlagsProvider.tsx
│   └── index.ts
├── components/
│   ├── EnvironmentBanner.tsx  # Shows current environment
│   ├── UIConfigSection.tsx    # UI namespace flags
│   ├── FeaturesConfigSection.tsx
│   ├── PerformanceConfigSection.tsx
│   ├── IntegrationsConfigSection.tsx
│   └── ConfigurationSummary.tsx
├── App.tsx
└── main.tsx
```

## Flag Namespaces

### UI Namespace (`ui.*`)
Controls user interface preferences:
- `ui.theme` - Color scheme (light, dark, auto)
- `ui.language` - Application language (en, es, fr, de, ja)
- `ui.enableAccessibility` - Accessibility features
- `ui.fontSize` - Base font size

### Features Namespace (`features.*`)
Controls application features:
- `features.enableSearch` - Search functionality
- `features.enableAdvancedFilters` - Advanced filtering
- `features.enableExport` - Data export
- `features.maxExportRows` - Export row limit
- `features.enableCollaboration` - Collaboration features

### Performance Namespace (`performance.*`)
Controls performance optimizations:
- `performance.enableCaching` - Response caching
- `performance.cacheTimeout` - Cache validity duration
- `performance.enableLazyLoading` - Lazy loading
- `performance.batchSize` - Pagination batch size

### Integrations Namespace (`integrations.*`)
Controls third-party integrations:
- `integrations.enableSlackIntegration`
- `integrations.enableJiraIntegration`
- `integrations.enableGithubIntegration`
- `integrations.webhookTimeout` - Webhook timeout (shared)

## Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Configure SDK Keys

Edit `src/config/environment.ts` and add your SDK keys for each environment:

```typescript
export const SDK_KEYS: Record<Environment, string> = {
  development: 'your-dev-sdk-key',
  staging: 'your-staging-sdk-key',
  production: 'your-prod-sdk-key',
};
```

**Getting SDK Keys:**
1. Go to **Feature management** > **Installation** in CloudBees platform
2. Create separate environments for dev, staging, and production
3. Copy each environment's SDK key
4. Paste into `SDK_KEYS` object

### 3. Run the Application

```bash
npm run dev
# or
yarn dev
```

The app will automatically:
- Detect the current environment
- Load environment-specific defaults
- Connect to CloudBees using the appropriate SDK key
- Register all namespaced flags

### 4. Configure Flags in CloudBees Platform

Once running, all flags will appear in your CloudBees environment organized by namespace:

```
ui/
├── theme
├── language
├── enableAccessibility
└── fontSize

features/
├── enableSearch
├── enableAdvancedFilters
├── enableExport
├── maxExportRows
└── enableCollaboration

performance/
├── enableCaching
├── cacheTimeout
├── enableLazyLoading
└── batchSize

integrations/
├── enableSlackIntegration
├── enableJiraIntegration
├── enableGithubIntegration
└── webhookTimeout
```

## Configuration Patterns

### Pattern 1: Centralized Defaults

Define all flag defaults in one place (`flag-defaults.ts`):

```typescript
export const baseDefaults: FlagDefaults = {
  ui: {
    theme: 'light',
    themeOptions: ['light', 'dark', 'auto'],
    // ... more UI defaults
  },
  features: {
    enableSearch: true,
    // ... more feature defaults
  },
  // ... other namespaces
};
```

**Benefits:**
- Single source of truth
- Easy to update defaults
- Clear documentation of all flags
- Type-safe with TypeScript

### Pattern 2: Environment Overrides

Override specific defaults per environment:

```typescript
export const developmentOverrides: Partial<FlagDefaults> = {
  features: {
    ...baseDefaults.features,
    enableAdvancedFilters: true,  // Enable in dev for testing
    enableCollaboration: true,     // Enable in dev for testing
  },
  performance: {
    ...baseDefaults.performance,
    cacheTimeout: 60,              // Shorter cache for testing
  },
};
```

**Benefits:**
- Development-friendly defaults
- Production-safe settings
- Staging mirrors production
- Easy to reason about differences

### Pattern 3: Namespace-Based Registration

Register flags by namespace for better organization:

```typescript
Rox.register('ui', uiFlags);
Rox.register('features', featuresFlags);
Rox.register('performance', performanceFlags);
Rox.register('integrations', integrationsFlags);
```

**Benefits:**
- Logical grouping in CloudBees UI
- Easier to find related flags
- Clear ownership boundaries
- Scales well with many flags

### Pattern 4: Configuration Export

Export current configuration for sharing or debugging:

```typescript
const config = getFlagValues();
// Export as JSON file
const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
```

**Benefits:**
- Document current state
- Share with team members
- Debug environment differences
- Track configuration history

## Environment-Specific Behavior

### Development Environment
```typescript
// src/config/flag-defaults.ts
export const developmentOverrides: Partial<FlagDefaults> = {
  features: {
    enableAdvancedFilters: true,   // All features ON
    enableCollaboration: true,
  },
  performance: {
    cacheTimeout: 60,              // Short timeout (1 min)
    batchSize: 25,                 // Small batches for debugging
  },
};
```

**Use Case:** Full feature access for developers, fast iterations

### Staging Environment
```typescript
export const stagingOverrides: Partial<FlagDefaults> = {
  features: {
    enableAdvancedFilters: true,   // Beta features enabled
    maxExportRows: 5000,
  },
  integrations: {
    enableSlackIntegration: true,  // Test integrations
  },
};
```

**Use Case:** Production-like testing with beta features

### Production Environment
```typescript
export const productionOverrides: Partial<FlagDefaults> = {
  performance: {
    cacheTimeout: 600,             // Long timeout (10 min)
    batchSize: 100,                // Larger batches
  },
};
```

**Use Case:** Conservative, optimized, stable

## Real-World Use Cases

### Use Case 1: Multi-Team Development

**Scenario:** Large application with multiple teams (UI, Features, Integrations)

**Solution:**
- Each team owns a namespace
- Teams manage their flags independently
- Shared configuration file ensures consistency
- Environment overrides prevent conflicts

```typescript
// Team UI owns 'ui' namespace
Rox.register('ui', uiFlags);

// Team Features owns 'features' namespace
Rox.register('features', featuresFlags);

// Team Integrations owns 'integrations' namespace
Rox.register('integrations', integrationsFlags);
```

### Use Case 2: Environment Parity Testing

**Scenario:** Need to test production configuration in staging

**Solution:**
- Export production configuration
- Compare with staging configuration
- Adjust staging overrides to match production
- Test with production-like settings

```typescript
// Export both configurations
const prodConfig = getFlagValues(); // From production
const stagingConfig = getFlagValues(); // From staging

// Compare and adjust staging overrides
```

### Use Case 3: Onboarding New Developers

**Scenario:** New developer needs to understand all flags

**Solution:**
- Review `flag-defaults.ts` - all flags documented in one place
- Check environment overrides - understand differences
- Use configuration export - see current state
- Namespace organization - logical grouping

### Use Case 4: Configuration Drift Detection

**Scenario:** Track when flag configurations change

**Solution:**
- Export configuration after each deployment
- Commit JSON to version control
- Compare configurations between versions
- Detect unexpected changes

```bash
# Export and commit configuration
npm run dev
# Click "Export as JSON" in UI
git add flag-configuration.json
git commit -m "Update flag configuration"
```

## Advanced Configuration

### Custom Environment Detection

Modify `src/config/environment.ts` to detect environment based on your needs:

```typescript
export const getCurrentEnvironment = (): Environment => {
  // Option 1: URL-based detection
  const hostname = window.location.hostname;
  if (hostname.includes('staging')) return 'staging';
  if (hostname.includes('localhost')) return 'development';
  return 'production';

  // Option 2: Environment variable
  return (import.meta.env.VITE_ENVIRONMENT as Environment) || 'development';

  // Option 3: API call (async, requires refactoring)
  // const env = await fetch('/api/environment').then(r => r.json());
  // return env.environment;
};
```

### Loading Configuration from API

For dynamic configuration loading:

```typescript
// In FeatureFlagsProvider.tsx
const loadRemoteConfig = async () => {
  const response = await fetch('/api/flag-config');
  const remoteDefaults = await response.json();
  // Merge with local defaults
  return { ...baseDefaults, ...remoteDefaults };
};
```

### Namespace Inheritance

Create nested namespaces for deeper organization:

```typescript
// Example: features.search, features.export
Rox.register('features.search', searchFlags);
Rox.register('features.export', exportFlags);
```

## Key Files

- **`src/config/flag-defaults.ts`**: All flag defaults and environment overrides
- **`src/config/environment.ts`**: Environment detection and SDK key management
- **`src/feature-management/flags.ts`**: Flag definitions using configuration defaults
- **`src/feature-management/FeatureFlagsProvider.tsx`**: SDK setup with namespace registration
- **`src/components/*ConfigSection.tsx`**: UI for each namespace
- **`src/components/ConfigurationSummary.tsx`**: Export and view all flag values

## Best Practices

### 1. Namespace Organization
- Use clear, consistent namespace names
- Group by feature domain or team ownership
- Keep namespaces shallow (1-2 levels)
- Document namespace purpose

### 2. Configuration Management
- Keep defaults in version control
- Use TypeScript for type safety
- Document why defaults differ per environment
- Review configuration changes in PRs

### 3. Environment Strategy
- Use separate CloudBees environments for dev/staging/prod
- Keep environment-specific SDK keys secure
- Test configuration changes in staging first
- Document environment differences

### 4. Team Collaboration
- Share configuration files across repositories
- Export configurations for documentation
- Use consistent naming conventions
- Assign namespace ownership to teams

### 5. Maintenance
- Regularly audit unused flags
- Update defaults as features stabilize
- Remove deprecated flags
- Keep configuration file clean and organized

## Troubleshooting

**Q: Flags don't appear in CloudBees UI?**
- Verify SDK key is correct for your environment
- Check console for connection errors
- Ensure `Rox.register()` is called before `Rox.setup()`
- Confirm environment detection is working

**Q: Environment defaults not loading?**
- Check `getCurrentEnvironment()` returns correct value
- Verify environment overrides are properly merged
- Console log the environment to debug
- Check for typos in environment names

**Q: Configuration export doesn't work?**
- Ensure flags are initialized (app not in loading state)
- Check browser console for errors
- Verify browser supports Blob API
- Try refreshing the page

**Q: Namespaces not showing in CloudBees?**
- Namespaces appear after first connection
- Check that flags are registered with namespace string
- Verify SDK version supports namespaces (5.0+)
- Contact CloudBees support if issues persist

## Next Steps

After mastering configuration management, explore:
- **04-advanced-patterns**: A/B testing, user targeting, analytics integration, and gradual rollouts

## Additional Resources

- [CloudBees Feature Management Documentation](https://docs.cloudbees.com/docs/cloudbees-platform/latest/feature-management/)
- [Configuration Best Practices](https://docs.cloudbees.com/docs/cloudbees-platform/latest/feature-management/best-practices)
- [Environment Management Guide](https://docs.cloudbees.com/docs/cloudbees-platform/latest/feature-management/environments)
