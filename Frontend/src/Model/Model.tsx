//For notification
export const initialNotifications = [
  { id: 1, name: 'John', message: 'John Registered', isNew: true },
  { id: 2, name: 'Smith', message: 'Smith Registered', isNew: true },
  { id: 3, name: 'Lauren', message: 'Lauren Registered', isNew: false },
  { id: 4, name: 'Kim', message: 'Kim Registered', isNew: false },
];

//For devices
export const initialDevices = [
  { type: 'Big Safe', name: 'SafeVault-091', connectivity: 'Active' },
  { type: 'Small Safe', name: 'SafeVault-114', connectivity: 'Active' },
  { type: 'Big Safe', name: 'SafeVault-091', connectivity: 'Active' },
  { type: 'Small Safe', name: 'SafeVault-114', connectivity: 'Inactive' }, // Orange Inactive
  { type: 'Big Safe', name: 'SafeVault-091', connectivity: 'Active' },
  { type: 'Small Safe', name: 'SafeVault-113', connectivity: 'Inactive' },    // Red Inactive
  { type: 'Big Safe', name: 'SafeVault-091', connectivity: 'Active' },
  { type: 'Pistol', name: 'D17', connectivity: 'None' },                          // Dash '-' state
  { type: 'Pistol', name: 'Desert Eagle', connectivity: 'None' },                 // Dash '-' state
];

//For dashboard
export const safeData = [
  { id: 'SafeVault-091', date: '8/17/2023 2:00 PM', status: 'Online', firmware: 'v2.1.3' },
  { id: 'SafeVault-114', date: '8/17/2023 2:00 PM', status: 'Online', firmware: 'v2.1.3' },
  { id: 'SafeVault-091', date: '8/17/2023 2:00 PM', status: 'Online', firmware: 'v2.1.3' },
  { id: 'SafeVault-114', date: '8/17/2023 2:00 PM', status: 'Offline', firmware: 'v2.2.3' },
  { id: 'SafeVault-113', date: '8/17/2023 2:00 PM', status: 'Offline', firmware: 'v2.2.3' },
  { id: 'SafeVault-113', date: '8/17/2023 2:00 PM', status: 'Offline', firmware: 'v2.2.3' },
  { id: 'SafeVault-113', date: '8/17/2023 2:00 PM', status: 'Online', firmware: 'v2.2.3' },
  { id: 'SafeVault-113', date: '8/17/2023 2:00 PM', status: 'Online', firmware: 'v2.2.3' },
  { id: 'SafeVault-113', date: '8/17/2023 2:00 PM', status: 'Online', firmware: 'v2.2.3' },
  { id: 'SafeVault-113', date: '8/17/2023 2:00 PM', status: 'Online', firmware: 'v2.2.3' },
  { id: 'SafeVault-113', date: '8/17/2023 2:00 PM', status: 'Online', firmware: 'v2.3.3' },
  { id: 'SafeVault-113', date: '8/17/2023 2:00 PM', status: 'Offline', firmware: 'v2.3.3' },
  { id: 'SafeVault-113', date: '8/17/2023 2:00 PM', status: 'Offline', firmware: 'v2.3.3' },
  { id: 'SafeVault-113', date: '8/17/2023 2:00 PM', status: 'Offline', firmware: 'v2.1.3' },
  { id: 'SafeVault-113', date: '8/17/2023 2:00 PM', status: 'Offline', firmware: 'v1.1.3' },
  { id: 'SafeVault-113', date: '8/17/2023 2:00 PM', status: 'Online', firmware: 'v1.1.3' },
  { id: 'SafeVault-113', date: '8/17/2023 2:00 PM', status: 'Online', firmware: 'v1.1.3' },
  { id: 'SafeVault-113', date: '8/17/2023 2:00 PM', status: 'Online', firmware: 'v1.1.3' },
  { id: 'SafeVault-113', date: '8/17/2023 2:00 PM', status: 'Online', firmware: 'v1.1.2' },
  { id: 'SafeVault-113', date: '8/17/2023 2:00 PM', status: 'Online', firmware: 'v1.1.2' },
  { id: 'SafeVault-113', date: '8/17/2023 2:00 PM', status: 'Online', firmware: 'v1.1.2' },
  { id: 'SafeVault-113', date: '8/17/2023 2:00 PM', status: 'Offline', firmware: 'v1.1.2' },
  { id: 'SafeVault-113', date: '8/17/2023 2:00 PM', status: 'Offline', firmware: 'v1.2.3' },
  { id: 'SafeVault-113', date: '8/17/2023 2:00 PM', status: 'Offline', firmware: 'v1.2.3' },
  { id: 'SafeVault-113', date: '8/17/2023 2:00 PM', status: 'Offline', firmware: 'v2.2.3' },
  { id: 'SafeVault-113', date: '8/17/2023 2:00 PM', status: 'Offline', firmware: 'v2.1.3' },
  { id: 'SafeVault-113', date: '8/17/2023 2:00 PM', status: 'Offline', firmware: 'v2.1.3' },
  { id: 'SafeVault-113', date: '8/17/2023 2:00 PM', status: 'Offline', firmware: 'v2.1.3' },
  { id: 'SafeVault-113', date: '8/17/2023 2:00 PM', status: 'Offline', firmware: 'v2.1.3' },
  { id: 'SafeVault-113', date: '8/17/2023 2:00 PM', status: 'Offline', firmware: 'v2.1.3' },
];

