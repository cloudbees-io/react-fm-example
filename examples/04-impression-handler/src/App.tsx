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
      <h1>Impression Handler Example</h1>

      <div className="card">
        <h2>About This Example</h2>
        <p>
          This example demonstrates <strong>impression handlers</strong> for tracking feature flag
          evaluations in real-time.
        </p>
        <div style={{marginTop: '1rem', padding: '0.75rem', backgroundColor: '#e3f2fd', borderRadius: '4px', color: '#000'}}>
          <strong>What's an Impression Handler?</strong><br />
          An impression handler is a callback function that gets triggered <strong>every time</strong> a
          feature flag is evaluated (when <code>.isEnabled()</code> or <code>.getValue()</code> is called).
          This allows you to track flag usage, send data to analytics services, and measure feature adoption.
        </div>
      </div>

      {/* Feature Flags Demo */}
      <div className="card">
        <h2>Feature Flags</h2>
        <p style={{fontSize: '0.9rem', color: '#666'}}>
          Interact with these flags to see impressions being tracked in real-time below.
        </p>

        <div style={{marginTop: '1rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
          {/* Dark Mode - Boolean */}
          <div style={{marginBottom: '1rem'}}>
            <strong>Dark Mode:</strong>{' '}
            <span style={{
              padding: '0.25rem 0.5rem',
              backgroundColor: featureFlags.enableDarkMode.isEnabled() ? '#4caf50' : '#f44336',
              color: 'white',
              borderRadius: '4px',
              fontWeight: 'bold',
            }}>
              {featureFlags.enableDarkMode.isEnabled() ? 'ON' : 'OFF'}
            </span>
            <span style={{marginLeft: '0.5rem', fontSize: '0.85rem', color: '#666'}}>
              (Boolean)
            </span>
          </div>

          {/* Language - String */}
          <div style={{marginBottom: '1rem'}}>
            <strong>Language:</strong>{' '}
            <span style={{
              padding: '0.25rem 0.5rem',
              backgroundColor: '#9c27b0',
              color: 'white',
              borderRadius: '4px',
              fontWeight: 'bold',
            }}>
              {featureFlags.language.getValue()}
            </span>
            <span style={{marginLeft: '0.5rem', fontSize: '0.85rem', color: '#666'}}>
              (String: en, es, fr, de)
            </span>
          </div>

          {/* Refresh Interval - Number */}
          <div>
            <strong>Refresh Interval:</strong>{' '}
            <span style={{
              padding: '0.25rem 0.5rem',
              backgroundColor: '#00bcd4',
              color: 'white',
              borderRadius: '4px',
              fontWeight: 'bold',
            }}>
              {featureFlags.refreshInterval.getValue()}s
            </span>
            <span style={{marginLeft: '0.5rem', fontSize: '0.85rem', color: '#666'}}>
              (Number: 10s, 30s, 60s)
            </span>
          </div>
        </div>

        <div style={{marginTop: '1rem', padding: '0.5rem', backgroundColor: '#fff3e0', borderRadius: '4px', color: '#000'}}>
          <small>
            <strong>💡 Tip:</strong> Each time the component renders, all 3 flags are evaluated, triggering
            3 impressions. Try changing flag values in the CloudBees platform and check the browser console
            to see impressions being tracked in real-time!
          </small>
        </div>
      </div>

      <div className="card">
        <h2>How It Works</h2>
        <div style={{textAlign: 'left', margin: '0 auto', maxWidth: '700px'}}>
          <p>
            <strong>1. Impression Handler Setup:</strong> In <code>FeatureFlagsProvider.tsx</code>,
            the impression handler is configured in <code>Rox.setup()</code>:
          </p>
          <pre style={{backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto', color: '#000'}}>
{`impressionHandler(reportingValue, context) {
  trackFlagImpression({
    flagName: reportingValue.name,
    flagValue: reportingValue.value,
    timestamp: new Date(),
    userId: user.userId
  });
}`}
          </pre>

          <p style={{marginTop: '1rem'}}>
            <strong>2. When It Fires:</strong> The handler is called every time:
          </p>
          <ul>
            <li><code>flags.enableDarkMode.isEnabled()</code> is called</li>
            <li><code>flags.language.getValue()</code> is called</li>
            <li><code>flags.refreshInterval.getValue()</code> is called</li>
          </ul>

          <p style={{marginTop: '1rem'}}>
            <strong>3. What You Can Do:</strong>
          </p>
          <ul>
            <li>Send impressions to Google Analytics, Amplitude, Mixpanel, etc.</li>
            <li>Measure feature adoption rates</li>
            <li>Debug flag usage in development</li>
          </ul>
        </div>
      </div>

      <div className="card">
        <p className="access-platform">
          Sign in to the CloudBees platform to modify flag values and see
          impression tracking in real-time.
        </p>
        <a href="https://cloudbees.io" target="_blank">
          <img src={cbLogo} className="logo" alt="CloudBees logo"/>
        </a>
      </div>

    </>
  )
}

export default App
