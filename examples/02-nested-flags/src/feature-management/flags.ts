import {Flag, RoxString} from "rox-browser";

/**
 * Nested Flags Example
 *
 * This example demonstrates hierarchical flag configurations where:
 * 1. A master/container flag controls access to a group of related features
 * 2. Child flags are only relevant when the master flag is enabled
 * 3. Shared configuration applies to all enabled child features
 *
 * In this example, we use a Notifications system to demonstrate the pattern.
 */

type IFeatureFlags = typeof flags

export interface IFeatureFlagsState extends IFeatureFlags {
  loading: boolean;
}

export const flags = {
  // ===== NOTIFICATIONS SYSTEM =====

  /**
   * Master Flag: enableNotifications
   * Controls the entire notification system
   * When OFF, no notifications should be sent regardless of child flag settings
   */
  enableNotifications: new Flag(true),

  /**
   * Child Flags: Individual notification channels
   * These are only relevant when enableNotifications is ON
   */
  emailNotifications: new Flag(true),
  pushNotifications: new Flag(false),
  smsNotifications: new Flag(false),

  /**
   * Shared Configuration: notificationFrequency
   * This setting applies to ALL enabled notification channels
   * Demonstrates how to have shared config across child features
   */
  notificationFrequency: new RoxString('immediate', ['immediate', 'hourly', 'daily', 'weekly']),
}

/**
 * Helper function to check if a specific notification type should be active
 *
 * This demonstrates how to implement nested flag logic in your application.
 * Always check the master flag first, then the child flag.
 *
 * @param notificationFlag - The child notification flag to check
 * @returns true if both master flag AND child flag are enabled
 */
export const shouldShowNotificationType = (notificationFlag: Flag): boolean => {
  return flags.enableNotifications.isEnabled() && notificationFlag.isEnabled();
}
