import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login/Login.tsx'
import { DashboardContent } from './Dashboard/Dashboard.tsx'
import { DeviceContent } from './Device/Device.tsx'
import { UserContent } from './User/User.tsx'
import { SystemHealthContent } from './SystemHealth/SystemHealth.tsx'
import { RBACContent } from './RBAC/Rbac.tsx'
import { EditProfileContent } from './EditProfile/EditProfile.tsx'
import { NotificationContent } from './Notification/Notification.tsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardContent />} />
        <Route path="/devices" element={<DeviceContent />} />
        <Route path="/users" element={<UserContent />} />
        <Route path="/system-health" element={<SystemHealthContent />} />
        <Route path="/rbac" element={<RBACContent />} />
        <Route path="/editprofile" element={<EditProfileContent />} />
        <Route path="/notifications" element={<NotificationContent />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
