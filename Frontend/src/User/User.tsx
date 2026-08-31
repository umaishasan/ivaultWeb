import { useEffect, useState } from 'react';
import './User.css';
import { CommonPage } from '../CommonPage/CommonPage';
import type { UserDataItem } from '../Model/Model';

export function UserContent() {
  var userDataUrl = 'http://localhost:5000/api/userdata';
  //const startIndex = (safePage - 1) * rowsPerPage;
  //const paginatedSafeData = initialUsers.slice(startIndex, startIndex + rowsPerPage);
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [deviceFilter, setDeviceFilter] = useState('All');
  const [initialUsers, setInitialUsers] = useState<UserDataItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(initialUsers.length / rowsPerPage);
  const safePage = Math.min(currentPage, totalPages || 1);
  const [loading, setLoading] = useState<boolean>(true);
  // Multi-filtering logic for Payment Info & Device Type
  const filteredUsers = initialUsers.filter(user => {
    const matchPayment = paymentFilter === 'All' || user.paymentInfo === paymentFilter;
    const matchDevice = deviceFilter === 'All' || user.deviceType === deviceFilter;
    return matchPayment && matchDevice;
  });

  useEffect(() => {
    fetch(userDataUrl).then((res)=>res.json()).then((result) => {
      if(result.success) {
        const formattedData: UserDataItem[] = result.data.map((item: any, index: number) => ({
          name: item.Name,
          email: item.Email,
          deviceType: item.Type,
          paymentInfo: item.PaymentInfo
        }));
        setInitialUsers(formattedData);
      }else{
        console.log("Failed to load data");
      }
    }).catch((error) => {
      console.error('Error fetching User data:', error)
    }).finally(() => setLoading(false));
  },[]);

  return (
    <CommonPage>
      <div className="user-container">
      {/* Header section */}
      <div className="user-header">
        <h1 className="user-title">Users</h1>
        <p className="user-subtitle">Users who have purchased devices and are on a trial</p>
      </div>

      {/* Table Card Layout */}
      <div className="user-table-card">
        {/* Top Header bar with title and double filters */}
        <div className="table-top-bar">
          <h2 className="table-top-title">User Information</h2>
          <div className="table-filters">
            {/* Payment Filter */}
            <label className="user-select-label">Payment Info:</label>
            <select className="user-select" value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="Paid">Paid</option>
              <option value="Trail">Trial</option>
            </select>

            {/* Device Type Filter */}
            <label className="user-select-label">Device Type:</label>
            <select className="user-select" value={deviceFilter} onChange={(e) => setDeviceFilter(e.target.value)}>
              <option value="All">All</option>
              <option value="Big Safe">Big Safe</option>
              <option value="Small Safe">Small Safe</option>
              <option value="Pistol">Pistol</option>
            </select>
          </div>
        </div>

        {/* Responsive User Table */}
        <div className="user-table-responsive">
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Device Type</th>
                <th>Payment Info</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td className="user-name">{user.name}</td>
                  <td className="user-email">{user.email}</td>
                  <td className="device-type">{user.deviceType}</td>
                  <td className="payment-status">{user.paymentInfo}</td>
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

export default UserContent;