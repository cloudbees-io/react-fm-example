import {getEnvironmentConfig, getCurrentEnvironment, setEnvironment, Environment} from "../config";

/**
 * EnvironmentBanner displays the current environment
 * This helps developers know which configuration is active
 */
export const EnvironmentBanner = () => {
  const envConfig = getEnvironmentConfig();
  const currentEnv = getCurrentEnvironment();

  const handleEnvironmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newEnv = e.target.value as Environment;
    setEnvironment(newEnv);
    // Reload the page to reinitialize flags with new environment defaults
    window.location.reload();
  };

  return (
    <div
      style={{
        padding: '0.75rem',
        backgroundColor: envConfig.color,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        borderRadius: '4px',
        marginBottom: '1rem',
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem'}}>
        <span>Environment:</span>
        <select
          value={currentEnv}
          onChange={handleEnvironmentChange}
          style={{
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
            border: '2px solid white',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          <option value="development" style={{color: '#000'}}>Development</option>
          <option value="staging" style={{color: '#000'}}>Staging</option>
          <option value="production" style={{color: '#000'}}>Production</option>
        </select>
      </div>
      <div style={{fontSize: '0.85rem', fontWeight: 'normal', marginTop: '0.25rem'}}>
        {envConfig.description}
      </div>
    </div>
  );
};
