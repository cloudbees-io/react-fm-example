import cbLogo from './assets/CB-stacked-logo-full-color.svg'
import './App.css'
import {useFeatureFlags} from "./feature-management";
import {LoadingIndicator} from "./LoadingIndicator.tsx";
import Rox from "rox-browser";

function App() {

  const featureFlags = useFeatureFlags()

  if (featureFlags.loading) {
    return (
      <div className="position-relative pb-9">
        <LoadingIndicator />
      </div>
    );
  }

  // ===== DYNAMIC API EXAMPLES =====
  // You can configure them in the CloudBees platform just like static flags

  // Boolean flag using Dynamic API - Controls whether to show the dynamic message
  // Default: false (message hidden)
  const showDynamicMessage = Rox.dynamicApi.isEnabled('showDynamicMessage', false);

  // String flag using Dynamic API - The dynamic message text to display
  // Default: 'This is from dynamic API flags. Try changing some flag values!'
  const dynamicMessage = Rox.dynamicApi.value('dynamicMessage', 'This is from dynamic API flags. Try changing some flag values!');

  // String flag using Dynamic API - Font color for the dynamic message
  // Default: 'Green'
  const dynamicFontColor = Rox.dynamicApi.value('dynamicFontColor', 'Green');

  // Number flag using Dynamic API - Font size in pixels for the dynamic message
  // Default: 16
  const dynamicFontSize = Rox.dynamicApi.getNumber('dynamicFontSize', 16);

  return (
    <>
      <h1>CloudBees feature management React sample application</h1>

      <div className="card">
        {featureFlags.showMessage.isEnabled() && (
          <p style={{color: featureFlags.fontColor.getValue(), fontSize: featureFlags.fontSize.getValue()}}>
            {featureFlags.message.getValue()}
          </p>
        )}
      </div>

      <div className="card">
        {showDynamicMessage && (
          <p style={{color: dynamicFontColor, fontSize: dynamicFontSize}}>
            {dynamicMessage}
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
