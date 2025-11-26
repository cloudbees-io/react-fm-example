import {useFeatureFlags} from "../feature-management";

/**
 * GradualRolloutSection demonstrates gradual feature rollout patterns
 * Shows how to safely introduce new features to a subset of users
 */
export const GradualRolloutSection = () => {
  const flags = useFeatureFlags();

  return (
    <div className="card">
      <h2>Gradual Rollout</h2>
      <p style={{fontSize: '0.9rem', color: '#666'}}>
        Gradual rollout allows you to introduce new features to a small percentage of users first,
        then gradually increase exposure as confidence grows.
      </p>

      <div style={{marginTop: '1rem'}}>
        {/* New Search Algorithm */}
        <div style={{marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
          <h3 style={{marginTop: 0}}>New Search Algorithm</h3>
          <div style={{marginBottom: '0.5rem'}}>
            <strong>Status:</strong>{' '}
            <span style={{
              padding: '0.25rem 0.5rem',
              backgroundColor: flags.enableNewSearchAlgorithm.isEnabled() ? '#4caf50' : '#f44336',
              color: 'white',
              borderRadius: '4px',
              fontWeight: 'bold',
            }}>
              {flags.enableNewSearchAlgorithm.isEnabled() ? 'ENABLED' : 'DISABLED'}
            </span>
          </div>

          {flags.enableNewSearchAlgorithm.isEnabled() && (
            <div style={{marginTop: '1rem', padding: '0.75rem', backgroundColor: '#e8f5e9', borderRadius: '4px', color: '#000'}}>
              <div style={{marginBottom: '0.5rem'}}>
                <strong>Algorithm Version:</strong> {flags.searchAlgorithmVersion.getValue()}
              </div>
              <p style={{margin: 0, fontSize: '0.9rem'}}>
                You're using the new search algorithm! This provides faster results and better relevance ranking.
              </p>
            </div>
          )}

          {!flags.enableNewSearchAlgorithm.isEnabled() && (
            <div style={{marginTop: '1rem', padding: '0.75rem', backgroundColor: '#ffebee', borderRadius: '4px', color: '#000'}}>
              <p style={{margin: 0, fontSize: '0.9rem'}}>
                You're using the standard search algorithm (v1).
              </p>
            </div>
          )}

          <div style={{marginTop: '0.75rem', fontSize: '0.85rem', color: '#666'}}>
            <strong>Rollout Strategy:</strong>
            <ol style={{margin: '0.5rem 0', paddingLeft: '1.5rem'}}>
              <li>Start at 5% of users, monitor for errors</li>
              <li>Increase to 25% if no issues detected</li>
              <li>Increase to 50% after 1 week</li>
              <li>Full rollout (100%) after 2 weeks if successful</li>
            </ol>
          </div>
        </div>

        {/* Enhanced Profile Page */}
        <div style={{marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
          <h3 style={{marginTop: 0}}>Enhanced Profile Page</h3>
          <div style={{marginBottom: '0.5rem'}}>
            <strong>Status:</strong>{' '}
            <span style={{
              padding: '0.25rem 0.5rem',
              backgroundColor: flags.enableEnhancedProfile.isEnabled() ? '#4caf50' : '#f44336',
              color: 'white',
              borderRadius: '4px',
              fontWeight: 'bold',
            }}>
              {flags.enableEnhancedProfile.isEnabled() ? 'ENABLED' : 'DISABLED'}
            </span>
          </div>

          {flags.enableEnhancedProfile.isEnabled() ? (
            <div style={{marginTop: '1rem', padding: '0.75rem', backgroundColor: '#e3f2fd', borderRadius: '4px', color: '#000'}}>
              <strong>Features Available:</strong>
              <ul style={{margin: '0.5rem 0', paddingLeft: '1.5rem'}}>
                <li>Customizable profile themes</li>
                <li>Rich media support (videos, galleries)</li>
                <li>Activity timeline</li>
                <li>Social integrations</li>
              </ul>
            </div>
          ) : (
            <div style={{marginTop: '1rem', padding: '0.75rem', backgroundColor: '#fff3e0', borderRadius: '4px', color: '#000'}}>
              <p style={{margin: 0, fontSize: '0.9rem'}}>
                Standard profile page. Enhanced profile features will be available soon!
              </p>
            </div>
          )}
        </div>

        {/* Real-time Collaboration */}
        <div style={{marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
          <h3 style={{marginTop: 0}}>Real-time Collaboration (Beta)</h3>
          <div style={{marginBottom: '0.5rem'}}>
            <strong>Status:</strong>{' '}
            <span style={{
              padding: '0.25rem 0.5rem',
              backgroundColor: flags.enableRealtimeCollaboration.isEnabled() ? '#4caf50' : '#f44336',
              color: 'white',
              borderRadius: '4px',
              fontWeight: 'bold',
            }}>
              {flags.enableRealtimeCollaboration.isEnabled() ? 'BETA ACCESS' : 'NOT AVAILABLE'}
            </span>
          </div>

          {flags.enableRealtimeCollaboration.isEnabled() ? (
            <div style={{marginTop: '1rem', padding: '0.75rem', backgroundColor: '#f3e5f5', borderRadius: '4px', color: '#000'}}>
              <div style={{marginBottom: '0.5rem'}}>
                <strong>Max Collaborators:</strong> {flags.collaborationMaxUsers.getValue()} users
              </div>
              <p style={{margin: 0, fontSize: '0.9rem'}}>
                🎉 You have access to real-time collaboration! Invite up to{' '}
                {flags.collaborationMaxUsers.getValue()} team members to work together.
              </p>
            </div>
          ) : (
            <div style={{marginTop: '1rem', padding: '0.75rem', backgroundColor: '#fafafa', borderRadius: '4px', color: '#000'}}>
              <p style={{margin: 0, fontSize: '0.9rem'}}>
                Real-time collaboration is currently in beta testing with select users.
              </p>
            </div>
          )}

          <div style={{marginTop: '0.75rem', fontSize: '0.85rem', color: '#666'}}>
            <strong>Beta Phase:</strong> Limited to early adopters and beta testers
          </div>
        </div>
      </div>

      <div style={{marginTop: '1rem', padding: '0.5rem', backgroundColor: '#fff3e0', borderRadius: '4px', color: '#000'}}>
        <small>
          <strong>Pro Tip:</strong> Use CloudBees percentage-based targeting to control rollout.
          Start at 5-10%, monitor metrics (error rates, performance, user feedback), then gradually
          increase. You can also target specific user segments (e.g., internal users first, then
          beta testers, then general public).
        </small>
      </div>
    </div>
  );
};
