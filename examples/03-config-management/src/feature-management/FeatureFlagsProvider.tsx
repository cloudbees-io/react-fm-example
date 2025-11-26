import React, {useEffect, useState} from "react";
import Rox from "rox-browser";
import {featuresFlags} from "./flags.ts";
import {FeatureFlagsContext, initialFlagState} from "./index.ts";
import {getSDKKey, getCurrentEnvironment} from "../config";

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

    setFlagState({
      features: featuresFlags,
      loading: true
    })

    /**
     * Register flags with namespaces
     * This organizes flags in the CloudBees platform UI:
     * - features.enableSearch
     * - features.enableAdvancedFilters
     * - features.enableExport
     * - features.maxExportRows
     * - features.enableCollaboration
     */
    Rox.register('features', featuresFlags)

    const initFeatureFlags = async() => {
      const environment = getCurrentEnvironment();
      const sdkKey = getSDKKey();

      console.log(`Initializing CloudBees Feature Management for environment: ${environment}`);

      // Check if SDK key is configured
      if (sdkKey.startsWith('<YOUR-')) {
        throw new Error(
          `You haven't yet inserted your SDK key for the ${environment} environment. ` +
          `Please check src/config/environment.ts and add your SDK keys.`
        );
      }

      await Rox.setup(sdkKey, {
        configurationFetchedHandler(fetcherResult: Rox.RoxFetcherResult) {
          if (fetcherResult.fetcherStatus === "APPLIED_FROM_NETWORK") {
            console.log('Feature flags updated from CloudBees platform');
            // Update state to trigger re-render when flags change
            setFlagState({
              features: featuresFlags,
              loading: false
            })
          } else if (fetcherResult.fetcherStatus === "APPLIED_FROM_EMBEDDED") {
            console.log('Using default flag values from configuration');
          }
        },
        // Optional: Custom fetch interval (in seconds)
        // fetchInterval: 60,
      })

      console.log('Feature flags initialized successfully');
      setFlagState({
        features: featuresFlags,
        loading: false
      })
    }

    initFeatureFlags().catch((e) => {
      console.error('Failed to initialize feature flags:', e.message)
      setError(e.message)
      setFlagState({
        features: featuresFlags,
        loading: false
      })
    })

  }, [])

  return (
    <FeatureFlagsContext.Provider value={flagState}>
      {error && (
        <div style={{padding: '1rem', margin: '1rem', backgroundColor: '#ffebee', border: '1px solid #f44336', borderRadius: '4px'}}>
          <h3 style={{color: '#f44336', margin: '0 0 0.5rem 0'}}>Feature Flags Error</h3>
          <p style={{margin: 0}}>{error}</p>
        </div>
      )}

      {children}
    </FeatureFlagsContext.Provider>
  )
}
