import  { useState } from 'react';
import './Dashboard.css';
import { CommonPage } from '../CommonPage/CommonPage';
import PeopleIcon from '@mui/icons-material/People';
import { safeData } from '../Model/Model';

export function DashboardContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(safeData.length / rowsPerPage);
  const safePage = Math.min(currentPage, totalPages || 1);

  const [firmwareFilter, setFirmwareFilter] = useState('All');
  const [connectionFilter, setConnectionFilter] = useState('All');

  // Multi-filtering logic for Firmware & Connection Status
  const filteredSafeData = safeData.filter(safe => {
    const matchFirmware = firmwareFilter === 'All' || safe.firmware === firmwareFilter;
    const matchConnection = connectionFilter === 'All' || safe.status === connectionFilter;
    return matchFirmware && matchConnection;
  });

  return (
    <CommonPage>
        <div className="dashboard-container">
          {/* Upper Titles */}
          <div className="dashboard-header">
            <h1 className="dashboard-title">Manufacturer Admin Dashboard</h1>
            <p className="dashboard-subtitle">Overview and distribution statistics of your registered safes.</p>
          </div>

          {/* Stats Section */}
          <div className="stats-grid">
            
            {/* Connectivity Status Card */}
            <div className="stat-card">
              <h3 className="card-title">Connectivity Status</h3>
              <div className="status-sub-group">
                <div className="sub-value-wrapper">
                  <span className="stat-value">720</span>
                  <span className="status-badge badge-active">
                    <span className="status-dot dot-active"></span> ACTIVE
                  </span>
                </div>
                <div className="sub-value-wrapper">
                  <span className="stat-value" style={{ color: '#d1d5db' }}>130</span>
                  <span className="status-badge badge-inactive">
                    <span className="status-dot dot-inactive"></span> INACTIVE
                  </span>
                </div>
              </div>
            </div>

            {/* Total Safes Card */}
            <div className="stat-card">
              <h3 className="card-title">Total Safes</h3>
              <div className="card-value-group">
                <span className="stat-value">850</span>
              </div>
            </div>

            {/* Total Users Card */}
            <div className="stat-card">
              <h3 className="card-title">Total Users</h3>
              <div className="card-value-group">
                <PeopleIcon />
                <span className="stat-value">980</span>
              </div>
            </div>
          </div>

          {/* Bottom Table Section */}
          <div className="table-section">
            <div className="table-top-bar">
            <h2 className="table-section-title">Safe Registration and Firmware Version Distribution</h2>
              <div className="table-filters">
                  {/* Firmware Filter */}
                <label className="user-select-label">Firmware:</label>
                <select className="user-select" value={firmwareFilter} onChange={(e) => setFirmwareFilter(e.target.value)}>
                  <option value="All">All</option>
                  <option value="v2.1.3">2.1.3</option>
                  <option value="v2.2.3">2.2.3</option>
                  <option value="v2.3.3">2.3.3</option>
                  <option value="v2.1.3">2.1.3</option>
                  <option value="v1.1.3">1.1.3</option>
                  <option value="v1.1.2">1.1.2</option>
                  <option value="v1.2.3">1.2.3</option>
                </select>

                {/* Connection Filter */}
                <label className="user-select-label">Connection Status:</label>
                <select className="user-select" value={connectionFilter} onChange={(e) => setConnectionFilter(e.target.value)}>
                  <option value="All">All</option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>
            </div>

            {/* Responsive Dashboard Table */}
            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Safe ID</th>
                    <th>Registration Date</th>
                    <th>Connection Status</th>
                    <th>Firmware Status</th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  {filteredSafeData.map((safe, index) => (
                    <tr key={index}>
                      <td style={{ color: '#ffffff', fontWeight: 500 }}>{safe.id}</td>
                      <td style={{ color: '#8b94a5' }}>{safe.date}</td>
                      <td>
                        <span className={`status-pill ${safe.status === 'Online' ? 'pill-online' : 'pill-offline'}`}>
                          <span className={`status-dot ${safe.status === 'Online' ? 'dot-active' : 'dot-inactive'}`} style={{ marginRight: '8px' }}></span>
                          {safe.status}
                        </span>
                      </td>
                      <td style={{ color: '#8b94a5' }}>{safe.firmware}</td>
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

        </div>
    </CommonPage>
  );
}