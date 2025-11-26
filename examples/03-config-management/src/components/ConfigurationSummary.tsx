import {getFlagValues} from "../feature-management/flags";
import {useState} from "react";

/**
 * ConfigurationSummary displays all current flag values
 * Useful for debugging and documentation
 */
export const ConfigurationSummary = () => {
  const [showConfig, setShowConfig] = useState(false);

  const handleExportConfig = () => {
    const config = getFlagValues();
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flag-configuration.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card">
      <h2>Configuration Summary</h2>
      <p style={{fontSize: '0.9rem', color: '#666'}}>
        View and export the current configuration for all flags.
      </p>

      <div style={{display: 'flex', gap: '1rem', marginTop: '1rem'}}>
        <button
          onClick={() => setShowConfig(!showConfig)}
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
          {showConfig ? 'Hide' : 'Show'} Configuration
        </button>
        <button
          onClick={handleExportConfig}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Export as JSON
        </button>
      </div>

      {showConfig && (
        <pre
          style={{
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: '#263238',
            color: '#aed581',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '0.85rem',
            textAlign: 'left',
          }}
        >
          {JSON.stringify(getFlagValues(), null, 2)}
        </pre>
      )}

      <div style={{marginTop: '1rem', padding: '0.5rem', backgroundColor: '#e0f2f1', borderRadius: '4px', color: '#000'}}>
        <small>
          <strong>Use Case:</strong> Export configurations for documentation, debugging, or to share
          flag states with your team. This is especially useful when troubleshooting environment-specific issues.
        </small>
      </div>
    </div>
  );
};
