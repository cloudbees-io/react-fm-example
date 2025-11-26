import {useState, useEffect} from "react";
import {
  getImpressions,
  getImpressionCount,
  calculateABTestResults,
  clearImpressions
} from "../utils/analytics";

/**
 * AnalyticsDashboard shows impression tracking and A/B test results
 * Demonstrates how to collect and analyze flag evaluation data
 */
export const AnalyticsDashboard = () => {
  const [, setRefresh] = useState(0);
  const [showAllImpressions, setShowAllImpressions] = useState(false);

  // Refresh every 2 seconds to show new impressions
  useEffect(() => {
    const interval = setInterval(() => {
      setRefresh(r => r + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const impressions = getImpressions();
  const totalImpressions = impressions.length;

  // Get A/B test results for key flags
  const heroResults = calculateABTestResults('homepageHeroVariant');
  const ctaResults = calculateABTestResults('ctaButtonVariant');
  const pricingResults = calculateABTestResults('pricingPageLayout');

  return (
    <div className="card">
      <h2>Analytics Dashboard</h2>
      <p style={{fontSize: '0.9rem', color: '#666'}}>
        Track flag impressions and A/B test results in real-time. In production, this data would
        be sent to your analytics service (Google Analytics, Amplitude, Mixpanel, etc.).
      </p>

      {/* Summary Stats */}
      <div style={{
        marginTop: '1rem',
        padding: '1rem',
        backgroundColor: '#e3f2fd',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'space-around',
      }}>
        <div style={{textAlign: 'center'}}>
          <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#1976d2'}}>{totalImpressions}</div>
          <div style={{fontSize: '0.85rem', color: '#666'}}>Total Impressions</div>
        </div>
        <div style={{textAlign: 'center'}}>
          <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#4caf50'}}>
            {new Set(impressions.map(i => i.userId)).size}
          </div>
          <div style={{fontSize: '0.85rem', color: '#666'}}>Unique Users</div>
        </div>
        <div style={{textAlign: 'center'}}>
          <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#ff9800'}}>
            {new Set(impressions.map(i => i.flagName)).size}
          </div>
          <div style={{fontSize: '0.85rem', color: '#666'}}>Flags Tracked</div>
        </div>
      </div>

      {/* A/B Test Results */}
      <div style={{marginTop: '1.5rem'}}>
        <h3>A/B Test Results</h3>

        {/* Homepage Hero */}
        {heroResults.length > 0 && (
          <div style={{marginBottom: '1rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
            <strong>Homepage Hero Variant</strong>
            <div style={{marginTop: '0.5rem'}}>
              {heroResults.map(result => (
                <div key={result.variant} style={{display: 'flex', alignItems: 'center', marginTop: '0.25rem'}}>
                  <span style={{minWidth: '100px'}}>{result.variant}:</span>
                  <div style={{
                    flex: 1,
                    height: '20px',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    marginRight: '0.5rem',
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${result.percentage}%`,
                      backgroundColor: '#1976d2',
                    }} />
                  </div>
                  <span style={{minWidth: '80px', textAlign: 'right'}}>
                    {result.impressions} ({result.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Button */}
        {ctaResults.length > 0 && (
          <div style={{marginBottom: '1rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
            <strong>CTA Button Variant</strong>
            <div style={{marginTop: '0.5rem'}}>
              {ctaResults.map(result => (
                <div key={result.variant} style={{display: 'flex', alignItems: 'center', marginTop: '0.25rem'}}>
                  <span style={{minWidth: '100px'}}>{result.variant}:</span>
                  <div style={{
                    flex: 1,
                    height: '20px',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    marginRight: '0.5rem',
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${result.percentage}%`,
                      backgroundColor: '#4caf50',
                    }} />
                  </div>
                  <span style={{minWidth: '80px', textAlign: 'right'}}>
                    {result.impressions} ({result.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pricing Layout */}
        {pricingResults.length > 0 && (
          <div style={{marginBottom: '1rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
            <strong>Pricing Page Layout</strong>
            <div style={{marginTop: '0.5rem'}}>
              {pricingResults.map(result => (
                <div key={result.variant} style={{display: 'flex', alignItems: 'center', marginTop: '0.25rem'}}>
                  <span style={{minWidth: '120px', fontSize: '0.85rem'}}>{result.variant}:</span>
                  <div style={{
                    flex: 1,
                    height: '20px',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    marginRight: '0.5rem',
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${result.percentage}%`,
                      backgroundColor: '#9c27b0',
                    }} />
                  </div>
                  <span style={{minWidth: '80px', textAlign: 'right'}}>
                    {result.impressions} ({result.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* All Impressions */}
      <div style={{marginTop: '1.5rem'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h3 style={{margin: 0}}>Recent Impressions</h3>
          <div>
            <button
              onClick={() => setShowAllImpressions(!showAllImpressions)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#1976d2',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '0.5rem',
              }}
            >
              {showAllImpressions ? 'Hide' : 'Show All'}
            </button>
            <button
              onClick={() => {
                clearImpressions();
                setRefresh(r => r + 1);
              }}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Clear
            </button>
          </div>
        </div>

        {showAllImpressions && impressions.length > 0 && (
          <div style={{
            marginTop: '1rem',
            maxHeight: '300px',
            overflowY: 'auto',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            padding: '0.5rem',
          }}>
            {impressions.slice(-20).reverse().map((impression, index) => (
              <div
                key={index}
                style={{
                  padding: '0.5rem',
                  marginBottom: '0.5rem',
                  backgroundColor: 'white',
                  borderRadius: '4px',
                  fontSize: '0.85rem',
                }}
              >
                <div><strong>{impression.flagName}</strong> = {String(impression.flagValue)}</div>
                <div style={{color: '#666', fontSize: '0.8rem'}}>
                  {impression.timestamp.toLocaleTimeString()} |
                  User: {impression.userId?.substr(0, 10)}... |
                  Tier: {impression.context?.userTier}
                </div>
              </div>
            ))}
          </div>
        )}

        {impressions.length === 0 && (
          <div style={{marginTop: '1rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px', textAlign: 'center', color: '#666'}}>
            No impressions tracked yet. Interact with flags to see impressions appear here.
          </div>
        )}
      </div>

      <div style={{marginTop: '1rem', padding: '0.5rem', backgroundColor: '#fff3e0', borderRadius: '4px', color: '#000'}}>
        <small>
          <strong>Production Integration:</strong> In a real application, impression data would be sent
          to your analytics platform using their SDK. For example, with Amplitude:
          <code style={{display: 'block', marginTop: '0.5rem', padding: '0.5rem', backgroundColor: 'white', borderRadius: '4px', color: '#000'}}>
            amplitude.track('Feature Flag Viewed', &#123; flag: 'homepageHeroVariant', value: 'variant-a' &#125;)
          </code>
        </small>
      </div>
    </div>
  );
};
