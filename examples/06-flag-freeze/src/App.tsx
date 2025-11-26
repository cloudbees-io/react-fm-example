import cbLogo from './assets/CB-stacked-logo-full-color.svg'
import './App.css'
import {useFeatureFlags} from "./feature-management";
import {LoadingIndicator} from "./LoadingIndicator.tsx";
import Rox from 'rox-browser';

function App() {

  const featureFlags = useFeatureFlags()

  const handleUnfreeze = async () => {
    // Unfreeze the frozen flag
    featureFlags.frozenFlag.unfreeze()
    console.log('✅ frozenFlag unfrozen - fetching latest value')

    // Fetch latest configuration
    await Rox.fetch()
    console.log('✅ Latest configuration fetched')
  }

  if (featureFlags.loading) {
    return (
      <div className="position-relative pb-9">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <>
      <h1>Flag Freeze Example</h1>

      <div className="card">
        <h2>About This Example</h2>
        <p>
          This example demonstrates <strong>flag freeze</strong> - a feature that prevents flags
          from updating automatically when configuration changes are fetched from CloudBees.
        </p>
        <div style={{marginTop: '1rem', padding: '0.75rem', backgroundColor: '#e3f2fd', borderRadius: '4px', color: '#000', textAlign: 'left'}}>
          <strong>What's Flag Freeze?</strong><br />
          Flag freeze allows you to control when configuration changes take effect. This is useful for:
          <ul style={{marginTop: '0.5rem', marginBottom: 0, textAlign: 'left'}}>
            <li>Maintaining consistency during critical user flows (e.g., checkout)</li>
            <li>Preventing UI changes mid-interaction (e.g., form filling)</li>
            <li>Reducing re-renders during heavy operations</li>
          </ul>
        </div>
      </div>

      {/* Auto-Update Flag (No Freeze) */}
      <div className="card">
        <h2>Auto-Update Flag (No Freeze)</h2>
        <p style={{fontSize: '0.9rem', color: '#666'}}>
          This flag has <strong>no freeze</strong> - it updates automatically when you change it in CloudBees.
        </p>

        <div style={{marginTop: '1rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div style={{textAlign: 'left'}}>
              <strong>autoUpdateFlag:</strong>
              <div style={{fontSize: '0.85rem', color: '#666', marginTop: '0.25rem'}}>
                No freeze - updates automatically
              </div>
            </div>
            <span style={{
              padding: '0.25rem 0.75rem',
              backgroundColor: featureFlags.autoUpdateFlag.isEnabled() ? '#4caf50' : '#f44336',
              color: 'white',
              borderRadius: '4px',
              fontWeight: 'bold',
            }}>
              {featureFlags.autoUpdateFlag.isEnabled() ? 'ENABLED' : 'DISABLED'}
            </span>
          </div>
        </div>

        <div style={{marginTop: '1rem', padding: '0.75rem', backgroundColor: '#e8f5e9', borderRadius: '4px', color: '#000', textAlign: 'left'}}>
          <strong>✅ Test it:</strong> Change this flag in CloudBees and watch it update automatically!
        </div>
      </div>

      {/* Frozen Flag */}
      <div className="card">
        <h2>Frozen Flag (UntilLaunch)</h2>
        <p style={{fontSize: '0.9rem', color: '#666'}}>
          This flag is frozen with <code>freeze: RoxFlagFreezeLevel.UntilLaunch</code>.
          It won't update automatically - you must manually unfreeze it.
        </p>

        {/* Boolean Frozen Flag */}
        <div style={{marginTop: '1rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
            <div style={{textAlign: 'left'}}>
              <strong>frozenFlag (Boolean):</strong>
              <div style={{fontSize: '0.85rem', color: '#666', marginTop: '0.25rem'}}>
                Frozen - requires manual unfreeze
              </div>
            </div>
            <span style={{
              padding: '0.25rem 0.75rem',
              backgroundColor: featureFlags.frozenFlag.isEnabled() ? '#4caf50' : '#f44336',
              color: 'white',
              borderRadius: '4px',
              fontWeight: 'bold',
            }}>
              {featureFlags.frozenFlag.isEnabled() ? 'ENABLED' : 'DISABLED'}
            </span>
          </div>

          <button
            onClick={handleUnfreeze}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Unfreeze
          </button>
        </div>

        <div style={{marginTop: '1rem', padding: '0.75rem', backgroundColor: '#e3f2fd', borderRadius: '4px', color: '#000', textAlign: 'left'}}>
          <strong>How to test:</strong>
          <ol style={{margin: '0.5rem 0 0 0', paddingLeft: '1.25rem', fontSize: '0.85rem', textAlign: 'left'}}>
            <li>Change the <code>frozenFlag</code> value in the CloudBees dashboard</li>
            <li>Notice the value doesn't update in the app (it's frozen)</li>
            <li>Click the "Unfreeze" button</li>
            <li>See the value update to match CloudBees dashboard</li>
            <li>Test again - change the flag and click "Unfreeze" to see the new value</li>
          </ol>
        </div>
      </div>

      {/* Comparison */}
      <div className="card">
        <h2 style={{textAlign: 'left'}}>Freeze Levels</h2>
        <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '1rem'}}>
          <thead>
            <tr style={{backgroundColor: '#f5f5f5'}}>
              <th style={{padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #ddd', color: '#000'}}>Freeze Level</th>
              <th style={{padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #ddd', color: '#000'}}>Behavior</th>
              <th style={{padding: '0.75rem', textAlign: 'left', borderBottom: '2px solid #ddd', color: '#000'}}>Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'left'}}><code>None</code></td>
              <td style={{padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'left'}}>Updates immediately</td>
              <td style={{padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'left'}}>Real-time updates</td>
            </tr>
            <tr>
              <td style={{padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'left'}}><code>UntilForeground</code></td>
              <td style={{padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'left'}}>Frozen (manual unfreeze in browser)</td>
              <td style={{padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'left'}}>Mobile apps</td>
            </tr>
            <tr>
              <td style={{padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'left'}}><code>UntilLaunch</code></td>
              <td style={{padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'left'}}>Frozen (manual unfreeze in browser)</td>
              <td style={{padding: '0.75rem', borderBottom: '1px solid #ddd', textAlign: 'left'}}>Critical flows, consistency</td>
            </tr>
          </tbody>
        </table>

        <div style={{marginTop: '1rem', padding: '0.75rem', backgroundColor: '#fff3e0', borderRadius: '4px', color: '#000', textAlign: 'left'}}>
          <strong>⚠️ Important for Browser Apps:</strong> <code>UntilForeground</code> and <code>UntilLaunch</code>
          require manual unfreezing in browser/web applications. These freeze levels are designed for mobile apps
          where app lifecycle events (foreground/launch) are more distinct.
        </div>
      </div>

      <div className="card">
        <p className="access-platform">
          Sign in to the CloudBees platform to modify flag values and test flag freeze behavior.
        </p>
        <a href="https://cloudbees.io" target="_blank">
          <img src={cbLogo} className="logo" alt="CloudBees logo"/>
        </a>
      </div>

    </>
  )
}

export default App
