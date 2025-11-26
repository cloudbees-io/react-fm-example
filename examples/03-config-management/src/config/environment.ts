/**
 * Environment Configuration
 *
 * This module determines the current environment and provides
 * environment-specific settings.
 */

export type Environment = 'development' | 'staging' | 'production';

/**
 * Manual environment override (stored in localStorage)
 * This allows switching environments from the UI for demonstration purposes
 */
const STORAGE_KEY = 'cloudbees-fm-environment';

export const setEnvironment = (env: Environment): void => {
  localStorage.setItem(STORAGE_KEY, env);
};

export const getStoredEnvironment = (): Environment | null => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'development' || stored === 'staging' || stored === 'production') {
    return stored;
  }
  return null;
};

/**
 * Detect the current environment based on various factors
 */
export const getCurrentEnvironment = (): Environment => {
  // Check for manual override first
  const storedEnv = getStoredEnvironment();
  if (storedEnv) {
    return storedEnv;
  }

  // In a real application, you might determine this from:
  // - Environment variables (process.env.NODE_ENV)
  // - URL hostname (window.location.hostname)
  // - Build configuration
  // - Runtime configuration API

  // For this example, we'll use the Vite mode
  const mode = import.meta.env.MODE;

  if (mode === 'production') {
    // Check hostname to differentiate between staging and production
    const hostname = window.location.hostname;
    if (hostname.includes('staging') || hostname.includes('stg')) {
      return 'staging';
    }
    return 'production';
  }

  return 'development';
};

/**
 * Environment-specific SDK keys
 * In production, these would typically come from environment variables
 * or a secure configuration service
 */
export const SDK_KEYS: Record<Environment, string> = {
  development: '5986a73f-1838-40a2-9f46-806883fb7167',
  staging: '5c46a14f-87ee-44df-b81e-389f1a691dae',
  production: '65809bbb-4798-410d-9cf4-2c9fa4720c08',
};

/**
 * Get the SDK key for the current environment
 */
export const getSDKKey = (): string => {
  const env = getCurrentEnvironment();
  return SDK_KEYS[env];
};

/**
 * Environment display names and colors for UI
 */
export const ENVIRONMENT_CONFIG = {
  development: {
    name: 'Development',
    color: '#4CAF50',
    description: 'Local development environment with all features enabled',
  },
  staging: {
    name: 'Staging',
    color: '#FF9800',
    description: 'Pre-production environment for testing',
  },
  production: {
    name: 'Production',
    color: '#F44336',
    description: 'Live production environment',
  },
};

/**
 * Get configuration for the current environment
 */
export const getEnvironmentConfig = () => {
  const env = getCurrentEnvironment();
  return {
    environment: env,
    ...ENVIRONMENT_CONFIG[env],
  };
};
