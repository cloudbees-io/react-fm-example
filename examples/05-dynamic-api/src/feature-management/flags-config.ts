/**
 * Flags Configuration
 *
 * This configuration file demonstrates how to define flags for use with the Dynamic API.
 * Unlike the static API where you pre-create Flag instances, here you just define
 * the flag names and default values that will be accessed dynamically at runtime.
 */

export interface FlagConfig {
  name: string;
  type: 'boolean' | 'string' | 'number';
  defaultValue: boolean | string | number;
  description: string;
  options?: (string | number)[];
}

/**
 * Feature Catalog
 *
 * In a real application, this could be loaded from:
 * - A remote API
 * - A JSON configuration file
 * - A database
 * - Environment variables
 */
export const flagsCatalog: FlagConfig[] = [
  // Boolean Flag
  {
    name: 'enableDarkMode',
    type: 'boolean',
    defaultValue: false,
    description: 'Enable dark theme for the application',
  },

  // String Flag
  {
    name: 'language',
    type: 'string',
    defaultValue: 'en',
    description: 'Application language',
    options: ['en', 'es', 'fr', 'de'],
  },

  // Number Flag
  {
    name: 'maxRetries',
    type: 'number',
    defaultValue: 3,
    description: 'Maximum number of retry attempts',
    options: [1, 3, 5, 10],
  },
];

/**
 * Helper function to get a flag config by name
 */
export const getFlagConfig = (flagName: string): FlagConfig | undefined => {
  return flagsCatalog.find(flag => flag.name === flagName);
};

/**
 * Helper function to get flags by type
 */
export const getFlagsByType = (type: 'boolean' | 'string' | 'number'): FlagConfig[] => {
  return flagsCatalog.filter(flag => flag.type === type);
};
