import { useMemo } from 'react'
import { type RoxNumber, type RoxString, Flag } from 'rox-browser'

type FlagValue<T> = T extends Flag
  ? boolean
  : T extends RoxString
  ? string
  : T extends RoxNumber
  ? number
  : never

export const useFeatureFlag = <T extends Flag | RoxString | RoxNumber>(
  flag: T
) =>
  useMemo<FlagValue<T>>(() => {
    if (flag instanceof Flag) {
      return flag.isEnabled() as FlagValue<T>
    } else {
      return flag.getValue() as FlagValue<T>
    }
  }, [flag])
