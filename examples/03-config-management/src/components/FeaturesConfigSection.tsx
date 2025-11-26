import {useFeatureFlags} from "../feature-management";

/**
 * FeaturesConfigSection demonstrates features namespace flags
 * Shows how application features can be toggled and configured
 */
export const FeaturesConfigSection = () => {
  const flags = useFeatureFlags();

  return (
    <div className="card">
      <h2>Features Configuration (features namespace)</h2>
      <p style={{fontSize: '0.9rem', color: '#666'}}>
        These flags control application features and are organized under the "features" namespace.
      </p>

      <div style={{marginTop: '1rem'}}>
        <div style={{marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
          <strong>features.enableSearch</strong>
          <div style={{marginTop: '0.5rem'}}>
            Current Value:{' '}
            <span style={{color: flags.features.enableSearch.isEnabled() ? '#4caf50' : '#f44336', fontWeight: 'bold'}}>
              {flags.features.enableSearch.isEnabled() ? 'ON' : 'OFF'}
            </span>
          </div>
          <div style={{fontSize: '0.85rem', color: '#666', marginTop: '0.25rem'}}>
            Enables search functionality across the application
          </div>
        </div>

        <div style={{marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
          <strong>features.enableAdvancedFilters</strong>
          <div style={{marginTop: '0.5rem'}}>
            Current Value:{' '}
            <span style={{color: flags.features.enableAdvancedFilters.isEnabled() ? '#4caf50' : '#f44336', fontWeight: 'bold'}}>
              {flags.features.enableAdvancedFilters.isEnabled() ? 'ON' : 'OFF'}
            </span>
          </div>
          <div style={{fontSize: '0.85rem', color: '#666', marginTop: '0.25rem'}}>
            Enables advanced filtering options in search and data views
          </div>
        </div>

        <div style={{marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
          <strong>features.enableExport</strong>
          <div style={{marginTop: '0.5rem'}}>
            Current Value:{' '}
            <span style={{color: flags.features.enableExport.isEnabled() ? '#4caf50' : '#f44336', fontWeight: 'bold'}}>
              {flags.features.enableExport.isEnabled() ? 'ON' : 'OFF'}
            </span>
          </div>
          {flags.features.enableExport.isEnabled() && (
            <div style={{marginLeft: '1rem', marginTop: '0.5rem', borderLeft: '3px solid #4caf50', paddingLeft: '0.5rem'}}>
              <strong>features.maxExportRows:</strong>{' '}
              <span style={{color: '#1976d2', fontWeight: 'bold'}}>
                {flags.features.maxExportRows.getValue()}
              </span>
              <div style={{fontSize: '0.85rem', color: '#666', marginTop: '0.25rem'}}>
                Maximum number of rows that can be exported
              </div>
            </div>
          )}
          <div style={{fontSize: '0.85rem', color: '#666', marginTop: '0.25rem'}}>
            Enables data export functionality
          </div>
        </div>

        <div style={{marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
          <strong>features.enableCollaboration</strong>
          <div style={{marginTop: '0.5rem'}}>
            Current Value:{' '}
            <span style={{color: flags.features.enableCollaboration.isEnabled() ? '#4caf50' : '#f44336', fontWeight: 'bold'}}>
              {flags.features.enableCollaboration.isEnabled() ? 'ON' : 'OFF'}
            </span>
          </div>
          <div style={{fontSize: '0.85rem', color: '#666', marginTop: '0.25rem'}}>
            Enables real-time collaboration features (sharing, commenting)
          </div>
        </div>
      </div>

      <div style={{marginTop: '1rem', padding: '0.5rem', backgroundColor: '#e8f5e9', borderRadius: '4px', color: '#000'}}>
        <small>
          <strong>Environment Note:</strong> In development, advanced features are typically enabled
          by default to facilitate testing. In production, they may be behind paywalls or gradual rollouts.
        </small>
      </div>
    </div>
  );
};
