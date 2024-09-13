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

    Rox.register('', flags)

    const initFeatureFlags = async() => {

      // Easy to forget to insert your SDK key where shown above, so let's check & remind you!
      if (sdkKey === '<YOUR-SDK-KEY>') {
        throw new Error("You haven't yet inserted your SDK key into FeatureFlagsProvider.tsx - the application below will not update until you do so. Please check the README.adoc for instructions.")
      }

      await Rox.setup(sdkKey, {
        configurationFetchedHandler(fetcherResult: Rox.RoxFetcherResult) {
          if (fetcherResult.fetcherStatus === "APPLIED_FROM_NETWORK") {
            setFlagState({
              ...flagState,
            })
          }
        },
        disableSignatureVerification: true,
        selfManaged : {
          configurationURL: "https://api.vpc-install-test.saas-tools.beescloud.com/device/get_configuration",
          serverURL: "https://rox-conf.vpc-install-test.saas-tools.beescloud.com",
          stateURL: "https://api.vpc-install-test.saas-tools.beescloud.com/device/update_state_store/",          
          analyticsURL: "https://fm-analytics.vpc-install-test.saas-tools.beescloud.com",
          pushUpdateURL: "https://sdk-notification-service.vpc-install-test.saas-tools.beescloud.com/sse",
        }
      })

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
