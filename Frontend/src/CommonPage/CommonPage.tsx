import React, { type ReactNode, useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./CommonPage.css"; 
import DashboardIcon from '@mui/icons-material/Dashboard';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PersonIcon from '@mui/icons-material/Person';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import Badge from '@mui/material/Badge';

interface CommonPageProps {
  children?: ReactNode;
  currentPageTitle?: string;
  onEditProfileClick?: () => void;
}
const totalNotificationsCount = 4;

export const CommonPage: React.FC<CommonPageProps> = ({ children, currentPageTitle: currentPageTitleProp,}) => {
  const navigate = useNavigate(); 
  const location = useLocation(); 
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  // Logout Modal State
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const [readNotificationsCount, setReadNotificationsCount] = useState<number>(() => {
    const savedCount = localStorage.getItem('readNotificationsCount');
    return savedCount !== null ? parseInt(savedCount, 10) : 0;
  });

  const hasNotifications = totalNotificationsCount > readNotificationsCount;

  const pageTitles: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/devices': 'Devices',
    '/users': 'Users',
    '/system-health': 'System Health',
    '/rbac': 'RBAC',
    '/editprofile': 'Edit Profile',
    '/notifications': 'Notifications',
  };
  const currentPageTitle = currentPageTitleProp ?? pageTitles[location.pathname] ?? 'Dashboard';

  useEffect(() => {
    document.title = `i-Vault - ${currentPageTitle}`;
  }, [currentPageTitle]);

  useEffect(() => {
    if (location.pathname === '/notifications') {
      setReadNotificationsCount(totalNotificationsCount);
    }
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem('hasNotifications', JSON.stringify(hasNotifications));
  }, [hasNotifications]);

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

  const handleNotificationClick = () => {
    navigate('/notifications');
  };

  // Logout Actions
  const handleLogoutConfirm = () => {
    // Apni logout logic / token clear logic yahan handle karain
    setIsLogoutModalOpen(false);
    navigate('/login'); // Ya jo bhi aapka login route ho
  };

  return (
    <div className="layoutContainer">
      
      {/* 1. Top Header */}
      <header className="header">
        <div className="leftHeader">
          <div className="logoArea">
            <img src="/Logo.png" alt="i-Vault Logo" width={40} height={40} />
            {/*<span className="logoIcon">🛡️</span>
            <span>i-Vault</span>*/}
          </div>
          <div className="breadcrumbs">
            <span>Manufacturer Portal</span>
            <span className="breadcrumbActive"> / {currentPageTitle}</span>
          </div>
        </div>

        <div className="rightHeader">
          <div className="notificationIcon" title="Notifications">
            <Badge variant="dot" invisible={!hasNotifications} sx={{'& .MuiBadge-badge': {backgroundColor: '#ef4444',}}}>
              <NotificationsIcon onClick={handleNotificationClick} style={{ marginRight: '3px', verticalAlign: 'middle' }}/>
            </Badge>
          </div>
          
          <div className="profileWrapper" ref={dropdownRef}>
            <div className="profileInfo" onClick={handleDropdownToggle}>
              <img 
                src="https://via.placeholder.com/150" 
                alt="Profile" 
                className="avatar" 
              />
              <span className="profileName">Super Admin</span>
            </div>

            {isDropdownOpen && (
              <div className="profileDropdown" >
                <button className="dropdownItem" onClick={() => navigate('/editprofile')}>
                  <DriveFileRenameOutlineIcon className='navlinkIcon' style={{ marginRight: '3px', verticalAlign: 'middle' }}/>
                  Edit Profile
                </button>
              </div>
            )}
          </div>

          {/* Direct route navigate karne ki bajaye modal open karo */}
          <LogoutIcon className="logoutBtn" style={{width: '0.9em', height:'0.9em'}} onClick={() => setIsLogoutModalOpen(true)}></LogoutIcon>
        </div>
      </header>

      {/* 2. Body (Sidebar + Content) */}
      <div className="bodyContainer">
        
        <aside className="sidebar">
          <div className="navLinks">
            <button onClick={() => navigate('/dashboard')} className={`navLink ${location.pathname === '/dashboard' ? 'activeNavLink' : ''}`}>
              <span>
                <DashboardIcon className='navlinkIcon' style={{ marginRight: '3px', verticalAlign: 'middle' }}/>
              </span> Dashboard
            </button>
            <button onClick={() => navigate('/devices')} className={`navLink ${location.pathname === '/devices' ? 'activeNavLink' : ''}`}>
              <span>
                <PhoneAndroidIcon className='navlinkIcon' style={{ marginRight: '3px', verticalAlign: 'middle' }}/>
              </span> Devices
            </button>
            <button onClick={() => navigate('/users')} className={`navLink ${location.pathname === '/users' ? 'activeNavLink' : ''}`}>
              <span>
                <PersonIcon className='navlinkIcon' style={{ marginRight: '3px', verticalAlign: 'middle' }}/>
              </span> Users
            </button>
            <button onClick={() => navigate('/system-health')} className={`navLink ${location.pathname === '/system-health' ? 'activeNavLink' : ''}`}>
              <span>
                <MonitorHeartIcon className='navlinkIcon' style={{ marginRight: '3px', verticalAlign: 'middle' }}/>
              </span> System Health
            </button>
            <button onClick={() => navigate('/rbac')} className={`navLink ${location.pathname === '/rbac' ? 'activeNavLink' : ''}`}>
              <span>
                <AddModeratorIcon className='navlinkIcon' style={{ marginRight: '3px', verticalAlign: 'middle' }}/>
              </span> RBAC
            </button>
          </div>

          <div className="sidebarFooter">
            <div className="sidebarFooterName">Super Admin</div>
            <div className="sidebarFooterEmail">admin@safeguard.io</div>
          </div>
        </aside>

        <div className="contentWrapper">
          <main className="mainContent">
            {children ? children : <div style={{color: '#94a3b8'}}>No content provided.</div>}
          </main>

          <footer className="footer">
            Note: Compliance and data privacy for entities no retail/enterprise audit/contact. 
            <a href="#privacy" className="footerLink">compliance & data privacy</a>
          </footer>
        </div>

      </div>

      {/* 3. LOGOUT CONFIRMATION MODAL */}
      {isLogoutModalOpen && (
        <div className="modalOverlay" onClick={() => setIsLogoutModalOpen(false)}>
          <div className="logoutModalCard" onClick={(e) => e.stopPropagation()}>
            <h2 className="logoutModalTitle">Logout</h2>
            <p className="logoutModalSubtitle">Are you sure you want to logout?</p>
            
            {/* Ab ye container flex-row me horizontal layout banayega */}
            <div className="logoutModalActions">
              <button className="confirmBtn" onClick={handleLogoutConfirm}>
                Yes
              </button>
              <button className="cancelBtn" onClick={() => setIsLogoutModalOpen(false)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};