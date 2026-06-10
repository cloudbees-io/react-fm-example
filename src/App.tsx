import cbLogo from './assets/CB-stacked-logo-full-color.svg'
import './App.css'
import {useFeatureFlags} from "./feature-management";
import {LoadingIndicator} from "./LoadingIndicator.tsx";

function App() {

  const flags = useFeatureFlags()

  if (flags.loading) {
    return (
      <div className="position-relative pb-9">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <>
      <h1>CloudBees feature management React sample application</h1>

      <div className="card">
        {/* Using Static API for showMessage (default namespace), message (default namespace), fontColor (ux namespace) */}
        {flags.featureFlags.showMessage.isEnabled() && (
          <p style={{color: flags.uxFlags.fontColor.getValue(), fontSize: 16}}>
            {flags.featureFlags.message.getValue()}
          </p>
        )}
      </div>

      <div className="card">
        <p className="access-platform">
          Sign in to the CloudBees platform below to modify flag values and see the changes reflected automatically in this application.
        </p>
        <a href="https://cloudbees.io" target="_blank">
          <img src={cbLogo} className="logo" alt="CloudBees logo"/>
        </a>
        <p style={{marginTop: '1.5rem', fontSize: '0.9rem', color: '#666'}}>
          Visit <a href="https://docs.cloudbees.com/docs/cloudbees-feature-management/latest/" target="_blank" rel="noopener noreferrer" style={{color: '#1976d2', textDecoration: 'underline'}}>CloudBees Feature Management Documentation</a> for more details.
        </p>
      </div>

    </>
  )
}

export default App
