import cbLogo from './assets/CB-stacked-logo-full-color.svg'
import './App.css'
import { useFeatureFlags } from './feature-management'
import { LoadingIndicator } from './LoadingIndicator.tsx'
import { useFeatureFlag } from './useFeatureFlag.ts'
import { flags } from './feature-management/flags.ts'

function App() {
  const featureFlags = useFeatureFlags()

  const flagUsingCustomHook = useFeatureFlag(flags.namespace.namespacedFlag)

  if (featureFlags.loading) {
    return (
      <div className="position-relative pb-9">
        <LoadingIndicator />
      </div>
    )
  }

  return (
    <>
      <h1>CloudBees feature management React sample application</h1>
      <div className="card">
        {featureFlags.showMessage.isEnabled() && (
          <p
            style={{
              color: featureFlags.fontColor.getValue(),
              fontSize: featureFlags.fontSize.getValue(),
            }}
          >
            {featureFlags.message.getValue()}
          </p>
        )}
        {flagUsingCustomHook ? (
          <p
            style={{
              color: featureFlags.fontColor.getValue(),
              fontSize: featureFlags.fontSize.getValue(),
            }}
          >
            This should only show if flagUsingCustomHook is true
          </p>
        ) : (
          <p
            style={{
              color: featureFlags.fontColor.getValue(),
              fontSize: featureFlags.fontSize.getValue(),
            }}
          >
            This should only show if flagUsingCustomHook is false
          </p>
        )}
      </div>

      <div className="card">
        <p className="access-platform">
          Sign in to the CloudBees platform below to modify flag values and see
          the changes reflected automatically in this application.
        </p>
        <a href="https://cloudbees.io" target="_blank">
          <img src={cbLogo} className="logo" alt="CloudBees logo" />
        </a>
      </div>
    </>
  )
}

export default App
