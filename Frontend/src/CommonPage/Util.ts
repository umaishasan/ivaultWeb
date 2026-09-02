export const getInitials = (name: string): string => {
  if (!name || name.trim() === '') {
    return '?';
  }
  const parts = name.trim().split(' ');
  let initials = parts[0].substring(0, 1).toUpperCase();
  if (parts.length > 1) {
    initials += parts[parts.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

// Simple hash function to generate a persistent color
export const stringToColor = (string: string): string => {
  let hash = 0;
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substring(-2); // Updated padding logic
  }
  return color;
};