import './App.css'
import { CommonPage } from './CommonPage/CommonPage.tsx'
import { DashboardContent } from './Dashboard/Dashboard.tsx'
import Device from './Device/Device.tsx'
import RBACContent from './RBAC/Rbac.tsx'
import { SystemHealthContent } from './SystemHealth/SystemHealth.tsx'
import User from './User/User.tsx'

function App() {
  return (
    <CommonPage>
        <RBACContent />
    </CommonPage>
  )
}

export default App
