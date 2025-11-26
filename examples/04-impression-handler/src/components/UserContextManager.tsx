import {useState} from "react";
import {loadUserContext, updateUserContext, clearUserContext, generateSampleUser} from "../utils/user-context";

/**
 * UserContextManager allows changing user properties to test targeting
 * This demonstrates how different users see different feature flags
 */
export const UserContextManager = () => {
  const [user, setUser] = useState(loadUserContext());
  const [showManager, setShowManager] = useState(false);

  const handlePropertyChange = (property: string, value: any) => {
    const updated = updateUserContext({ [property]: value });
    setUser(updated);
    // Force page reload to reinitialize SDK with new properties
    setTimeout(() => window.location.reload(), 500);
  };

  const handleGenerateNewUser = () => {
    clearUserContext();
    const newUser = generateSampleUser();
    setUser(newUser);
    window.location.reload();
  };

  return (
    <div className="card">
      <h2>User Context Manager</h2>
      <p style={{fontSize: '0.9rem', color: '#666'}}>
        Change user properties to see how targeting rules affect feature access.
        This simulates how different users would experience the application.
      </p>

      <div style={{marginTop: '1rem', display: 'flex', gap: '1rem'}}>
        <button
          onClick={() => setShowManager(!showManager)}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          {showManager ? 'Hide' : 'Show'} Manager
        </button>
        <button
          onClick={handleGenerateNewUser}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Generate New User
        </button>
      </div>

      {showManager && (
        <div style={{marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
          {/* User Tier */}
          <div style={{marginBottom: '1rem'}}>
            <label style={{display: 'block', fontWeight: 'bold', marginBottom: '0.5rem'}}>
              User Tier
            </label>
            <div style={{display: 'flex', gap: '0.5rem'}}>
              {['free', 'pro', 'enterprise'].map(tier => (
                <button
                  key={tier}
                  onClick={() => handlePropertyChange('userTier', tier)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: user.userTier === tier ? '#1976d2' : 'white',
                    color: user.userTier === tier ? 'white' : '#333',
                    border: '1px solid #1976d2',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: user.userTier === tier ? 'bold' : 'normal',
                  }}
                >
                  {tier}
                </button>
              ))}
            </div>
            <div style={{marginTop: '0.25rem', fontSize: '0.85rem', color: '#666'}}>
              Affects: Premium Dashboard, Advanced Analytics
            </div>
          </div>

          {/* Country */}
          <div style={{marginBottom: '1rem'}}>
            <label style={{display: 'block', fontWeight: 'bold', marginBottom: '0.5rem'}}>
              Country
            </label>
            <select
              value={user.country}
              onChange={(e) => handlePropertyChange('country', e.target.value)}
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '1rem',
                width: '100%',
              }}
            >
              {['US', 'UK', 'CA', 'DE', 'FR', 'JP', 'AU', 'BR', 'IN'].map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <div style={{marginTop: '0.25rem', fontSize: '0.85rem', color: '#666'}}>
              Affects: Regional Features
            </div>
          </div>

          {/* Beta Tester */}
          <div style={{marginBottom: '1rem'}}>
            <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
              <input
                type="checkbox"
                checked={user.betaTester}
                onChange={(e) => handlePropertyChange('betaTester', e.target.checked)}
                style={{marginRight: '0.5rem', width: '20px', height: '20px'}}
              />
              <span style={{fontWeight: 'bold'}}>Beta Tester</span>
            </label>
            <div style={{marginTop: '0.25rem', fontSize: '0.85rem', color: '#666'}}>
              Affects: Beta Features Program, Real-time Collaboration
            </div>
          </div>

          {/* Account Age */}
          <div style={{marginBottom: '1rem'}}>
            <label style={{display: 'block', fontWeight: 'bold', marginBottom: '0.5rem'}}>
              Account Age: {user.accountAge} days
            </label>
            <input
              type="range"
              min="0"
              max="365"
              value={user.accountAge}
              onChange={(e) => handlePropertyChange('accountAge', parseInt(e.target.value))}
              style={{width: '100%'}}
            />
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#666'}}>
              <span>0 days</span>
              <span>365 days</span>
            </div>
            <div style={{marginTop: '0.25rem', fontSize: '0.85rem', color: '#666'}}>
              Can be used for: Onboarding flows, veteran user features
            </div>
          </div>

          {/* Feature Usage Count */}
          <div style={{marginBottom: '1rem'}}>
            <label style={{display: 'block', fontWeight: 'bold', marginBottom: '0.5rem'}}>
              Feature Usage Count: {user.featureUsageCount}
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={user.featureUsageCount}
              onChange={(e) => handlePropertyChange('featureUsageCount', parseInt(e.target.value))}
              style={{width: '100%'}}
            />
            <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#666'}}>
              <span>0 uses</span>
              <span>100 uses</span>
            </div>
            <div style={{marginTop: '0.25rem', fontSize: '0.85rem', color: '#666'}}>
              Affects: Advanced Analytics (requires {'>'} 50 uses)
            </div>
          </div>

          <div style={{marginTop: '1rem', padding: '0.75rem', backgroundColor: '#fff3e0', borderRadius: '4px', color: '#000'}}>
            <strong>⚠️ Note:</strong> Changing properties will reload the page to reinitialize
            the SDK with new custom properties.
          </div>
        </div>
      )}

      <div style={{marginTop: '1rem', padding: '0.5rem', backgroundColor: '#e3f2fd', borderRadius: '4px', color: '#000'}}>
        <small>
          <strong>Real-World Implementation:</strong> In production, custom properties come from your
          user database, authentication service, or session data. They're set once when the SDK
          initializes and automatically used for all targeting decisions.
        </small>
      </div>
    </div>
  );
};
