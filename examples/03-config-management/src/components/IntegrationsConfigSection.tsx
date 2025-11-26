import {useFeatureFlags} from "../feature-management";

/**
 * IntegrationsConfigSection demonstrates integrations namespace flags
 * Shows how third-party integrations can be controlled
 */
export const IntegrationsConfigSection = () => {
  const flags = useFeatureFlags();

  const activeIntegrations = [
    flags.integrations.enableSlackIntegration.isEnabled(),
    flags.integrations.enableJiraIntegration.isEnabled(),
    flags.integrations.enableGithubIntegration.isEnabled(),
  ].filter(Boolean).length;

  return (
    <div className="card">
      <h2>Integrations Configuration (integrations namespace)</h2>
      <p style={{fontSize: '0.9rem', color: '#666'}}>
        These flags control third-party integrations and are organized under the "integrations" namespace.
      </p>

      <div style={{marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#e3f2fd', borderRadius: '4px', color: '#000'}}>
        <strong>Active Integrations:</strong> {activeIntegrations} of 3
      </div>

      <div style={{marginTop: '1rem'}}>
        <div style={{marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
          <strong>integrations.enableSlackIntegration</strong>
          <div style={{marginTop: '0.5rem'}}>
            Current Value:{' '}
            <span style={{color: flags.integrations.enableSlackIntegration.isEnabled() ? '#4caf50' : '#f44336', fontWeight: 'bold'}}>
              {flags.integrations.enableSlackIntegration.isEnabled() ? 'ON' : 'OFF'}
            </span>
          </div>
          <div style={{fontSize: '0.85rem', color: '#666', marginTop: '0.25rem'}}>
            Enables Slack integration for notifications and commands
          </div>
        </div>

        <div style={{marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
          <strong>integrations.enableJiraIntegration</strong>
          <div style={{marginTop: '0.5rem'}}>
            Current Value:{' '}
            <span style={{color: flags.integrations.enableJiraIntegration.isEnabled() ? '#4caf50' : '#f44336', fontWeight: 'bold'}}>
              {flags.integrations.enableJiraIntegration.isEnabled() ? 'ON' : 'OFF'}
            </span>
          </div>
          <div style={{fontSize: '0.85rem', color: '#666', marginTop: '0.25rem'}}>
            Enables Jira integration for issue tracking sync
          </div>
        </div>

        <div style={{marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
          <strong>integrations.enableGithubIntegration</strong>
          <div style={{marginTop: '0.5rem'}}>
            Current Value:{' '}
            <span style={{color: flags.integrations.enableGithubIntegration.isEnabled() ? '#4caf50' : '#f44336', fontWeight: 'bold'}}>
              {flags.integrations.enableGithubIntegration.isEnabled() ? 'ON' : 'OFF'}
            </span>
          </div>
          <div style={{fontSize: '0.85rem', color: '#666', marginTop: '0.25rem'}}>
            Enables GitHub integration for repository and PR sync
          </div>
        </div>

        {activeIntegrations > 0 && (
          <div style={{marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
            <strong>integrations.webhookTimeout</strong>
            <div style={{marginTop: '0.5rem'}}>
              Current Value:{' '}
              <span style={{color: '#1976d2', fontWeight: 'bold'}}>
                {flags.integrations.webhookTimeout.getValue()}ms
              </span>
            </div>
            <div style={{fontSize: '0.85rem', color: '#666', marginTop: '0.25rem'}}>
              Timeout for webhook calls to external services (shared across all integrations)
            </div>
          </div>
        )}
      </div>

      <div style={{marginTop: '1rem', padding: '0.5rem', backgroundColor: '#f3e5f5', borderRadius: '4px', color: '#000'}}>
        <small>
          <strong>Pattern:</strong> Integrations can be toggled independently. The webhookTimeout
          setting applies to all enabled integrations, demonstrating shared configuration.
        </small>
      </div>
    </div>
  );
};
