import React, { useState } from 'react';
import './SystemHealth.css';

// Mock Data from the System Health Image
const systemData = [
  { type: 'Small Safe', name: 'SafeVault-114', battery: '92%', temp: '22', status: 'Excellent' },
  { type: 'Big Safe', name: 'SafeVault-109', battery: '35%', temp: '40', status: 'Bad' },
  { type: 'Big Safe', name: 'SafeVault-109', battery: '68%', temp: '25', status: 'Good' },
  { type: 'Small Safe', name: 'SafeVault-114', battery: '85%', temp: '16', status: 'Excellent' },
  { type: 'Pistol Vault', name: 'PistolVault-102', battery: '50%', temp: '28', status: 'Good' },
];

const serverData = [
  { server: 'Azure Cloud', status: 'Available' }
];

export function SystemHealthContent() {
  const [deviceFilter, setDeviceFilter] = useState('All');

  // Filter dynamic logic
  const filteredSystemData = deviceFilter === 'All'
    ? systemData
    : systemData.filter(item => item.type === deviceFilter);

  // Helper to color-code statuses correctly
  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'excellent':
        return 'status-excellent';
      case 'good':
        return 'status-good';
      case 'bad':
        return 'status-bad';
      case 'available':
        return 'status-available';
      default:
        return '';
    }
  };

  return (
    <div className="health-container">
      {/* Page Title Header */}
      <div className="health-header">
        <h1 className="health-title">System Health</h1>
        <p className="health-subtitle">System information and server information</p>
      </div>

      {/* 1st Table Card: System Information */}
      <div className="health-card">
        <div className="table-top-bar">
          <h2 className="table-top-title">System Information</h2>
          <select 
            className="health-select"
            value={deviceFilter}
            onChange={(e) => setDeviceFilter(e.target.value)}
          >
            <option value="All">Device Type</option>
            <option value="Big Safe">Big Safe</option>
            <option value="Small Safe">Small Safe</option>
            <option value="Pistol Vault">Pistol Vault</option>
          </select>
        </div>

        <div className="health-table-responsive">
          <table className="health-table">
            <thead>
              <tr>
                <th>Device Type</th>
                <th>Device Name</th>
                <th>Bettry</th> {/* Kept as in mockup image "BETTRY" */}
                <th>Temperature(°C)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {filteredSystemData.map((item, index) => (
                <tr key={index}>
                  <td style={{ color: '#ffffff', fontWeight: 500 }}>{item.type}</td>
                  <td style={{ color: '#8b94a5' }}>{item.name}</td>
                  <td style={{ color: '#8b94a5' }}>{item.battery}</td>
                  <td style={{ color: '#8b94a5' }}>{item.temp}</td>
                  <td className={getStatusClass(item.status)} style={{ fontWeight: 500 }}>
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* System Information Table Pagination */}
        <div className="health-pagination">
          <button className="pagination-btn">❬</button>
          <span>Page 1 to 50</span>
          <button className="pagination-btn">❭</button>
        </div>
      </div>

      {/* 2nd Table Card: Server Information */}
      <div className="health-card">
        <div className="table-top-bar">
          <h2 className="table-top-title">Server Information</h2>
        </div>

        <div className="health-table-responsive">
          <table className="health-table">
            <thead>
              <tr>
                <th>Server</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {serverData.map((server, index) => (
                <tr key={index}>
                  <td style={{ color: '#ffffff', fontWeight: 500 }}>{server.server}</td>
                  <td className={getStatusClass(server.status)} style={{ fontWeight: 500 }}>
                    {server.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SystemHealthContent;