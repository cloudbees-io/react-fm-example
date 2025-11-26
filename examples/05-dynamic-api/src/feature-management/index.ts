import {createContext, useContext} from "react";

/**
 * Feature Flags Context
 *
 * For Dynamic API, we only track loading state.
 * We don't need to pass flag instances through context since we access them
 * directly via Rox.dynamicApi methods.
 */

export interface IFeatureFlagsState {
  loading: boolean;
}

export const initialFlagState: IFeatureFlagsState = {
  loading: true,
}

export const FeatureFlagsContext = createContext<IFeatureFlagsState>(initialFlagState)

/**
 * Hook to access feature flags state
 */
export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagsContext)
  if (!context) {
    throw new Error('useFeatureFlags must be used within FeatureFlagsProvider')
  }
  return context
}

export { FeatureFlagsProvider } from './FeatureFlagsProvider'
export { flagsCatalog, getFlagConfig, getFlagsByType } from './flags-config'
export type { FlagConfig } from './flags-config'
