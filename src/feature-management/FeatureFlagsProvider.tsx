import React, {useEffect, useState} from "react";
import Rox from "rox-browser";
import {flags} from "./flags.ts";
import {FeatureFlagsContext, useFeatureFlags} from "./index.ts";

// TODO: insert your SDK Key from https://cloudbees.io/ here.
const sdkKey = '<INSERT YOUR SDK KEY HERE>'

type Props = {
  children?: React.ReactNode
};

export const FeatureFlagsProvider = ({children} : Props): React.ReactNode => {

  const [flagState, setFlagState] = useState(useFeatureFlags())

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

      // Easy to forget to insert your SDK key where shown above, so let's check & remind you!
      if (sdkKey === '<INSERT YOUR SDK KEY HERE>') {
        throw new Error("You haven't yet inserted your SDK Key into FeatureFlagsProvider.tsx! Feature Flag values will not update until you do so.\nPlease check the README.md for instructions.")
      }

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

    initFeatureFlags().catch((e) => {
      console.error(e.message)
      window.alert(e.message)
      setFlagState({...flagState, loading: false})
    })

  }, [flagState])

  return <FeatureFlagsContext.Provider value={flagState}>{children}</FeatureFlagsContext.Provider>;
}
