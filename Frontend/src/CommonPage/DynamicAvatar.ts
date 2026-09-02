import React from 'react';
import { getInitials, stringToColor } from './Util';

interface DynamicAvatarProps {
  name?: string;
  size?: number; // In pixels, default 40
  className?: string; // Replace 'avatar' style
}

const DynamicAvatar: React.FC<DynamicAvatarProps> = ({ 
  name, 
  size = 40, 
  className = 'dynamic-initial-avatar' 
}) => {
  const initials = getInitials(name || '');
  const backgroundColor = name ? stringToColor(name) : '#ccc';

  const avatarStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    backgroundColor: backgroundColor,
    color: 'white',
    fontWeight: 'bold',
    fontSize: `${size / 2.5}px`, // Scalable font size
    userSelect: 'none',
    overflow: 'hidden',
  };

  return (
    <div style={avatarStyle} className={className}>
      {initials}
    </div>
  );
};

export default DynamicAvatar;