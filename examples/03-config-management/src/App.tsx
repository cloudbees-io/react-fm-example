import cbLogo from './assets/CB-stacked-logo-full-color.svg'
import './App.css'
import {useFeatureFlags} from "./feature-management";
import {LoadingIndicator} from "./LoadingIndicator.tsx";
import {EnvironmentBanner} from "./components/EnvironmentBanner.tsx";
import {FeaturesConfigSection} from "./components/FeaturesConfigSection.tsx";
import {ConfigurationSummary} from "./components/ConfigurationSummary.tsx";

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
      <h1>Configuration Management Example</h1>

      {/* Show current environment */}
      <EnvironmentBanner />

      <div className="card">
        <h2>About This Example</h2>
        <p>
          This example demonstrates <strong>configuration-based feature management</strong> where
          flags are organized using namespaces and loaded from shared configuration files.
        </p>
        <ul style={{textAlign: 'left', margin: '0 auto', maxWidth: '700px'}}>
          <li><strong>Namespaces:</strong> Flags organized under the "features" namespace</li>
          <li><strong>Shared Configuration:</strong> Default values defined in reusable config files</li>
          <li><strong>Environment-Specific:</strong> Different defaults for dev, staging, and production</li>
          <li><strong>Type-Safe:</strong> TypeScript interfaces ensure configuration consistency</li>
          <li><strong>Export/Import:</strong> Easily share configurations across teams</li>
        </ul>
        <div style={{marginTop: '1rem', padding: '0.75rem', backgroundColor: '#fff3e0', borderRadius: '4px', color: '#000'}}>
          <strong>Try it:</strong> Use the environment switcher above to switch between Development, Staging,
          and Production. Each environment has different default flag values defined in <code>src/config/flag-defaults.ts</code>.
          The page will reload with the new environment's configuration.
        </div>
      </div>

      {/* Features Configuration */}
      <FeaturesConfigSection />

      {/* Configuration Summary */}
      <ConfigurationSummary />

      <div className="card">
        <p className="access-platform">
          Sign in to the CloudBees platform to modify flag values and see
          how they update in real-time.
        </p>
        <a href="https://cloudbees.io" target="_blank">
          <img src={cbLogo} className="logo" alt="CloudBees logo"/>
        </a>
      </div>

    </>
  )
}

export default App
