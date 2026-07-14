import React, { type ReactNode, useState, useRef, useEffect } from 'react';
import "./CommonPage.css"; // Direct standard CSS import
import DashboardIcon from '@mui/icons-material/Dashboard';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PersonIcon from '@mui/icons-material/Person';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

interface CommonPageProps {
  children?: ReactNode;
  currentPageTitle?: string;
  onEditProfileClick?: () => void; // Callback tab trigger hoga jab "Edit Profile" click hoga
}

export const CommonPage: React.FC<CommonPageProps> = ({ 
  children, 
  currentPageTitle = "Dashboard",
  onEditProfileClick 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Jab user bahar click karega tw dropdown automatic close ho jayega
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleEditProfile = () => {
    setIsDropdownOpen(false);
    if (onEditProfileClick) {
      onEditProfileClick();
    } else {
      console.log("Edit Profile Clicked!");
      // Agar aap routing use kar rahe hain tw yahan navigation code add kar sakte hain
    }
  };

  return (
    <div className="layoutContainer">
      
      {/* 1. Top Header */}
      <header className="header">
        <div className="leftHeader">
          <div className="logoArea">
            <span className="logoIcon">🛡️</span>
            <span>i-Vault</span>
          </div>
          <div className="breadcrumbs">
            <span>Manufacturer Portal</span>
            <span className="breadcrumbActive"> / {currentPageTitle}</span>
          </div>
        </div>

        <div className="rightHeader">
          <div className="notificationIcon" title="Notifications">
            <NotificationsIcon style={{ marginRight: '3px', verticalAlign: 'middle' }}/>
          </div>
          
          {/* Wrapper with ref to handle click-outside */}
          <div className="profileWrapper" ref={dropdownRef}>
            <div className="profileInfo" onClick={handleDropdownToggle}>
              <img 
                src="https://via.placeholder.com/150" 
                alt="Profile" 
                className="avatar" 
              />
              <span className="profileName">Super Admin</span>
            </div>

            {/* Floating Edit Profile Dropdown */}
            {isDropdownOpen && (
              <div className="profileDropdown" >
                <button className="dropdownItem" onClick={handleEditProfile}>
                  <DriveFileRenameOutlineIcon className='navlinkIcon' style={{ marginRight: '3px', verticalAlign: 'middle' }}/>
                  Edit Profile
                </button>
              </div>
            )}
          </div>

          <button className="logoutBtn">Log out</button>
        </div>
      </header>

      {/* 2. Body (Sidebar + Content) */}
      <div className="bodyContainer">
        
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="navLinks">
            <a href="#dashboard" className="navLink activeNavLink">
              <span>
                <DashboardIcon className='navlinkIcon' style={{ marginRight: '3px', verticalAlign: 'middle' }}/>
              </span> Dashboard
            </a>
            <a href="#devices" className="navLink">
              <span>
                <PhoneAndroidIcon className='navlinkIcon' style={{ marginRight: '3px', verticalAlign: 'middle' }}/>
              </span> Devices
            </a>
            <a href="#users" className="navLink">
              <span>
                <PersonIcon className='navlinkIcon' style={{ marginRight: '3px', verticalAlign: 'middle' }}/>
              </span> Users
            </a>
            <a href="#health" className="navLink">
              <span>
                <MonitorHeartIcon className='navlinkIcon' style={{ marginRight: '3px', verticalAlign: 'middle' }}/>
              </span> System Health
            </a>
            <a href="#rbac" className="navLink">
              <span>
                <AddModeratorIcon className='navlinkIcon' style={{ marginRight: '3px', verticalAlign: 'middle' }}/>
              </span> RBAC
            </a>
          </div>

          <div className="sidebarFooter">
            <div className="sidebarFooterName">Super Admin</div>
            <div className="sidebarFooterEmail">admin@safeguard.io</div>
          </div>
        </aside>

        {/* Content Wrapper */}
        <div className="contentWrapper">
          <main className="mainContent">
            {children ? children : <div style={{color: '#94a3b8'}}>No content provided.</div>}
          </main>

          {/* Footer */}
          <footer className="footer">
            Note: Compliance and data privacy for entities no retail/enterprise audit/contact. 
            <a href="#privacy" className="footerLink">compliance & data privacy</a>
          </footer>
        </div>

      </div>
    </div>
  );
};