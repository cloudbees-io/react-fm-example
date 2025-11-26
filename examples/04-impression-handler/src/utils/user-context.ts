/**
 * User Context and Custom Properties
 *
 * This module defines custom properties used for targeting and A/B testing.
 * Custom properties allow you to target specific users based on attributes
 * like user tier, location, account age, etc.
 */

export interface UserContext {
  userId: string;
  email: string;
  userTier: 'free' | 'pro' | 'enterprise';
  accountAge: number; // days since account creation
  country: string;
  betaTester: boolean;
  featureUsageCount: number;
}

/**
 * Generate a sample user for demonstration
 * In a real app, this would come from your authentication/user service
 */
export const generateSampleUser = (): UserContext => {
  const tiers: Array<'free' | 'pro' | 'enterprise'> = ['free', 'pro', 'enterprise'];
  const countries = ['US', 'UK', 'CA', 'DE', 'FR', 'JP', 'AU'];

  return {
    userId: `user-${Math.random().toString(36).substr(2, 9)}`,
    email: `user${Math.floor(Math.random() * 1000)}@example.com`,
    userTier: tiers[Math.floor(Math.random() * tiers.length)],
    accountAge: Math.floor(Math.random() * 365), // 0-365 days
    country: countries[Math.floor(Math.random() * countries.length)],
    betaTester: Math.random() > 0.7, // 30% are beta testers
    featureUsageCount: Math.floor(Math.random() * 100),
  };
};

/**
 * Store user context in localStorage for persistence across page reloads
 */
export const saveUserContext = (user: UserContext): void => {
  localStorage.setItem('userContext', JSON.stringify(user));
};

/**
 * Load user context from localStorage, or generate new if none exists
 */
export const loadUserContext = (): UserContext => {
  const stored = localStorage.getItem('userContext');
  if (stored) {
    return JSON.parse(stored);
  }

  const newUser = generateSampleUser();
  saveUserContext(newUser);
  return newUser;
};

/**
 * Update specific properties of user context
 */
export const updateUserContext = (updates: Partial<UserContext>): UserContext => {
  const current = loadUserContext();
  const updated = { ...current, ...updates };
  saveUserContext(updated);
  return updated;
};

/**
 * Clear user context (useful for testing different user scenarios)
 */
export const clearUserContext = (): void => {
  localStorage.removeItem('userContext');
};
