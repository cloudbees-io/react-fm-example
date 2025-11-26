/**
 * Analytics Integration
 *
 * This module demonstrates how to integrate feature flag impressions
 * with analytics services. In production, you would send this data to
 * services like Google Analytics, Amplitude, Mixpanel, etc.
 */

export interface FlagImpression {
  flagName: string;
  flagValue: boolean | string | number;
  timestamp: Date;
  userId?: string;
  context?: Record<string, any>;
}

/**
 * In-memory store for demo purposes
 * In production, this would be sent to an analytics service
 */
const impressions: FlagImpression[] = [];

/**
 * Track a flag impression
 */
export const trackFlagImpression = (impression: FlagImpression): void => {
  impressions.push(impression);

  // In production, you would send to analytics service:
  // analytics.track('Feature Flag Viewed', {
  //   flag: impression.flagName,
  //   value: impression.flagValue,
  //   userId: impression.userId,
  //   ...impression.context,
  // });

  console.log('📊 Flag Impression:', impression);
};

/**
 * Get all tracked impressions (for demo/debugging)
 */
export const getImpressions = (): FlagImpression[] => {
  return [...impressions];
};

/**
 * Clear impressions (for demo purposes)
 */
export const clearImpressions = (): void => {
  impressions.length = 0;
};

/**
 * Get impression count for a specific flag
 */
export const getImpressionCount = (flagName: string): number => {
  return impressions.filter(i => i.flagName === flagName).length;
};

/**
 * Get impressions grouped by flag value (useful for A/B test results)
 */
export const getImpressionsByValue = (flagName: string): Record<string, number> => {
  const flagImpressions = impressions.filter(i => i.flagName === flagName);
  const grouped: Record<string, number> = {};

  flagImpressions.forEach(impression => {
    const value = String(impression.flagValue);
    grouped[value] = (grouped[value] || 0) + 1;
  });

  return grouped;
};

/**
 * Calculate conversion rate for an A/B test
 * This is a simplified example - in production you'd track actual conversions
 */
export const calculateABTestResults = (flagName: string) => {
  const byValue = getImpressionsByValue(flagName);
  const total = Object.values(byValue).reduce((sum, count) => sum + count, 0);

  return Object.entries(byValue).map(([value, count]) => ({
    variant: value,
    impressions: count,
    percentage: total > 0 ? ((count / total) * 100).toFixed(1) : '0',
  }));
};
