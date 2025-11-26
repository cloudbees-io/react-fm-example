import React, {useEffect, useState} from "react";
import Rox from "rox-browser";
import {flags} from "./flags.ts";
import {FeatureFlagsContext, initialFlagState} from "./index.ts";
import {loadUserContext, UserContext} from "../utils/user-context.ts";
import {trackFlagImpression} from "../utils/analytics.ts";

// TODO: insert your SDK key from https://cloudbees.io/ below.
const sdkKey = '65809bbb-4798-410d-9cf4-2c9fa4720c08'

type Props = {
  children?: React.ReactNode
};

export const FeatureFlagsProvider = ({children} : Props): React.ReactNode => {

  const [flagState, setFlagState] = useState(initialFlagState)
  const [error, setError] = useState<string | undefined>(undefined)
  const [userContext, setUserContext] = useState<UserContext | null>(null)

  const initialised = React.useRef(false)

  useEffect(() => {
    // Prevent multiple initialisations if the component re-renders in React strict mode.
    if (initialised.current) {
      return
    }
    initialised.current = true

    setFlagState({...flags, loading: true})

    // Load user context
    const user = loadUserContext();
    setUserContext(user);

    /**
     * Set up custom properties for targeting
     * These properties can be used in the CloudBees UI to target specific users
     */
    Rox.setCustomStringProperty('userId', user.userId);
    Rox.setCustomStringProperty('email', user.email);
    Rox.setCustomStringProperty('userTier', user.userTier);
    Rox.setCustomNumberProperty('accountAge', user.accountAge);
    Rox.setCustomStringProperty('country', user.country);
    Rox.setCustomBooleanProperty('betaTester', user.betaTester);
    Rox.setCustomNumberProperty('featureUsageCount', user.featureUsageCount);

    console.log('🎯 Custom properties set:', user);

    // Register all flags
    Rox.register('', flags)

    const initFeatureFlags = async() => {

      // Easy to forget to insert your SDK key where shown above, so let's check & remind you!
      // @ts-ignore
      if (sdkKey === '<YOUR-SDK-KEY>') {
        throw new Error("You haven't yet inserted your SDK key into FeatureFlagsProvider.tsx. Please check the README.md for instructions.")
      }

      await Rox.setup(sdkKey, {
        configurationFetchedHandler(fetcherResult: Rox.RoxFetcherResult) {
          if (fetcherResult.fetcherStatus === "APPLIED_FROM_NETWORK") {
            console.log('✅ Feature flags updated from CloudBees platform');
            // Update state to trigger re-render when flags change
            setFlagState({
              ...flags,
              loading: false
            })
          } else if (fetcherResult.fetcherStatus === "APPLIED_FROM_EMBEDDED") {
            console.log('📦 Using default flag values');
          }
        },
        // Impression handler to track flag evaluations for analytics
        // This is called every time a flag is evaluated
        impressionHandler(reportingValue: any, _context: any) {
          trackFlagImpression({
            flagName: reportingValue.name || 'unknown',
            flagValue: reportingValue.value,
            timestamp: new Date(),
            userId: user.userId,
            context: {
              userTier: user.userTier,
              country: user.country,
              betaTester: user.betaTester,
            },
          });
        },
        // Optional: Fetch flags more frequently for demo purposes
        // In production, the default (60 seconds) is usually fine
        // fetchInterval: 30,
      })

      console.log('📊 Impression handler configured');

      console.log('🚀 Feature flags initialized successfully');
      console.log(`👤 User: ${user.email} (${user.userTier})`);
      setFlagState({...flags, loading: false})
    }

    initFeatureFlags().catch((e) => {
      console.error('❌ Failed to initialize feature flags:', e.message)
      setError(e.message)
      setFlagState({...flags, loading: false})
    })

  }, [])

  return (
    <FeatureFlagsContext.Provider value={flagState}>
      {error && (
        <div style={{padding: '1rem', margin: '1rem', backgroundColor: '#ffebee', border: '1px solid #f44336', borderRadius: '4px', color: '#000'}}>
          <h3 style={{color: '#f44336', margin: '0 0 0.5rem 0'}}>Feature Flags Error</h3>
          <p style={{margin: 0}}>{error}</p>
        </div>
      )}

      {userContext && (
        <div style={{padding: '0.75rem', margin: '1rem', backgroundColor: '#e3f2fd', border: '1px solid #2196F3', borderRadius: '4px', fontSize: '0.9rem', color: '#000'}}>
          <strong>👤 Current User:</strong> {userContext.email} |
          <strong> Tier:</strong> {userContext.userTier} |
          <strong> Country:</strong> {userContext.country} |
          <strong> Beta Tester:</strong> {userContext.betaTester ? 'Yes' : 'No'}
        </div>
      )}

      {children}
    </FeatureFlagsContext.Provider>
  )
}
