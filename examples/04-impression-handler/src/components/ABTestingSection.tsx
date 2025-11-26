import {useFeatureFlags} from "../feature-management";

/**
 * ABTestingSection demonstrates A/B testing patterns
 * Shows how different variants are assigned and displayed
 */
export const ABTestingSection = () => {
  const flags = useFeatureFlags();

  return (
    <div className="card">
      <h2>A/B Testing</h2>
      <p style={{fontSize: '0.9rem', color: '#666'}}>
        A/B testing allows you to experiment with different variants and measure which performs best.
        Each user is consistently assigned to one variant.
      </p>

      <div style={{marginTop: '1rem'}}>
        {/* Homepage Hero Variant */}
        <div style={{marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
          <h3 style={{marginTop: 0}}>Homepage Hero Design</h3>
          <div style={{marginBottom: '0.5rem'}}>
            <strong>Current Variant:</strong>{' '}
            <span style={{
              padding: '0.25rem 0.5rem',
              backgroundColor: '#1976d2',
              color: 'white',
              borderRadius: '4px',
              fontWeight: 'bold',
            }}>
              {flags.homepageHeroVariant.getValue()}
            </span>
          </div>

          {/* Show different hero designs based on variant */}
          <div style={{marginTop: '1rem', padding: '1rem', border: '2px solid #1976d2', borderRadius: '4px', color: '#000'}}>
            {flags.homepageHeroVariant.getValue() === 'control' && (
              <div>
                <h4>Original Hero (Control)</h4>
                <p>Traditional hero section with centered text and single CTA button.</p>
              </div>
            )}
            {flags.homepageHeroVariant.getValue() === 'variant-a' && (
              <div>
                <h4>Variant A: Bold & Visual</h4>
                <p>Large background image with overlaid text and dual CTA buttons.</p>
              </div>
            )}
            {flags.homepageHeroVariant.getValue() === 'variant-b' && (
              <div>
                <h4>Variant B: Minimalist</h4>
                <p>Clean, minimalist design with subtle animation and inline signup form.</p>
              </div>
            )}
          </div>

          <div style={{marginTop: '0.5rem', fontSize: '0.85rem', color: '#666'}}>
            <strong>Test Goal:</strong> Measure signup conversion rate
          </div>
        </div>

        {/* CTA Button Variant */}
        <div style={{marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
          <h3 style={{marginTop: 0}}>Call-to-Action Button</h3>
          <div style={{marginBottom: '0.5rem'}}>
            <strong>Current Variant:</strong>{' '}
            <span style={{
              padding: '0.25rem 0.5rem',
              backgroundColor: '#4caf50',
              color: 'white',
              borderRadius: '4px',
              fontWeight: 'bold',
            }}>
              {flags.ctaButtonVariant.getValue()}
            </span>
          </div>

          {/* Show actual button with the variant style */}
          <div style={{marginTop: '1rem'}}>
            <button
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                backgroundColor:
                  flags.ctaButtonVariant.getValue() === 'blue' ? '#2196F3' :
                  flags.ctaButtonVariant.getValue() === 'green' ? '#4CAF50' :
                  flags.ctaButtonVariant.getValue() === 'orange' ? '#FF9800' :
                  '#F44336',
                color: 'white',
              }}
            >
              Get Started Now
            </button>
          </div>

          <div style={{marginTop: '0.5rem', fontSize: '0.85rem', color: '#666'}}>
            <strong>Test Goal:</strong> Measure click-through rate by button color
          </div>
        </div>

        {/* Pricing Page Layout */}
        <div style={{marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
          <h3 style={{marginTop: 0}}>Pricing Page Layout</h3>
          <div style={{marginBottom: '0.5rem'}}>
            <strong>Current Variant:</strong>{' '}
            <span style={{
              padding: '0.25rem 0.5rem',
              backgroundColor: '#9c27b0',
              color: 'white',
              borderRadius: '4px',
              fontWeight: 'bold',
            }}>
              {flags.pricingPageLayout.getValue()}
            </span>
          </div>

          <div style={{marginTop: '1rem', padding: '1rem', border: '2px solid #9c27b0', borderRadius: '4px', color: '#000'}}>
            {flags.pricingPageLayout.getValue() === 'monthly-first' && (
              <div>
                <p><strong>Layout:</strong> Monthly pricing displayed prominently, annual pricing secondary</p>
                <p style={{fontSize: '0.85rem', color: '#666'}}>Hypothesis: Users prefer seeing monthly costs first</p>
              </div>
            )}
            {flags.pricingPageLayout.getValue() === 'annual-first' && (
              <div>
                <p><strong>Layout:</strong> Annual pricing displayed prominently with savings highlighted</p>
                <p style={{fontSize: '0.85rem', color: '#666'}}>Hypothesis: Highlighting annual savings increases conversions</p>
              </div>
            )}
            {flags.pricingPageLayout.getValue() === 'side-by-side' && (
              <div>
                <p><strong>Layout:</strong> Monthly and annual pricing side-by-side for easy comparison</p>
                <p style={{fontSize: '0.85rem', color: '#666'}}>Hypothesis: Direct comparison helps decision-making</p>
              </div>
            )}
          </div>

          <div style={{marginTop: '0.5rem', fontSize: '0.85rem', color: '#666'}}>
            <strong>Test Goal:</strong> Measure paid conversion rate
          </div>
        </div>
      </div>

      <div style={{marginTop: '1rem', padding: '0.5rem', backgroundColor: '#e8f5e9', borderRadius: '4px', color: '#000'}}>
        <small>
          <strong>How it works:</strong> Each user is consistently assigned to one variant based on their user ID.
          In the CloudBees platform, you can use percentage rollouts or custom targeting rules to control
          variant distribution. Impression handlers track which variant each user sees for analytics.
        </small>
      </div>
    </div>
  );
};
