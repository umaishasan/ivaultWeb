import  { useState } from 'react';
import './Device.css';
import { CommonPage } from '../CommonPage/CommonPage';
import { initialDevices } from '../Model/Model';

export function DeviceContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(initialDevices.length / rowsPerPage);
    const safePage = Math.min(currentPage, totalPages || 1);
    //const startIndex = (safePage - 1) * rowsPerPage;
    //const paginatedSafeData = initialDevices.slice(startIndex, startIndex + rowsPerPage);
  const [deviceTypeFilter, setDeviceTypeFilter] = useState('All');
  const [connectivityFilter, setConnectivityFilter] = useState('All');

  //For Device: Filter logic (if you want functional select state)
  const filteredDevices = initialDevices.filter(device => {
    const matchDevice = deviceTypeFilter === 'All' || device.type === deviceTypeFilter;
    const matchConnectivity = connectivityFilter === 'All' || device.connectivity === connectivityFilter;
    return matchDevice && matchConnectivity;
  });

  
  // Connectivity column formatter helper
  const renderConnectivity = (status: string) => {
    switch (status) {
      case 'Active':
        return (
          <span className="conn-badge conn-active">
            <span className="conn-dot dot-active"></span>Active
          </span>
        );
      case 'Inactive':
        return (
          <span className="conn-badge conn-inactive">
            <span className="conn-dot dot-inactive"></span>Inactive
          </span>
        );
      default:
        return <span className="conn-none">-</span>;
    }
  };

  return (
    <CommonPage>
      <div className="device-container">
      {/* Header section */}
      <div className="device-header">
        <h1 className="device-title">Devices</h1>
        <p className="device-subtitle">Types of devices and their rates</p>
      </div>

      {/* Main Table Card Layout */}
      <div className="device-table-card">
        {/* Top Header bar with Title and Dropdown */}
        <div className="table-top-bar">
          <h2 className="table-top-title">User Information</h2>
          <div className="table-filters">
            {/* device Filter */}
            <label className="device-select-label">Device Type:</label>
            <select className="device-select" value={deviceTypeFilter} onChange={(e) => setDeviceTypeFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="Big Safe">Big Safe</option>
              <option value="Small Safe">Small Safe</option>
              <option value="Pistol">Pistol</option>
            </select>
            {/* Connectivity Filter */} 
            <label className="device-select-label">Connectivity:</label>
            <select className="device-select" value={connectivityFilter} onChange={(e) => setConnectivityFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
          
        {/* Responsive Table Grid */}
        <div className="device-table-responsive">
          <table className="device-table">
            <thead>
              <tr>
                <th>Device Type</th>
                <th>Device Name</th>
                <th>Connectivity</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {filteredDevices.map((device, index) => (
                <tr key={index}>
                  <td style={{ color: '#ffffff', fontWeight: 500 }}>{device.type}</td>
                  <td style={{ color: '#8b94a5' }}>{device.name}</td>
                  <td>{renderConnectivity(device.connectivity)}</td>
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

export default DeviceContent;