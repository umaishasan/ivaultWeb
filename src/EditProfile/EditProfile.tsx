import React, { useState } from 'react';
import './EditProfile.css';
import { CommonPage } from '../CommonPage/CommonPage';

export function EditProfileContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Updating profile data:", { email, password });
    // TO DO: API integration logic goes here
  };

  return (
    <CommonPage>
      <div className="profile-container">
        {/* Upper Titles Header */}
        <div className="profile-header">
          <h1 className="profile-title">Edit Profile</h1>
          <p className="profile-subtitle">Update email & password</p>
      </div>

      {/* Main Centered Form Box */}
      <div className="profile-card-wrapper">
        <div className="profile-card">
          <form className="profile-form" onSubmit={handleUpdate}>
            
            {/* Email Row */}
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Row */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Confirm Password Row */}
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Centered Button Wrapper */}
            <div className="form-actions">
              <button type="submit" className="btn-update">
                Update
              </button>
            </div>

          </form>
        </div>
      </div>
      </div>
    </CommonPage>
  );
}

export default EditProfileContent;