import { Flag, RoxString, RoxNumber } from 'rox-browser'

type IFeatureFlags = typeof namespaceFlags

export interface IFeatureFlagsState extends IFeatureFlags {
  loading: boolean
}

export const namespaceFlags = {
  namespace: {
    namespacedFlag: new Flag(),
  },
  routes: {
    home: new Flag(true),
  },
  default: {
    // Boolean - should the message be shown?
    showMessage: new Flag(),
    // String - the message to show.
    message: new RoxString(
      'This is the default message; try changing some flag values!'
    ),
    // String (with options) - the color of the message text.
    fontColor: new RoxString('White', ['Red', 'Green', 'Blue', 'Black']),
    // Number (with options) - the size of the message text.
    fontSize: new RoxNumber(24, [12, 16, 24]),
  },
}