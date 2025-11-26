import {useFeatureFlags} from "../feature-management";
import {shouldShowNotificationType} from "../feature-management/flags";

/**
 * NotificationsSection demonstrates configuration-based nested flags where:
 * - A master notification flag controls the entire notification system
 * - Different notification channels can be individually toggled
 * - Shared configuration (like frequency) applies to all enabled channels
 */
export const NotificationsSection = () => {
  const flags = useFeatureFlags();

  const notificationsEnabled = flags.enableNotifications.isEnabled();

  return (
    <div className="card">
      <h2>Notifications</h2>

      <div style={{marginBottom: '1rem'}}>
        <strong>Master Flag:</strong>{' '}
        <span style={{color: notificationsEnabled ? 'green' : 'red'}}>
          enableNotifications = {notificationsEnabled ? 'ON' : 'OFF'}
        </span>
      </div>

      {!notificationsEnabled && (
        <p style={{fontStyle: 'italic', color: '#666'}}>
          All notifications are disabled. Enable 'enableNotifications' flag to configure notification channels.
        </p>
      )}

      {notificationsEnabled && (
        <div style={{marginLeft: '1rem', borderLeft: '3px solid #9C27B0', paddingLeft: '1rem'}}>
          <h3>Notification Channels:</h3>

          {/* Email Notifications */}
          <div style={{marginBottom: '0.5rem'}}>
            <strong>Email:</strong>{' '}
            <span style={{color: shouldShowNotificationType(flags.emailNotifications) ? 'green' : 'orange'}}>
              {flags.emailNotifications.isEnabled() ? 'ON' : 'OFF'}
            </span>
          </div>

          {/* Push Notifications */}
          <div style={{marginBottom: '0.5rem'}}>
            <strong>Push:</strong>{' '}
            <span style={{color: shouldShowNotificationType(flags.pushNotifications) ? 'green' : 'orange'}}>
              {flags.pushNotifications.isEnabled() ? 'ON' : 'OFF'}
            </span>
          </div>

          {/* SMS Notifications */}
          <div style={{marginBottom: '0.5rem'}}>
            <strong>SMS:</strong>{' '}
            <span style={{color: shouldShowNotificationType(flags.smsNotifications) ? 'green' : 'orange'}}>
              {flags.smsNotifications.isEnabled() ? 'ON' : 'OFF'}
            </span>
          </div>

          {/* Shared Configuration */}
          <div style={{marginTop: '1rem', padding: '0.5rem', backgroundColor: '#f5f5f5', borderRadius: '4px', color: '#000'}}>
            <strong>Shared Config:</strong>
            <div style={{marginTop: '0.5rem'}}>
              Notification Frequency: <strong>{flags.notificationFrequency.getValue()}</strong>
            </div>
            <small style={{fontStyle: 'italic'}}>
              This setting applies to all enabled notification channels
            </small>
          </div>
        </div>
      )}

      <div style={{marginTop: '1rem', padding: '0.5rem', backgroundColor: '#e0e0e0', borderRadius: '4px', color: '#000'}}>
        <small>
          <strong>Pattern:</strong> Master flag controls overall feature availability, while child
          flags enable specific channels. Shared configuration flags apply to all enabled channels,
          reducing redundancy and ensuring consistency.
        </small>
      </div>
    </div>
  );
};
