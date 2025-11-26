import {Flag, RoxFlagFreezeLevel} from "rox-browser";

type IFeatureFlags = typeof flags

export interface IFeatureFlagsState extends IFeatureFlags {
  loading: boolean;
}

/**
 * Flag Freeze Examples
 *
 * This demonstrates the three freeze levels available in CloudBees Feature Management:
 * - None (default): Updates immediately when configuration changes
 * - UntilForeground: Frozen until app comes to foreground (mobile-focused)
 * - UntilLaunch: Frozen until explicitly unfrozen (mobile-focused)
 *
 * Note: In browser/web apps, UntilForeground and UntilLaunch require manual unfreezing
 */

export const flags = {
  // No freeze - updates automatically (default behavior)
  autoUpdateFlag: new Flag(false),

  // Frozen until explicitly unfrozen
  frozenFlag: new Flag(false, { freeze: RoxFlagFreezeLevel.UntilLaunch }),
}
