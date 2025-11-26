import React, {useEffect, useState} from "react";
import Rox from "rox-browser";
import {FeatureFlagsContext} from "./index.ts";

// TODO: insert your SDK key from https://cloudbees.io/ below.
const sdkKey = '65809bbb-4798-410d-9cf4-2c9fa4720c08'

type Props = {
  children?: React.ReactNode
};

export const FeatureFlagsProvider = ({children} : Props): React.ReactNode => {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | undefined>(undefined)
  const [, setRefresh] = useState(0)

  const initialised = React.useRef(false)

  useEffect(() => {
    // Prevent multiple initialisations if the component re-renders in React strict mode.
    if (initialised.current) {
      return
    }
    initialised.current = true

    const initFeatureFlags = async() => {

      // Easy to forget to insert your SDK key where shown above, so let's check & remind you!
      // @ts-ignore
      if (sdkKey === '<YOUR-SDK-KEY>') {
        throw new Error("You haven't yet inserted your SDK key into FeatureFlagsProvider.tsx. Please check the README.md for instructions.")
      }

      /**
       * IMPORTANT: For Dynamic API, we don't need to register any flags!
       *
       * Unlike the static API where you call:
       *   Rox.register('', flags)
       *
       * With Dynamic API, you just call setup() and then access flags by name.
       * This is the key difference - no pre-registration required!
       */

      await Rox.setup(sdkKey, {
        configurationFetchedHandler(fetcherResult: Rox.RoxFetcherResult) {
          if (fetcherResult.fetcherStatus === "APPLIED_FROM_NETWORK") {
            console.log('✅ Feature flags updated from CloudBees platform');
            // Trigger re-render when flags change
            setRefresh(prev => prev + 1)
            setLoading(false)
          } else if (fetcherResult.fetcherStatus === "APPLIED_FROM_EMBEDDED") {
            console.log('📦 Using default flag values');
          }
        },
      })

      console.log('🚀 Feature flags initialized successfully (Dynamic API mode)');
      console.log('💡 Flags can now be accessed using Rox.dynamicApi methods');
      setLoading(false)
    }

    initFeatureFlags().catch((e) => {
      console.error('❌ Failed to initialize feature flags:', e.message)
      setError(e.message)
      setLoading(false)
    })

  }, [])

  return (
    <FeatureFlagsContext.Provider value={{ loading }}>
      {error && (
        <div style={{padding: '1rem', margin: '1rem', backgroundColor: '#ffebee', border: '1px solid #f44336', borderRadius: '4px', color: '#000'}}>
          <h3 style={{color: '#f44336', margin: '0 0 0.5rem 0'}}>Feature Flags Error</h3>
          <p style={{margin: 0}}>{error}</p>
        </div>
      )}

      {children}
    </FeatureFlagsContext.Provider>
  )
}
