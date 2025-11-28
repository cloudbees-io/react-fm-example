import {Flag, RoxString, RoxNumber} from "rox-browser";

/**
 * STATIC API FLAGS
 *
 * These flags are pre-registered with the Rox SDK.
 * They must be defined here and registered in FeatureFlagsProvider.tsx before calling Rox.setup()
 *
 * Benefits of Static API:
 * - Type safety and autocompletion in your IDE
 * - Centralized flag definitions
 * - Easy to track all flags used in your application
 * - Best for flags known at compile time
 *
 * How to use:
 * 1. Define flags here using Flag, RoxString, or RoxNumber
 * 2. Register them with Rox.register() in FeatureFlagsProvider.tsx
 * 3. Access them via useFeatureFlags() hook in components
 *
 * Note: For flags that need to be accessed dynamically (e.g., flag names from API),
 * use the Dynamic API instead: Rox.dynamicApi.isEnabled(), Rox.dynamicApi.value(), etc.
 * See App.tsx for Dynamic API examples.
 */

type IFeatureFlags = typeof flags

export interface IFeatureFlagsState extends IFeatureFlags {
  loading: boolean;
}

export const flags = {
  // Boolean flag - Controls whether the message is displayed
  // Default: true (message shown)
  showMessage: new Flag(),

  // String flag - The message text to display
  // Default: 'This is the default message; try changing some flag values!'
  message: new RoxString('This is the default message; try changing some flag values!'),

  // String flag with options - Font color for the message
  // Options: 'Red', 'Green', 'Blue', 'Black', 'Yellow'
  // Default: 'Yellow'
  fontColor: new RoxString('Yellow', ['Red', 'Green', 'Blue', 'Black', 'Yellow']),

  // Number flag with options - Font size in pixels
  // Options(variants): 12, 16, 24
  // Default: 16
  fontSize: new RoxNumber(16, [12, 16, 24]),

  /**
   * FLAG FREEZE EXAMPLE
   *
   * This flag demonstrates the freeze functionality.
   * When frozen, the flag won't update automatically when configuration changes.
   *
   * Freeze Levels:
   * - "none": Updates immediately (default behavior)
   * - "untilForeground": Frozen until app comes to foreground (mobile apps)
   * - "untilLaunch": Frozen until explicitly unfrozen
   *
   * Use cases:
   * - Prevent UI changes during critical user flows (checkout, payment)
   * - Maintain consistency during multi-step processes
   * - Control when feature changes take effect
   *
   * Check the browser console to see freeze/unfreeze logs.
   */
  frozenFlag: new Flag(false, { freeze: "untilLaunch" as any }),
}
