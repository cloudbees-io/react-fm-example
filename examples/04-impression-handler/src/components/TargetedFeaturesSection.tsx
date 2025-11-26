import {useFeatureFlags} from "../feature-management";
import {loadUserContext} from "../utils/user-context";

/**
 * TargetedFeaturesSection demonstrates feature targeting based on custom properties
 * Shows how features can be enabled for specific user segments
 */
export const TargetedFeaturesSection = () => {
  const flags = useFeatureFlags();
  const user = loadUserContext();

  return (
    <div className="card">
      <h2>Targeted Features</h2>
      <p style={{fontSize: '0.9rem', color: '#666'}}>
        Targeted features are enabled for specific user segments based on custom properties
        like user tier, location, account age, and more.
      </p>

      {/* Current User Properties */}
      <div style={{marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#e3f2fd', borderRadius: '4px', color: '#000'}}>
        <h3 style={{marginTop: 0}}>Your Properties</h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', fontSize: '0.9rem'}}>
          <div><strong>User Tier:</strong> {user.userTier}</div>
          <div><strong>Country:</strong> {user.country}</div>
          <div><strong>Account Age:</strong> {user.accountAge} days</div>
          <div><strong>Beta Tester:</strong> {user.betaTester ? 'Yes' : 'No'}</div>
          <div><strong>Feature Usage:</strong> {user.featureUsageCount}</div>
        </div>
        <div style={{marginTop: '0.5rem', fontSize: '0.85rem', fontStyle: 'italic', color: '#666'}}>
          These properties are used for targeting in CloudBees platform
        </div>
      </div>

      <div style={{marginTop: '1rem'}}>
        {/* Premium Dashboard */}
        <div style={{marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
          <h3 style={{marginTop: 0}}>Premium Dashboard</h3>
          <div style={{marginBottom: '0.5rem'}}>
            <strong>Status:</strong>{' '}
            <span style={{
              padding: '0.25rem 0.5rem',
              backgroundColor: flags.enablePremiumDashboard.isEnabled() ? '#4caf50' : '#f44336',
              color: 'white',
              borderRadius: '4px',
              fontWeight: 'bold',
            }}>
              {flags.enablePremiumDashboard.isEnabled() ? 'UNLOCKED' : 'LOCKED'}
            </span>
          </div>

          <div style={{marginTop: '0.75rem', padding: '0.75rem', backgroundColor: '#fff3e0', borderRadius: '4px', color: '#000'}}>
            <strong>Targeting Rule:</strong> userTier = "pro" OR userTier = "enterprise"
          </div>

          {flags.enablePremiumDashboard.isEnabled() ? (
            <div style={{marginTop: '1rem', padding: '0.75rem', backgroundColor: '#e8f5e9', borderRadius: '4px', color: '#000'}}>
              <p style={{margin: 0, fontSize: '0.9rem'}}>
                ✅ Premium dashboard unlocked! You have access to advanced insights, custom reports,
                and real-time analytics.
              </p>
            </div>
          ) : (
            <div style={{marginTop: '1rem', padding: '0.75rem', backgroundColor: '#ffebee', borderRadius: '4px', color: '#000'}}>
              <p style={{margin: 0, fontSize: '0.9rem'}}>
                ❌ Premium dashboard requires a Pro or Enterprise plan.
              </p>
            </div>
          )}
        </div>

        {/* Advanced Analytics */}
        <div style={{marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
          <h3 style={{marginTop: 0}}>Advanced Analytics</h3>
          <div style={{marginBottom: '0.5rem'}}>
            <strong>Status:</strong>{' '}
            <span style={{
              padding: '0.25rem 0.5rem',
              backgroundColor: flags.enableAdvancedAnalytics.isEnabled() ? '#4caf50' : '#f44336',
              color: 'white',
              borderRadius: '4px',
              fontWeight: 'bold',
            }}>
              {flags.enableAdvancedAnalytics.isEnabled() ? 'ENABLED' : 'DISABLED'}
            </span>
          </div>

          <div style={{marginTop: '0.75rem', padding: '0.75rem', backgroundColor: '#fff3e0', borderRadius: '4px', color: '#000'}}>
            <strong>Targeting Rule:</strong> featureUsageCount {'>'} 50 OR userTier = "enterprise"
          </div>

          {flags.enableAdvancedAnalytics.isEnabled() ? (
            <div style={{marginTop: '1rem', padding: '0.75rem', backgroundColor: '#e3f2fd', borderRadius: '4px', color: '#000'}}>
              <div style={{marginBottom: '0.5rem'}}>
                <strong>Data Retention:</strong> {flags.analyticsRetentionDays.getValue()} days
              </div>
              <p style={{margin: 0, fontSize: '0.9rem'}}>
                Advanced analytics enabled! Track trends, create custom dashboards, and export detailed reports.
              </p>
            </div>
          ) : (
            <div style={{marginTop: '1rem', padding: '0.75rem', backgroundColor: '#fafafa', borderRadius: '4px', color: '#000'}}>
              <p style={{margin: 0, fontSize: '0.9rem'}}>
                Advanced analytics is available for power users and enterprise customers.
              </p>
            </div>
          )}
        </div>

        {/* Beta Features */}
        <div style={{marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
          <h3 style={{marginTop: 0}}>Beta Features Program</h3>
          <div style={{marginBottom: '0.5rem'}}>
            <strong>Status:</strong>{' '}
            <span style={{
              padding: '0.25rem 0.5rem',
              backgroundColor: flags.enableBetaFeatures.isEnabled() ? '#4caf50' : '#f44336',
              color: 'white',
              borderRadius: '4px',
              fontWeight: 'bold',
            }}>
              {flags.enableBetaFeatures.isEnabled() ? 'ENROLLED' : 'NOT ENROLLED'}
            </span>
          </div>

          <div style={{marginTop: '0.75rem', padding: '0.75rem', backgroundColor: '#fff3e0', borderRadius: '4px', color: '#000'}}>
            <strong>Targeting Rule:</strong> betaTester = true
          </div>

          {flags.enableBetaFeatures.isEnabled() ? (
            <div style={{marginTop: '1rem', padding: '0.75rem', backgroundColor: '#f3e5f5', borderRadius: '4px', color: '#000'}}>
              <p style={{margin: 0, fontSize: '0.9rem'}}>
                🎉 You're enrolled in the beta features program! You'll get early access to new features
                and can provide feedback to help shape the product.
              </p>
            </div>
          ) : (
            <div style={{marginTop: '1rem', padding: '0.75rem', backgroundColor: '#fafafa', borderRadius: '4px', color: '#000'}}>
              <p style={{margin: 0, fontSize: '0.9rem'}}>
                Beta features program is for enrolled beta testers only.
              </p>
            </div>
          )}
        </div>

        {/* Regional Features */}
        <div style={{marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
          <h3 style={{marginTop: 0}}>Regional Features</h3>
          <div style={{marginBottom: '0.5rem'}}>
            <strong>Status:</strong>{' '}
            <span style={{
              padding: '0.25rem 0.5rem',
              backgroundColor: flags.enableRegionalFeatures.isEnabled() ? '#4caf50' : '#f44336',
              color: 'white',
              borderRadius: '4px',
              fontWeight: 'bold',
            }}>
              {flags.enableRegionalFeatures.isEnabled() ? 'AVAILABLE' : 'NOT AVAILABLE'}
            </span>
          </div>

          <div style={{marginTop: '0.75rem', padding: '0.75rem', backgroundColor: '#fff3e0', borderRadius: '4px', color: '#000'}}>
            <strong>Targeting Rule:</strong> country IN ["US", "UK", "CA", "AU"]
          </div>

          {flags.enableRegionalFeatures.isEnabled() ? (
            <div style={{marginTop: '1rem', padding: '0.75rem', backgroundColor: '#e8f5e9', borderRadius: '4px', color: '#000'}}>
              <div style={{marginBottom: '0.5rem'}}>
                <strong>Feature Set:</strong> {flags.regionalFeatureSet.getValue()}
              </div>
              <p style={{margin: 0, fontSize: '0.9rem'}}>
                Regional features for {user.country} are available, including localized content,
                regional payment methods, and local compliance features.
              </p>
            </div>
          ) : (
            <div style={{marginTop: '1rem', padding: '0.75rem', backgroundColor: '#fafafa', borderRadius: '4px', color: '#000'}}>
              <p style={{margin: 0, fontSize: '0.9rem'}}>
                Regional features not available in your country ({user.country}) yet.
              </p>
            </div>
          )}
        </div>
      </div>

      <div style={{marginTop: '1rem', padding: '0.5rem', backgroundColor: '#e3f2fd', borderRadius: '4px', color: '#000'}}>
        <small>
          <strong>How Targeting Works:</strong> Custom properties are set when the SDK initializes.
          In the CloudBees platform, you create targeting rules like "userTier = pro" or
          "accountAge {'>'} 30". The SDK evaluates these rules locally and returns the appropriate
          flag value for each user. Change your user properties in the User Context Manager below
          to see how targeting affects feature access.
        </small>
      </div>
    </div>
  );
};
