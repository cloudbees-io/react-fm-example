import {Flag, RoxNumber} from "rox-browser";
import {getEnvironmentDefaults, getCurrentEnvironment} from "../config";

/**
 * Configuration-based Flags Example
 *
 * This example demonstrates:
 * - Organizing flags into namespaces (features)
 * - Loading default values from configuration files
 * - Environment-specific flag defaults
 * - Centralized flag management
 */

// Get defaults for the current environment
const defaults = getEnvironmentDefaults(getCurrentEnvironment());

/**
 * Features Namespace Flags
 * Controls application features
 */
export const featuresFlags = {
  enableSearch: new Flag(defaults.features.enableSearch),
  enableAdvancedFilters: new Flag(defaults.features.enableAdvancedFilters),
  enableExport: new Flag(defaults.features.enableExport),
  maxExportRows: new RoxNumber(
    defaults.features.maxExportRows,
    defaults.features.maxExportRowsOptions
  ),
  enableCollaboration: new Flag(defaults.features.enableCollaboration),
};

/**
 * Combined flags object for easy access
 */
export const flags = {
  features: featuresFlags,
};

/**
 * Type for the flags state
 */
export type FlagsState = typeof flags;

export interface IFeatureFlagsState extends FlagsState {
  loading: boolean;
}

/**
 * Helper function to get all flag values as a plain object
 * Useful for debugging or logging current flag states
 */
export const getFlagValues = () => {
  return {
    features: {
      enableSearch: featuresFlags.enableSearch.isEnabled(),
      enableAdvancedFilters: featuresFlags.enableAdvancedFilters.isEnabled(),
      enableExport: featuresFlags.enableExport.isEnabled(),
      maxExportRows: featuresFlags.maxExportRows.getValue(),
      enableCollaboration: featuresFlags.enableCollaboration.isEnabled(),
    },
  };
};
