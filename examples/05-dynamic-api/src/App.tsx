import cbLogo from './assets/CB-stacked-logo-full-color.svg'
import './App.css'
import Rox from 'rox-browser'
import {useFeatureFlags, flagsCatalog} from "./feature-management"
import {LoadingIndicator} from "./LoadingIndicator.tsx"

function App() {

  const { loading } = useFeatureFlags()

  if (loading) {
    return (
      <div className="position-relative pb-9">
        <LoadingIndicator />
      </div>
    );
  }

  // Get all flags from configuration
  const allFlags = flagsCatalog

  return (
    <>
      <h1>Dynamic API Example</h1>

      <div className="card">
        <h2>About This Example</h2>
        <p>
          This example demonstrates the <strong>Dynamic API</strong> for accessing feature flags
          without pre-registration.
        </p>
        <div style={{marginTop: '1rem', padding: '0.75rem', backgroundColor: '#e3f2fd', borderRadius: '4px', color: '#000'}}>
          <strong>What's the Dynamic API?</strong><br />
          Instead of creating <code>Flag</code>, <code>RoxString</code>, or <code>RoxNumber</code> instances,
          you access flags directly by name using <code>Rox.dynamicApi</code> methods. This is useful when
          flag names come from external configuration or are determined at runtime.
        </div>
      </div>

      {/* API Comparison */}
      <div className="card">
        <h2>Static API vs Dynamic API</h2>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem'}}>

          {/* Static API */}
          <div style={{padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
            <h3 style={{marginTop: 0, color: '#1976d2'}}>Static API</h3>
            <p style={{fontSize: '0.9rem', color: '#666'}}>Pre-register flag instances</p>
            <pre style={{fontSize: '0.85rem', backgroundColor: '#fff', padding: '0.75rem', borderRadius: '4px', overflow: 'auto'}}>
{`// Define flags
const flags = {
  enableDarkMode: new Flag(false)
};

// Register flags
Rox.register('', flags);

// Use flags
if (flags.enableDarkMode.isEnabled()) {
  // ...
}`}
            </pre>
            <div style={{marginTop: '0.5rem', fontSize: '0.85rem'}}>
              <strong>Best for:</strong>
              <ul style={{marginTop: '0.25rem', paddingLeft: '1.25rem'}}>
                <li>Known flag names at compile time</li>
                <li>Type safety and autocompletion</li>
                <li>Simple applications</li>
              </ul>
            </div>
          </div>

          {/* Dynamic API */}
          <div style={{padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
            <h3 style={{marginTop: 0, color: '#4caf50'}}>Dynamic API</h3>
            <p style={{fontSize: '0.9rem', color: '#666'}}>Access flags by name at runtime</p>
            <pre style={{fontSize: '0.85rem', backgroundColor: '#fff', padding: '0.75rem', borderRadius: '4px', overflow: 'auto'}}>
{`// No registration needed!
// Just setup Rox
await Rox.setup(sdkKey);

// Access flags directly by name
const enabled = Rox.dynamicApi
  .isEnabled('enableDarkMode', false);

if (enabled) {
  // ...
}`}
            </pre>
            <div style={{marginTop: '0.5rem', fontSize: '0.85rem'}}>
              <strong>Best for:</strong>
              <ul style={{marginTop: '0.25rem', paddingLeft: '1.25rem'}}>
                <li>Flag names from configuration</li>
                <li>Plugin/module systems</li>
                <li>Feature catalogs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Live Demo */}
      <div className="card">
        <h2>Live Dynamic API Demo</h2>
        <p style={{fontSize: '0.9rem', color: '#666'}}>
          These flags are loaded from configuration and accessed using <code>Rox.dynamicApi</code> methods.
        </p>

        <div style={{marginTop: '1rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
          {allFlags.map(flag => {
            // Get value based on flag type
            let value: any;
            let apiCall: string;
            let bgColor: string;
            let displayValue: string;

            if (flag.type === 'boolean') {
              value = Rox.dynamicApi.isEnabled(flag.name, flag.defaultValue as boolean)
              apiCall = `Rox.dynamicApi.isEnabled('${flag.name}', ${flag.defaultValue})`
              bgColor = value ? '#4caf50' : '#f44336'
              displayValue = value ? 'ENABLED' : 'DISABLED'
            } else if (flag.type === 'string') {
              value = Rox.dynamicApi.value(flag.name, flag.defaultValue as string)
              apiCall = `Rox.dynamicApi.value('${flag.name}', '${flag.defaultValue}')`
              bgColor = '#1976d2'
              displayValue = value
            } else {
              value = Rox.dynamicApi.getNumber(flag.name, flag.defaultValue as number)
              apiCall = `Rox.dynamicApi.getNumber('${flag.name}', ${flag.defaultValue})`
              bgColor = '#ff9800'
              displayValue = String(value)
            }

            return (
              <div key={flag.name} style={{marginBottom: '1rem'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div>
                    <strong>{flag.name}:</strong>
                    <div style={{fontSize: '0.85rem', color: '#666', marginTop: '0.25rem'}}>
                      {flag.description}
                    </div>
                    <div style={{fontSize: '0.8rem', color: '#999', marginTop: '0.25rem'}}>
                      Type: {flag.type}
                    </div>
                  </div>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    backgroundColor: bgColor,
                    color: 'white',
                    borderRadius: '4px',
                    fontWeight: 'bold',
                  }}>
                    {displayValue}
                  </span>
                </div>
                <code style={{display: 'block', marginTop: '0.5rem', padding: '0.5rem', backgroundColor: '#fff', borderRadius: '4px', fontSize: '0.8rem'}}>
                  {apiCall}
                </code>
              </div>
            )
          })}
        </div>
      </div>

      {/* Use Cases */}
      <div className="card">
        <h2>Common Use Cases</h2>
        <div style={{textAlign: 'left', margin: '0 auto', maxWidth: '700px'}}>

          <div style={{marginBottom: '1.5rem'}}>
            <h3 style={{color: '#1976d2'}}>1. Feature Catalog</h3>
            <p>Load available features from a remote API:</p>
            <pre style={{backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto', fontSize: '0.85rem', color: '#000'}}>
{`// Fetch features from API
const features = await fetch('/api/features')
  .then(r => r.json());

// Check each feature dynamically
features.forEach(feature => {
  const enabled = Rox.dynamicApi.isEnabled(
    feature.flagName,
    feature.defaultValue
  );

  if (enabled) {
    loadFeature(feature);
  }
});`}
            </pre>
          </div>

          <div style={{marginBottom: '1.5rem'}}>
            <h3 style={{color: '#4caf50'}}>2. Plugin System</h3>
            <p>Enable/disable plugins based on flags:</p>
            <pre style={{backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto', fontSize: '0.85rem', color: '#000'}}>
{`const plugins = ['analytics', 'chat', 'payments'];

plugins.forEach(plugin => {
  const flagName = \`enable\${plugin}Plugin\`;

  if (Rox.dynamicApi.isEnabled(flagName, false)) {
    await loadPlugin(plugin);
  }
});`}
            </pre>
          </div>

          <div style={{marginBottom: '1.5rem'}}>
            <h3 style={{color: '#ff9800'}}>3. Configuration-Driven UI</h3>
            <p>Build UI components from configuration:</p>
            <pre style={{backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflow: 'auto', fontSize: '0.85rem', color: '#000'}}>
{`const uiConfig = {
  theme: { flag: 'uiTheme', default: 'light' },
  layout: { flag: 'uiLayout', default: 'grid' },
  density: { flag: 'uiDensity', default: 'comfortable' }
};

Object.entries(uiConfig).forEach(([key, cfg]) => {
  const value = Rox.dynamicApi.value(
    cfg.flag,
    cfg.default
  );
  applyUISetting(key, value);
});`}
            </pre>
          </div>
        </div>
      </div>

      <div className="card">
        <p className="access-platform">
          Sign in to the CloudBees platform to modify flag values and see
          changes reflected in real-time using the Dynamic API.
        </p>
        <a href="https://cloudbees.io" target="_blank">
          <img src={cbLogo} className="logo" alt="CloudBees logo"/>
        </a>
      </div>

    </>
  )
}

export default App
