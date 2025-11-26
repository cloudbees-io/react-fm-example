import {useFeatureFlags} from "../feature-management";

/**
 * UIConfigSection demonstrates UI namespace flags
 * Shows how UI preferences can be managed through feature flags
 */
export const UIConfigSection = () => {
  const flags = useFeatureFlags();

  return (
    <div className="card">
      <h2>UI Configuration (ui namespace)</h2>
      <p style={{fontSize: '0.9rem', color: '#666'}}>
        These flags control user interface preferences and are organized under the "ui" namespace.
      </p>

      <div style={{marginTop: '1rem'}}>
        <div style={{marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
          <strong>ui.theme</strong>
          <div style={{marginTop: '0.5rem'}}>
            Current Value: <span style={{color: '#1976d2', fontWeight: 'bold'}}>{flags.ui.theme.getValue()}</span>
          </div>
          <div style={{fontSize: '0.85rem', color: '#666', marginTop: '0.25rem'}}>
            Controls the application color scheme
          </div>
        </div>

        <div style={{marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
          <strong>ui.language</strong>
          <div style={{marginTop: '0.5rem'}}>
            Current Value: <span style={{color: '#1976d2', fontWeight: 'bold'}}>{flags.ui.language.getValue()}</span>
          </div>
          <div style={{fontSize: '0.85rem', color: '#666', marginTop: '0.25rem'}}>
            Controls the application language/locale
          </div>
        </div>

        <div style={{marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
          <strong>ui.enableAccessibility</strong>
          <div style={{marginTop: '0.5rem'}}>
            Current Value:{' '}
            <span style={{color: flags.ui.enableAccessibility.isEnabled() ? '#4caf50' : '#f44336', fontWeight: 'bold'}}>
              {flags.ui.enableAccessibility.isEnabled() ? 'ON' : 'OFF'}
            </span>
          </div>
          <div style={{fontSize: '0.85rem', color: '#666', marginTop: '0.25rem'}}>
            Enables accessibility features (screen reader support, keyboard navigation)
          </div>
        </div>

        <div style={{marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
          <strong>ui.fontSize</strong>
          <div style={{marginTop: '0.5rem'}}>
            Current Value: <span style={{color: '#1976d2', fontWeight: 'bold'}}>{flags.ui.fontSize.getValue()}px</span>
          </div>
          <div style={{fontSize: '0.85rem', color: '#666', marginTop: '0.25rem'}}>
            Base font size for the application
          </div>
        </div>
      </div>

      <div style={{marginTop: '1rem', padding: '0.5rem', backgroundColor: '#e3f2fd', borderRadius: '4px', color: '#000'}}>
        <small>
          <strong>Pattern:</strong> The "ui" namespace groups all user interface flags together.
          In the CloudBees platform, these appear as ui.theme, ui.language, etc.
        </small>
      </div>
    </div>
  );
};
