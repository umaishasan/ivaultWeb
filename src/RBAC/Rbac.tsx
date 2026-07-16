import React, { useState } from 'react';
import './RBAC.css';
import { CommonPage } from '../CommonPage/CommonPage';
import { initialUserPermissions } from '../Model/Model';

export function RBACContent() {
  const [permissions, setPermissions] = useState(initialUserPermissions);

  // Toggle handler to make the UI functional
  const handlePermissionChange = (id: number, role: 'family' | 'staff') => {
    setPermissions(prev =>
      prev.map(user => {
        if (user.id === id) {
          return {
            ...user,
            // Automatically uncheck one when checking the other (standard RBAC behavior)
            family: role === 'family' ? !user.family : false,
            staff: role === 'staff' ? !user.staff : false,
          };
        }
        return user;
      })
    );
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
                <tr key={user.id}>
                  {/* Name cell with left alignment matching the mockup layout */}
                  <td className="col-name" style={{ color: '#ffffff', fontWeight: 500 }}>
                    {user.name}
                  </td>

                  {/* Family Checkbox */}
                  <td className="col-center">
                    <label className="custom-checkbox-container">
                      <input
                        type="checkbox"
                        checked={user.family}
                        onChange={() => handlePermissionChange(user.id, 'family')}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </td>

                  {/* Staff Checkbox */}
                  <td className="col-center">
                    <label className="custom-checkbox-container">
                      <input
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