//For RBAC
export const initialUserPermissions = [
  { id: 1, name: 'John', family: true, staff: false },
  { id: 2, name: 'Smith', family: true, staff: false },
  { id: 3, name: 'Lauren', family: false, staff: true },
  { id: 4, name: 'Kim', family: false, staff: true },
  { id: 5, name: 'Yannik', family: false, staff: true },
  { id: 6, name: 'Donnal', family: false, staff: true },
  { id: 7, name: 'Danny', family: false, staff: true },
  { id: 8, name: 'Louis', family: false, staff: true },
  { id: 9, name: 'John', family: false, staff: true },
];

//For system health -> system health
export const systemData = [
  { type: 'Small Safe', name: 'SafeVault-114', battery: '92%', temp: '22', status: 'Excellent' },
  { type: 'Big Safe', name: 'SafeVault-091', battery: '35%', temp: '40', status: 'Bad' },
  { type: 'Big Safe', name: 'SafeVault-091', battery: '68%', temp: '25', status: 'Good' },
  { type: 'Small Safe', name: 'SafeVault-114', battery: '85%', temp: '16', status: 'Excellent' },
  { type: 'Pistol Vault', name: 'PistolVault-102', battery: '50%', temp: '28', status: 'Good' },
];

//For system health -> server health
export const serverData = [
  { server: 'Azure Cloud', status: 'Available' }
];

//For User
export const initialUsers = [
  { name: 'John', email: 'john123@gmail.com', deviceType: 'Big Safe', paymentInfo: 'Paid' },
  { name: 'Smith', email: 'Smith@gmail.com', deviceType: 'Big Safe', paymentInfo: 'Trail' }, // Note: Keeping 'Trail' typo as in mock or can be 'Trial'
  { name: 'Lauren', email: 'lauren123@gmail.com', deviceType: 'Pistol', paymentInfo: 'Paid' },
  { name: 'Kim', email: 'Kim23@gmail.com', deviceType: 'Small Safe', paymentInfo: 'Paid' },
  { name: 'Yannik', email: 'Yannik45@gmail.com', deviceType: 'Pistol', paymentInfo: 'Trail' },
  { name: 'Donnal', email: 'donal66@gmail.com', deviceType: 'Big Safe', paymentInfo: 'Paid' },
  { name: 'Danny', email: 'jdanny123@gmail.com', deviceType: 'Small Safe', paymentInfo: 'Paid' },
  { name: 'Louis', email: 'louis93@gmail.com', deviceType: 'Small Safe', paymentInfo: 'Trail' },
  { name: 'John', email: 'john123@gmail.com', deviceType: 'Small Safe', paymentInfo: 'Trail' },
];