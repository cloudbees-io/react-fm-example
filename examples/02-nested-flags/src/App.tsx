import cbLogo from './assets/CB-stacked-logo-full-color.svg'
import './App.css'
import {useFeatureFlags} from "./feature-management";
import {LoadingIndicator} from "./LoadingIndicator.tsx";
import {NotificationsSection} from "./components/NotificationsSection.tsx";

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
      <h1>Nested Flags Example</h1>

      <div className="card">
        <h2>About This Example</h2>
        <p>
          This example demonstrates <strong>nested flag configurations</strong> using a simple
          notifications system. You'll learn how:
        </p>
        <ul style={{textAlign: 'left', margin: '0 auto', maxWidth: '600px'}}>
          <li><strong>Master Flag</strong> - One flag (<code>enableNotifications</code>) controls the entire system</li>
          <li><strong>Child Flags</strong> - Individual channels (Email, Push, SMS) only work when master is enabled</li>
          <li><strong>Shared Config</strong> - One setting (<code>notificationFrequency</code>) applies to all enabled channels</li>
          <li><strong>Helper Functions</strong> - Check both master AND child flags in your code</li>
        </ul>
        <p style={{marginTop: '1rem'}}>
          <strong>Try it:</strong> In the CloudBees platform, toggle <code>enableNotifications</code> OFF
          and watch how all notification channels become unavailable, regardless of their individual settings.
          Then turn it back ON and enable/disable individual channels!
        </p>
      </div>

      {/* Notifications Section */}
      <NotificationsSection />

      <div className="card">
        <p className="access-platform">
          Sign in to the CloudBees platform below to modify flag values and see
          the nested relationships in action.
        </p>
        <a href="https://cloudbees.io" target="_blank">
          <img src={cbLogo} className="logo" alt="CloudBees logo"/>
        </a>
      </div>

    </>
  )
}

export default App
