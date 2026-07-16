import React, { useState } from 'react';
import './dashboard.css';
import { CommonPage } from '../CommonPage/CommonPage';
import PeopleIcon from '@mui/icons-material/People';
import { safeData } from '../Model/Model';

// SVG Icons directly added for a modern clean look matching the UI Mockup
const ShieldIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const UserIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export function DashboardContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(safeData.length / rowsPerPage);
  const safePage = Math.min(currentPage, totalPages || 1);
  const startIndex = (safePage - 1) * rowsPerPage;
  const paginatedSafeData = safeData.slice(startIndex, startIndex + rowsPerPage);

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
            <h2 className="table-section-title">Safe Registration and Firmware Version Distribution</h2>
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
                  {paginatedSafeData.map((safe, index) => (
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
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={safePage === 1}
              >
                ❬
              </button>
              <span>Page {safePage} of {totalPages}</span>
              <button
                className="pagination-btn"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={safePage === totalPages || totalPages === 0}
              >
                ❭
              </button>
            </div>
          </div>
        </div>
    </CommonPage>
  );
}