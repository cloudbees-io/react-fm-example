import {Flag, RoxString, RoxNumber} from "rox-browser";

/**
 * FEATURE FLAGS CONTAINER
 *
 * Contains feature toggles and content-related flags.
 * Registered to the default namespace (empty string).
 */
export const featureFlags = {
  // Boolean flag - Controls whether the message is displayed
  // Default: true (message shown)
  showMessage: new Flag(),

  // String flag - The message text to display
  // Default: 'This is the default message; try changing some flag values!'
  message: new RoxString('This is the default message; try changing some flag values!'),

  /**
   * FLAG FREEZE EXAMPLE
   *
   * This flag demonstrates the freeze functionality.
   * When frozen, the flag won't update automatically when configuration changes.
   *
   * Freeze Levels:
   * - "none": Updates immediately (default behavior)
   * - "untilForeground": Frozen until app comes to foreground (for mobile apps only)
   * - "untilLaunch": Frozen until explicitly unfrozen
   *
   * Use cases:
   * - Prevent UI changes during critical user flows
   * - Maintain consistency during multi-step processes
   * - Control when feature changes take effect
   *
   * Check the browser console to see freeze/unfreeze logs.
   */
  frozenFlag: new Flag(false, { freeze: "untilLaunch" as any }),
}

/**
 * UX FLAGS CONTAINER
 *
 * Contains UI/UX configuration flags for styling and appearance.
 * Registered to the 'ux' namespace.
 */
export const uxFlags = {
  // String flag with options - Font color for the message
  // Options: 'Red', 'Green', 'Blue', 'Black', 'Yellow'
  // Default: 'Yellow'
  fontColor: new RoxString('Yellow', ['Red', 'Green', 'Blue', 'Black', 'Yellow']),

  // Number flag with options - Font size in pixels
  // Options(variants): 12, 16, 24
  // Default: 16
  fontSize: new RoxNumber(16, [12, 16, 24]),
}

// Combined type for all flags
type IAllFlags = {
  featureFlags: typeof featureFlags;
  uxFlags: typeof uxFlags;
}

export interface IFeatureFlagsState extends IAllFlags {
  loading: boolean;
}
