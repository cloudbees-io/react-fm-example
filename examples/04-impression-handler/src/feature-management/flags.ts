import {Flag, RoxString, RoxNumber} from "rox-browser";

/**
 * Impression Handler Example Flags
 *
 * Simple flags to demonstrate impression tracking.
 * Every time a flag is evaluated (.isEnabled() or .getValue()),
 * the impression handler in FeatureFlagsProvider.tsx is triggered.
 */

export const flags = {
  /**
   * Dark Mode Toggle
   * Enables dark theme for the application
   */
  enableDarkMode: new Flag(false),

  /**
   * Language Selection
   * Application language/locale
   */
  language: new RoxString('en', ['en', 'es', 'fr', 'de']),

  /**
   * Refresh Interval
   * How often to refresh data (in seconds)
   */
  refreshInterval: new RoxNumber(30, [10, 30, 60]),
};

/**
 * Type for the flags state
 */
export type FlagsState = typeof flags;

export interface IFeatureFlagsState extends FlagsState {
  loading: boolean;
}

/**
 * Get a readable description for each flag
 * Useful for documentation and UI display
 */
export const flagDescriptions: Record<keyof typeof flags, string> = {
  enableDarkMode: 'Toggle dark theme for the application',
  language: 'Application language/locale',
  refreshInterval: 'Data refresh interval in seconds',
};
