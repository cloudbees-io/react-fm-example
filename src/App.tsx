import cbLogo from './assets/CB-stacked-logo-full-color.svg'
import './App.css'
import {useFeatureFlags} from "./feature-management";
import {LoadingIndicator} from "./LoadingIndicator.tsx";

function App() {

  const featureFlags = useFeatureFlags()

  if (featureFlags.loading) {
    return (
      <div className="position-relative pb-9">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <>
      <h1>CloudBees Feature Management React sample application</h1>
      <div className="card">
        {featureFlags.showMessage.isEnabled() && (
          <p style={{color: featureFlags.fontColor.getValue()}}>
            {featureFlags.message.getValue()}
          </p>
        )}
      </div>

      <div className="card">
        <p className="access-platform">
          Login to the CloudBees Platform below to modify flag values and see them update live in this application.
        </p>
        <a href="https://cloudbees.io" target="_blank">
          <img src={cbLogo} className="logo" alt="CloudBees logo"/>
        </a>
      </div>

    </>
  )
}

export default App
