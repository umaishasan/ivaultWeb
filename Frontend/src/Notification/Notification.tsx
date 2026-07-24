import { useState } from 'react';
import './Notification.css';
import { CommonPage } from '../CommonPage/CommonPage';
import { initialNotifications } from '../Model/Model';

export function NotificationContent() {
  const [notifications, setNotifications] = useState(initialNotifications);

  // Clear all notifications
  const handleClearAll = () => {
    setNotifications([]);
  };

  // Optional: Mark single notification as read on click
  const handleMarkAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notif => (notif.id === id ? { ...notif, isNew: false } : notif))
    );
  };

  return (
    <CommonPage>
      <div className="notification-container">
      {/* Header section */}
      <div className="notification-header">
        <h1 className="notification-title">Notification</h1>
        <p className="notification-subtitle">All notification show</p>
      </div>

      {/* Clear Button (Only shows if there are notifications) */}
      {notifications.length > 0 && (
        <div className="clear-btn-wrapper">
          <button className="btn-clear" onClick={handleClearAll}>
            Clear
          </button>
        </div>
      )}

      {/* Notifications Card Panel */}
      <div className="notification-card">
        {notifications.length > 0 ? (
          notifications.map((notif) => (
            <div 
              key={notif.id} 
              className="notification-item"
              onClick={() => handleMarkAsRead(notif.id)}
            >
              {/* Left Details */}
              <div className="notification-content">
                <span className="notification-user">{notif.name}</span>
                <span className="notification-msg">{notif.message}</span>
              </div>

              {/* Right Red Indicator */}
              {notif.isNew && <div className="unread-dot" title="New activity"></div>}
            </div>
          ))
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', color: '#5d6578', fontSize: '14px' }}>
            No notifications available.
          </div>
        )}
      </div>
      </div>
    </CommonPage>
  );
}

export default NotificationContent;