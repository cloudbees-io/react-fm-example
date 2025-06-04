import { createContext, useContext } from 'react'
import { namespaceFlags, IFeatureFlagsState } from './flags.ts'

export const initialFlagState: IFeatureFlagsState = {
  ...namespaceFlags,
  loading: false,
}

export const FeatureFlagsContext = createContext(initialFlagState)

export const useFeatureFlags: () => IFeatureFlagsState = () =>
  useContext(FeatureFlagsContext)
