import React, { useState } from 'react';
import './SystemHealth.css';
import { CommonPage } from '../CommonPage/CommonPage';
import { systemData, serverData } from '../Model/Model';

export function SystemHealthContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(systemData.length / rowsPerPage);
  const safePage = Math.min(currentPage, totalPages || 1);
  const startIndex = (safePage - 1) * rowsPerPage;
  const paginatedSafeData = systemData.slice(startIndex, startIndex + rowsPerPage);
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
    <CommonPage>
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

        {/* Table Pagination */}
        <div className="pagination-container">
          <button className="pagination-btn" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={safePage === 1}>
            ❬
            </button>
            <span>Page {safePage} of {totalPages}</span>
            <button className="pagination-btn" onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={safePage === totalPages || totalPages === 0}>
            ❭
          </button>
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
    </CommonPage>
  );
}

export default SystemHealthContent;