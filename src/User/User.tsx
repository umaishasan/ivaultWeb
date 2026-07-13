import React, { useState } from 'react';
import './user.css';

// Exact mock data according to your Users image
const initialUsers = [
  { name: 'John', email: 'john123@gmail.com', deviceType: 'Big Safe', paymentInfo: 'Paid' },
  { name: 'Smith', email: 'Smith@gmail.com', deviceType: 'Big Safe', paymentInfo: 'Trail' }, // Note: Keeping 'Trail' typo as in mock or can be 'Trial'
  { name: 'Lauren', email: 'lauren123@gmail.com', deviceType: 'Pistol', paymentInfo: 'Paid' },
  { name: 'Kim', email: 'Kim23@gmail.com', deviceType: 'Small Safe', paymentInfo: 'Paid' },
  { name: 'Yannik', email: 'Yannik45@gmail.com', deviceType: 'Pistol', paymentInfo: 'Trail' },
  { name: 'Donnal', email: 'donal66@gmail.com', deviceType: 'Big Safe', paymentInfo: 'Paid' },
  { name: 'Danny', email: 'jdanny123@gmail.com', deviceType: 'Small Safe', paymentInfo: 'Paid' },
  { name: 'Louis', email: 'louis93@gmail.com', deviceType: 'Small Safe', paymentInfo: 'Trail' },
  { name: 'John', email: 'john123@gmail.com', deviceType: 'Small Safe', paymentInfo: 'Trail' },
];

export function UserContent() {
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [deviceFilter, setDeviceFilter] = useState('All');

  // Multi-filtering logic for Payment Info & Device Type
  const filteredUsers = initialUsers.filter(user => {
    const matchPayment = paymentFilter === 'All' || user.paymentInfo === paymentFilter;
    const matchDevice = deviceFilter === 'All' || user.deviceType === deviceFilter;
    return matchPayment && matchDevice;
  });

  return (
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
            <select 
              className="user-select"
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
            >
              <option value="All">Payment Info</option>
              <option value="Paid">Paid</option>
              <option value="Trail">Trial</option>
            </select>

            {/* Device Type Filter */}
            <select 
              className="user-select"
              value={deviceFilter}
              onChange={(e) => setDeviceFilter(e.target.value)}
            >
              <option value="All">Device Type</option>
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

        {/* Pagination Controls */}
        <div className="user-pagination">
          <button className="pagination-btn">❬</button>
          <span>Page 1 to 50</span>
          <button className="pagination-btn">❭</button>
        </div>
      </div>
    </div>
  );
}

export default UserContent;