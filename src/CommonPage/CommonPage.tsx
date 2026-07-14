import React, { type ReactNode, useState, useRef, useEffect } from 'react';
import "./CommonPage.css"; // Direct standard CSS import

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
            <span>SAFEGUARD</span>
          </div>
          <div className="breadcrumbs">
            <span>Manufacturer Portal</span>
            <span className="breadcrumbActive"> / {currentPageTitle}</span>
          </div>
        </div>

        <div className="rightHeader">
          <div className="notificationIcon" title="Notifications">
            🔔
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
              <div className="profileDropdown">
                <button className="dropdownItem" onClick={handleEditProfile}>
                  <svg className="dropdownIcon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                    <line x1="16" y1="11" x2="22" y2="11"></line>
                  </svg>
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
              <span>📊</span> Dashboard
            </a>
            <a href="#devices" className="navLink">
              <span>📱</span> Devices
            </a>
            <a href="#users" className="navLink">
              <span>👤</span> Users
            </a>
            <a href="#health" className="navLink">
              <span>⚡</span> System Health
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