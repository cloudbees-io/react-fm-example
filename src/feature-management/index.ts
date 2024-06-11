import {createContext, useContext} from "react";
import {flags, IFeatureFlagsState} from "./flags.ts";

export const initialFlagState: IFeatureFlagsState = {
  ...flags,
  loading: false
}

export const FeatureFlagsContext = createContext(initialFlagState);

export const useFeatureFlags: () => IFeatureFlagsState = () => useContext(FeatureFlagsContext);