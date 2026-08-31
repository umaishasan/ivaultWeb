import { useState } from 'react';
import './SystemHealth.css';
import { CommonPage } from '../CommonPage/CommonPage';
import type { SystemDataItem, ServerDataItem } from '../Model/Model';
import { useEffect } from 'react';

export function SystemHealthContent() {
  var systemHealthUrl = 'http://localhost:5000/api/systemhealth';
  var serverHealthUrl = 'http://localhost:5000/api/server';
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [deviceFilter, setDeviceFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [tempFilter, setTempFilter] = useState('All');
  const [systemData, setSystemData] = useState<SystemDataItem[]>([]);
  const [serverData, setServerData] = useState<ServerDataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(systemHealthUrl).then((res) => res.json()).then((result) => {
      if(result.success) {
        const formattedData: SystemDataItem[] = result.data.map((item: any, index: number) => ({
          id: item.Id ?? index,
          type: item.Type,
          deviceModel: item.DeviceModel,
          bettry: item.Bettry,
          temperature: Number(item.Temperature),
          status: item.Status,
        }));
        setSystemData(formattedData);
      }
      else{
        console.error("Failed to load System Health data");
      }
    }).catch((error) => console.error('Error fetching System Health data:', error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch(serverHealthUrl).then((res) => res.json()).then((result) => {
      if(result.success) {
        const formattedData2: ServerDataItem[] = result.data.map((item: any, index: number) => ({
          id: item.Id ?? index,
          server: item.Server,
          status: item.Status,
        }));
        setServerData(formattedData2);
      }
      else{
        console.error("Failed to load Server data");
      }
    }).catch((error) => console.error('Error fetching Server Health data:', error))
      .finally(() => setLoading(false));
  }, []);

  const filteredSystemData = systemData.filter(sys => {
    const matchStatus = statusFilter === 'All' || sys.status === statusFilter;
    const matchDevice = deviceFilter === 'All' || sys.type === deviceFilter;

    const tempValue = Number(sys.temperature);
    let matchTemp = true;

    if (tempFilter === 'under-16') {
      matchTemp = tempValue <= 16;
    } else if ((tempFilter === 'under-29') && (tempFilter > 'under-16')) {
      matchTemp = tempValue <= 29;
    } else if (tempFilter === 'over-30') {
      matchTemp = tempValue > 30;
    }

    return matchStatus && matchDevice && matchTemp;
  });

  const totalPages = Math.ceil(filteredSystemData.length / rowsPerPage);
  const safePage = Math.min(currentPage, totalPages || 1);

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
          <div className="table-filters">
            {/* DeviceType Filter */}
            <label className="system-select-label">Device Type:</label>
            <select className="health-select" value={deviceFilter} onChange={(e) => setDeviceFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="Big Safe">Big Safe</option>
              <option value="Small Safe">Small Safe</option>
              <option value="Pistol Vault">Pistol Vault</option>
            </select>

            {/* Status Filter */}
            <label className="system-select-label">Status:</label>
            <select className="health-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="Bad">Bad</option>
              <option value="Good">Good</option>
              <option value="Excellent">Excellent</option>
            </select>

            {/* Temperature Filter */}
            <label className="system-select-label">Temp(°C):</label>
            <select className="health-select" value={tempFilter} onChange={(e) => setTempFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="under-16">≤ 16</option>
              <option value="under-29">≤ 29</option>
              <option value="over-30">&gt; 30</option>
            </select>

          </div>
        </div>

        {/* Responsive System Table */}
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
                 //console.log('Rendering item:', item.id, item.type, item.name, item.battery, item.temp, item.status),
                <tr key={index}>
                  <td style={{ color: '#ffffff', fontWeight: 500 }}>{item.type}</td>
                  <td style={{ color: '#8b94a5' }}>{item.deviceModel}</td>
                  <td style={{ color: '#8b94a5' }}>{item.bettry}</td>
                  <td style={{ color: '#8b94a5' }}>{item.temperature}</td>
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

        {/*Responsive Server Table */}
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