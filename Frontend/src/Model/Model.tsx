//For notification -> Done
export const initialNotifications = [
  { id: 1, name: 'John', message: 'John Registered', isNew: true },
  { id: 2, name: 'Smith', message: 'Smith Registered', isNew: true },
  { id: 3, name: 'Lauren', message: 'Lauren Registered', isNew: false },
  { id: 4, name: 'Kim', message: 'Kim Registered', isNew: false },
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

export interface DeviceConnectDataItem {
  type: string;
  model: string;
  connectivity: string;
}

//For RBAC
export interface UserRoleUpdate {
export interface UserPermission {
  id: number;
  name: string;
  family: boolean;
  staff: boolean;
}

export interface SystemDataItem {
  id?: number | string;
  type: string;
  deviceModel: string;
  bettry: string | number;
  temperature: number;
  status: string;
}

export interface ServerDataItem {
  id?: number | string;
  server: string;
  status: string;
}

export interface UserDataItem {
  name: string;
  email: string;
  deviceType: string;
  paymentInfo: string;
}