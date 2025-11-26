/**
 * Flag Defaults Configuration
 *
 * This file defines default values for all feature flags in the application.
 * These defaults are used as fallbacks when flags are not configured in CloudBees.
 *
 * Benefits:
 * - Centralized flag configuration
 * - Clear documentation of all flags in one place
 * - Type-safe defaults
 * - Easy to share across teams
 */

export interface FlagDefaults {
  // Features Namespace
  features: {
    enableSearch: boolean;
    enableAdvancedFilters: boolean;
    enableExport: boolean;
    maxExportRows: number;
    maxExportRowsOptions: number[];
    enableCollaboration: boolean;
  };
}

/**
 * Base defaults shared across all environments
 */
export const baseDefaults: FlagDefaults = {
  features: {
    enableSearch: true,
    enableAdvancedFilters: false,
    enableExport: true,
    maxExportRows: 1000,
    maxExportRowsOptions: [100, 1000, 5000, 10000],
    enableCollaboration: false,
  },
};

/**
 * Development environment overrides
 * - All features enabled for development
 */
export const developmentOverrides: Partial<FlagDefaults> = {
  features: {
    ...baseDefaults.features,
    enableAdvancedFilters: true,
    enableCollaboration: true,
  },
};

/**
 * Staging environment overrides
 * - Production-like settings with some advanced features enabled
 */
export const stagingOverrides: Partial<FlagDefaults> = {
  features: {
    ...baseDefaults.features,
    enableAdvancedFilters: true,
    maxExportRows: 5000,
  },
};

/**
 * Production environment overrides
 * - Conservative defaults, only stable features enabled
 */
export const productionOverrides: Partial<FlagDefaults> = {
  features: {
    ...baseDefaults.features,
  },
};

/**
 * Merge base defaults with environment-specific overrides
 */
export const getEnvironmentDefaults = (environment: 'development' | 'staging' | 'production'): FlagDefaults => {
  let overrides: Partial<FlagDefaults> = {};

  switch (environment) {
    case 'development':
      overrides = developmentOverrides;
      break;
    case 'staging':
      overrides = stagingOverrides;
      break;
    case 'production':
      overrides = productionOverrides;
      break;
  }

  return {
    features: { ...baseDefaults.features, ...overrides.features },
  };
};
