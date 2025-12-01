import React, {useEffect, useState} from "react";
import Rox from "rox-browser";
import {featureFlags, uxFlags} from "./flags.ts";
import {FeatureFlagsContext, initialFlagState} from "./index.ts";

// TODO: insert your SDK key from https://cloudbees.io/ below.
const sdkKey = '<YOUR-SDK-KEY>'

type Props = {
  children?: React.ReactNode
};

export const FeatureFlagsProvider = ({children} : Props): React.ReactNode => {

  const [flagState, setFlagState] = useState(initialFlagState)
  const [error, setError] = useState<string | undefined>(undefined)

  const initialised = React.useRef(false)

  // Mock user object for some custome properties example.
  const user = {
    id: 'user-123',
    email: 'demo@example.com',
    tier: 'premium',           // subscription tier: 'free', 'premium', 'enterprise'
    signUpDate: new Date('2024-01-15'),
    isBetaTester: true,
  };

  useEffect(() => {
    // Prevent multiple initialisations if the component re-renders in React strict mode.
    if (initialised.current) {
      return
    }
    initialised.current = true

    setFlagState({...flagState, loading: true})

    /**
     * CUSTOM PROPERTIES
     *
     * Custom properties allow you to target specific users or segments in CloudBees platform.
     * Set these BEFORE calling Rox.setup() so they're available for targeting rules.
     *
     * Property Types:
     * - setCustomStringProperty: For text values (userId, email, plan, etc.)
     * - setCustomNumberProperty: For numeric values (age, score, count, etc.)
     * - setCustomBooleanProperty: For true/false values (isPremium, isAdmin, etc.)
     * - setCustomDateProperty: For date/time values (registrationDate, lastLogin, etc.)
     *
     * You can pass either:
     * - Direct values: Rox.setCustomStringProperty("country", "USA")
     * - Functions: Rox.setCustomStringProperty("userTier", () => user.tier)
     *
     * In this example, we're using a mock user object (defined above).
     *
     * Use in CloudBees platform to create targeting rules like:
     * - "Show feature if userTier = 'premium'"
     * - "Show feature if accountAgeInDays > 45"
     * - "Show feature if registrationDate > '2024-01-01'"
     */

    // String property - direct values
    Rox.setCustomStringProperty("country", "USA")

    // String property - User subscription tier for targeting premium features
    Rox.setCustomStringProperty('userTier', () => user.tier);

    // Number property - Calculate user account age in days
    // Example use cases: onboarding flows, feature unlocks based on tenure
    Rox.setCustomNumberProperty('accountAgeInDays', () => {
      const ageInMs = Date.now() - user.signUpDate.getTime();
      return Math.floor(ageInMs / (1000 * 60 * 60 * 24));
    });

    // Boolean property - Beta tester status for early feature access
    Rox.setCustomBooleanProperty('isBetaTester', () => user.isBetaTester);

    // Date property - User registration date for cohort-based targeting
    Rox.setCustomDateProperty('registrationDate', () => user.signUpDate);


    /**
     * REGISTER: Register flags with namespaces
     *
     * Namespaces help organize flags into logical groups.
     * - Default namespace (''): Feature toggles and content flags
     * - 'ux' namespace: UI/UX configuration flags
     *
     * When accessing namespaced flags:
     * - Static API: Use the imported flag container (e.g., uxFlags.fontSize)
     * - Dynamic API: Prefix with namespace (e.g., 'ux.fontSize')
     *
     * Note: Dynamic API flags do NOT need to be registered
     */
    Rox.register('', featureFlags)
    Rox.register('ux', uxFlags)

    const initFeatureFlags = async() => {

      // Easy to forget to insert your SDK key where shown above, so let's check & remind you!
      // @ts-ignore
      if (sdkKey === '<YOUR-SDK-KEY>') {
        throw new Error("You haven't yet inserted your SDK key into FeatureFlagsProvider.tsx - the application below will not update until you do so. Please check the README.adoc for instructions.")
      }

      /**
       * SETUP: Initialize the SDK
       *
       * Rox.setup() connects to CloudBees platform and fetches flag configurations
       * After this completes, both Static API and Dynamic API flags are ready to use
       */
      await Rox.setup(sdkKey, {
        // for debug SDK set debugLevel to 'verbose'
        // debugLevel: 'verbose',
        configurationFetchedHandler(fetcherResult: Rox.RoxFetcherResult) {
          if (fetcherResult.fetcherStatus === "APPLIED_FROM_NETWORK") {
            // Flag values updated from CloudBees platform
            // Trigger re-render to show new values
            setFlagState({
              ...flagState,
            })
          }
        },

        /**
         * IMPRESSION HANDLER
         *
         * This handler fires every time a flag is evaluated in your application.
         * - Fires when: .isEnabled(), .getValue(), or .getNumber() is called
         * - Use for: Analytics, tracking feature adoption, A/B testing results
         *
         * Common use cases:
         * - Send to analytics (Google Analytics, Mixpanel, Amplitude)
         * - Track which features users interact with
         * - Measure A/B test exposure and results
         * - Debug flag evaluations during development
         *
         * Note: Open your browser's Developer Console to see impressions logged in this example
         */
        impressionHandler(reportingValue: any, _context: any) {
          // Log to console for demonstration
          // In production, send this data to your analytics service
          console.log('Flag Impression:', {
            name: reportingValue.name,
            value: reportingValue.value,
            timestamp: new Date().toISOString()
          });

          // Example: Send to analytics service (uncomment in production)
          // analytics.track('Feature Flag Viewed', {
          //   flagName: reportingValue.name,
          //   flagValue: reportingValue.value,
          // });
        }
      })

      /**
       * FLAG FREEZE - Demonstration
       *
       * Uncomment the code below to see freeze/unfreeze in action:
       * After 10 seconds, it will unfreeze the flag and fetch new values.
       *
       * To test:
       * 1. Change frozenFlag value in CloudBees platform
       * 2. Notice it doesn't update (it's frozen)
       * 3. Uncomment code below and reload page
       * 4. After 10 seconds, the flag will unfreeze and fetch latest value
       */

      // setTimeout(async () => {
      //   console.log('Unfreezing frozenFlag...');
      //   featureFlags.frozenFlag.unfreeze();
      //   console.log('Fetching latest configuration...');
      //   await Rox.fetch();
      //   console.log('frozenFlag now has the latest value from CloudBees:', featureFlags.frozenFlag.isEnabled());
      // }, 10000);

      setFlagState({...flagState, loading: false})
    }

    initFeatureFlags().catch((e) => {
      console.error(e.message)
      setError(e.message)
      setFlagState({...flagState, loading: false})
    })

  }, [flagState])

  return (
    <FeatureFlagsContext.Provider value={flagState}>
      {error && (
        <h3 style={{color: 'red'}}>{error}</h3>
      )}

      {children}
    </FeatureFlagsContext.Provider>
  )
}
