import {useFeatureFlags} from "../feature-management";

/**
 * PerformanceConfigSection demonstrates performance namespace flags
 * Shows how performance optimizations can be controlled via flags
 */
export const PerformanceConfigSection = () => {
  const flags = useFeatureFlags();

  return (
    <div className="card">
      <h2>Performance Configuration (performance namespace)</h2>
      <p style={{fontSize: '0.9rem', color: '#666'}}>
        These flags control performance optimizations and are organized under the "performance" namespace.
      </p>

      <div style={{marginTop: '1rem'}}>
        <div style={{marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
          <strong>performance.enableCaching</strong>
          <div style={{marginTop: '0.5rem'}}>
            Current Value:{' '}
            <span style={{color: flags.performance.enableCaching.isEnabled() ? '#4caf50' : '#f44336', fontWeight: 'bold'}}>
              {flags.performance.enableCaching.isEnabled() ? 'ON' : 'OFF'}
            </span>
          </div>
          {flags.performance.enableCaching.isEnabled() && (
            <div style={{marginLeft: '1rem', marginTop: '0.5rem', borderLeft: '3px solid #4caf50', paddingLeft: '0.5rem'}}>
              <strong>performance.cacheTimeout:</strong>{' '}
              <span style={{color: '#1976d2', fontWeight: 'bold'}}>
                {flags.performance.cacheTimeout.getValue()}s
              </span>
              <div style={{fontSize: '0.85rem', color: '#666', marginTop: '0.25rem'}}>
                How long cached data remains valid
              </div>
            </div>
          )}
          <div style={{fontSize: '0.85rem', color: '#666', marginTop: '0.25rem'}}>
            Enables response caching to reduce server load
          </div>
        </div>

        <div style={{marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
          <strong>performance.enableLazyLoading</strong>
          <div style={{marginTop: '0.5rem'}}>
            Current Value:{' '}
            <span style={{color: flags.performance.enableLazyLoading.isEnabled() ? '#4caf50' : '#f44336', fontWeight: 'bold'}}>
              {flags.performance.enableLazyLoading.isEnabled() ? 'ON' : 'OFF'}
            </span>
          </div>
          <div style={{fontSize: '0.85rem', color: '#666', marginTop: '0.25rem'}}>
            Lazy loads images and components for faster initial page load
          </div>
        </div>

        <div style={{marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
          <strong>performance.batchSize</strong>
          <div style={{marginTop: '0.5rem'}}>
            Current Value:{' '}
            <span style={{color: '#1976d2', fontWeight: 'bold'}}>
              {flags.performance.batchSize.getValue()}
            </span>
          </div>
          <div style={{fontSize: '0.85rem', color: '#666', marginTop: '0.25rem'}}>
            Number of items to load per batch in paginated views
          </div>
        </div>
      </div>

      <div style={{marginTop: '1rem', padding: '0.5rem', backgroundColor: '#fff3e0', borderRadius: '4px', color: '#000'}}>
        <small>
          <strong>Environment Note:</strong> Development uses shorter timeouts and smaller batches
          for easier debugging. Production uses longer timeouts and larger batches for better performance.
        </small>
      </div>
    </div>
  );
};
