import {createContext, useContext} from "react";
import {flags, IFeatureFlagsState} from "./flags.ts";

export const initialFlagState: IFeatureFlagsState = {
  ...flags,
  loading: true
}

export const FeatureFlagsContext = createContext<IFeatureFlagsState>(initialFlagState)

export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagsContext)
  if (!context) {
    throw new Error('useFeatureFlags must be used within a FeatureFlagsProvider')
  }
  return context
}
