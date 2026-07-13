// CommonPage.tsx
import React, { type ReactNode } from 'react';
import "./CommonPage.css"; // Direct standard CSS import

interface CommonPageProps {
  children?: ReactNode;
  currentPageTitle?: string;
}

export const CommonPage: React.FC<CommonPageProps> = ({ children, currentPageTitle = "Dashboard" }) => {
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
          <div className="profileInfo">
            <img 
              src="https://via.placeholder.com/150" 
              alt="Profile" 
              className="avatar" 
            />
            <span className="profileName">Super Admin</span>
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