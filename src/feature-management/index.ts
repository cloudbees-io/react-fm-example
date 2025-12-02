import {createContext, useContext} from "react";
import {featureFlags, uxFlags, IFeatureFlagsState} from "./flags.ts";

export const initialFlagState: IFeatureFlagsState = {
  featureFlags,
  uxFlags,
  loading: false
}

export const FeatureFlagsContext = createContext(initialFlagState);

export const useFeatureFlags: () => IFeatureFlagsState = () => useContext(FeatureFlagsContext);