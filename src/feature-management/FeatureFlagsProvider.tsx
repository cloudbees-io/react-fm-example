import React, {useEffect, useState} from "react";
import Rox from "rox-browser";
import {flags} from "./flags.ts";
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
     * Types:
     * - setCustomStringProperty: For text values (userId, email, plan, etc.)
     * - setCustomNumberProperty: For numeric values (age, score, count, etc.)
     * - setCustomBooleanProperty: For true/false values (isPremium, isAdmin, etc.)
     * - setCustomDateProperty: For date/time values (registrationDate, lastLogin, etc.)
     *
     * Use in CloudBees platform:
     * Create targeting rules like:
     * - "Show feature if userTier = 'premium'"
     * - "Show feature if registrationDate > '2024-01-01'"
     */

    // String property example - User tier for subscription-based targeting
    Rox.setCustomStringProperty('userTier', () => {
      return 'premium'; // variants: 'free', 'premium', 'enterprise'
    });

    // Number property example - User account age in days
    Rox.setCustomNumberProperty('accountAgeInDays', () => {
      return 45; // User registered 45 days ago
    });

    // Boolean property example - Beta tester status
    Rox.setCustomBooleanProperty('isBetaTester', () => {
      return true;
    });

    // Date property example - User registration date
    Rox.setCustomDateProperty('registrationDate', () => {
      // In production, get this from user's actual registration date
      // Example: return new Date(user.registeredAt);
      return new Date('2024-01-15'); // User registered on Jan 15, 2024
    });


    /**
     * REGISTER: Register flags
     *
     * Register all pre-defined flags from flags.ts
     *
     * Note: Dynamic API flags do NOT need to be registered
     */
    Rox.register('', flags)

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
      //   flags.frozenFlag.unfreeze();
      //   console.log('Fetching latest configuration...');
      //   await Rox.fetch();
      //   console.log('frozenFlag now has the latest value from CloudBees:', flags.frozenFlag.isEnabled());
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
