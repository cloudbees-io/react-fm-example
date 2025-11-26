import React, {useEffect, useState} from "react";
import Rox from "rox-browser";
import {flags} from "./flags.ts";
import {FeatureFlagsContext, initialFlagState} from "./index.ts";

// TODO: insert your SDK key from https://cloudbees.io/ below.
const sdkKey = '65809bbb-4798-410d-9cf4-2c9fa4720c08'

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

    setFlagState({...flags, loading: true})

    // Register all flags with Rox
    // In this example, we're using an empty namespace, but you could organize
    // flags into namespaces like 'premium', 'ui', 'beta', etc.
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
            // Update state to trigger re-render when flags change
            setFlagState({
              ...flags,
              loading: false
            })
          }
        }
      })

      setFlagState({...flags, loading: false})
    }

    initFeatureFlags().catch((e) => {
      console.error(e.message)
      setError(e.message)
      setFlagState({...flags, loading: false})
    })

  }, [])

  return (
    <FeatureFlagsContext.Provider value={flagState}>
      {error && (
        <h3 style={{color: 'red'}}>{error}</h3>
      )}

      {children}
    </FeatureFlagsContext.Provider>
  )
}
