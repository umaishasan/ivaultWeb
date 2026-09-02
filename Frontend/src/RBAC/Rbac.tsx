import { useEffect, useState } from 'react';
import './Rbac.css';
import { CommonPage } from '../CommonPage/CommonPage';
import type { UserPermission } from '../Model/Model';

export function RBACContent() {
  var rbacDataUrl = 'http://localhost:5000/api/rbac';
  var rbacUpdateUrl = 'http://localhost:5000/api/rbac/update';
  const [permissions, setPermissions] = useState<UserPermission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(rbacDataUrl).then((res) => res.json()).then((result) => {
      if(result.success) {
        // Backend keys ko frontend format me mapping karein
        const formattedData = result.data.map((item: any) => ({
          id: item.Id ?? item.id,
          name: item.Name?.trim() || item.name,
          email: item.UserEmail, 
          family: Boolean(item.Family ?? item.family),
          staff: Boolean(item.Staff ?? item.staff)
        })).filter((user: any) => user.id !== undefined && user.id !== null);
        setPermissions(formattedData);
      }else{
        console.log("Faild to load data");
      }
    }).catch((error) => {
      console.error('Error fetching RBAC data:', error);
    }).finally(() => setLoading(false));
  },[]);

  // Toggle handler to make the UI functional
  const handlePermissionChange = async (id: number, role: 'family' | 'staff') => {
    const currentUser = permissions.find(user => user.id === id);
    if(!currentUser) return;
    const newFamily = role === 'family' ? !currentUser.family : false;
    const newStaff = role === 'staff' ? !currentUser.staff : false;

    setPermissions(prev =>
      prev.map(user => user.id === id ? { ...user, family: newFamily, staff: newStaff } : user)
    );

     // Phir usi user ki id + email ke sath database update karein
  await handleSaveChanges(id, currentUser.email, newFamily, newStaff);
  };

  const handleSaveChanges = async (id: number, email: string, family: boolean, staff: boolean) => {
    try{
      const response = await fetch(rbacUpdateUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id: id,
          email: email, 
          family: family ? 1 : 0, 
          staff: staff ? 1 : 0,
        }),
      });
      const result = await response.json();
      if(result.success){
        console.log(`Successfully updated permissions for ${id}`);
      }else{
        console.error(`Failed to update permissions for ${id}:`, result.error);
      }
    }catch (err){
      console.error('Error updating RBAC data:', err);
    }
  };

  return (
    <CommonPage>
      <div className="rbac-container">
      {/* Header section */}
      <div className="rbac-header">
        <h1 className="rbac-title">Role Base Access Control</h1>
        <p className="rbac-subtitle">All user access permission</p>
      </div>

      {/* Table Card Layout */}
      <div className="rbac-table-card">
        <div className="table-top-bar">
          <h2 className="table-top-title">User Access Permission</h2>
        </div>

        {/* Responsive Permissions Table */}
        <div className="rbac-table-responsive">
          <table className="rbac-table">
            <thead>
              <tr>
                <th className="col-name">Name</th>
                <th className="col-center" style={{ width: '25%' }}>Family</th>
                <th className="col-center" style={{ width: '25%' }}>Staff</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {permissions.map((user) => (
                //console.log('Rendering user:', user.id, user.name, user.family, user.staff), // Debug log to check user data
                <tr key={user.id}>
                  {/* Name cell with left alignment matching the mockup layout */}
                  <td className="col-name" style={{ color: '#ffffff', fontWeight: 500 }}>
                    {user.name}
                  </td>

                  {/* Family Checkbox */}
                  <td className="col-center">
                    <label className="custom-checkbox-container" htmlFor={`family-${user.id}`}>
                      <input
                        id={`family-${user.id}`}
                        type="checkbox"
                        checked={user.family}
                        onChange={() => handlePermissionChange(user.id, 'family')}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </td>

                  {/* Staff Checkbox */}
                  <td className="col-center">
                    <label className="custom-checkbox-container" htmlFor={`staff-${user.id}`}>
                      <input
                        id={`staff-${user.id}`}
                        type="checkbox"
                        checked={user.staff}
                        onChange={() => handlePermissionChange(user.id, 'staff')}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </CommonPage>
  );
}

export default RBACContent;