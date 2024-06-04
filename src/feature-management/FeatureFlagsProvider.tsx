import React, {useEffect, useState} from "react";
import Rox from "rox-browser";
import {flags} from "./flags.ts";
import {FeatureFlagsContext, initialFlagState} from "./index.ts";

// TODO: insert your SDK Key from https://cloudbees.io/ here.
const sdkKey = '<INSERT YOUR SDK KEY HERE>'

type Props = {
  children?: React.ReactNode
};

export const FeatureFlagsProvider = ({children} : Props): React.ReactNode => {


  const [flagState, setFlagState] = useState(initialFlagState)

  const initialised = React.useRef(false)

  useEffect(() => {
    // Prevent multiple initialisations if the component re-renders in React strict mode.
    if (initialised.current) {
      return
    }
    initialised.current = true

    setFlagState({...flagState, loading: true})

    Rox.register('', flags)

    const initFeatureFlags = async() => {
      await Rox.setup(sdkKey, {
        configurationFetchedHandler(fetcherResult: Rox.RoxFetcherResult) {
          if (fetcherResult.fetcherStatus === "APPLIED_FROM_NETWORK") {
            setFlagState({
              ...flagState,
            })
          }
        }
      })

      setFlagState({...flagState, loading: false})
    }

    initFeatureFlags()

  }, [flagState])

  return <FeatureFlagsContext.Provider value={flagState}>{children}</FeatureFlagsContext.Provider>;
}
