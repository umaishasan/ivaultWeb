import React, { type ReactNode, useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./CommonPage.css"; // Direct standard CSS import
import DashboardIcon from '@mui/icons-material/Dashboard';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PersonIcon from '@mui/icons-material/Person';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import Badge from '@mui/material/Badge';

interface CommonPageProps {
  children?: ReactNode;
  currentPageTitle?: string;
  onEditProfileClick?: () => void; // Callback tab trigger hoga jab "Edit Profile" click hoga
}
const totalNotificationsCount = 4;

///export const CommonPage = is component ko export kar raha hai, taake dusri files is ko use kar sakain
///React.FC<CommonPageProps> = yeh bata raha hai ke ye component React functional component hai aur us ka props type CommonPageProps hai
///children = component ke andar jo content pass kiya jaye
///currentPageTitleProp = aik prop jo page ka title deta hai
export const CommonPage: React.FC<CommonPageProps> = ({ children, currentPageTitle: currentPageTitleProp,}) => {

  // React Router ka hook jo navigation ke liye use hota hai
  const navigate = useNavigate(); 
  
  //is se aap current page ka path maloom kar sakte ho jaise location.pathname.
  const location = useLocation(); 
  
  //isDropdownOpen current value hai, setIsDropdownOpen us value ko update karta hai, shuruaat me false hai matlab dropdown band hai
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  
  //aik container ko track karne ke liye use hota hai.is se aap element ko directly access kar sakte hain without re-render
  const dropdownRef = useRef<HTMLDivElement>(null);

  //State ko LocalStorage se read karein taake refresh ya page change par reset na ho
  const [readNotificationsCount, setReadNotificationsCount] = useState<number>(() => {
    //const savedStatus = localStorage.getItem('hasNotifications');
    const savedCount = localStorage.getItem('readNotificationsCount');
    // Agar pehle se koi value save nahi hai (first time load), to default true rakhein
    //return savedStatus !== null ? JSON.parse(savedStatus) : true;
    return savedCount !== null ? parseInt(savedCount, 10) : 0;
  });

  //Red dot tabhi dikhega jab total notifications user ke read kiye huay count se zyada honge
  // Is se aapka "user ka index/count increase hone par notify ho" wala masla hal ho jayega!
  const hasNotifications = totalNotificationsCount > readNotificationsCount;

  //pageTitles ye aik object hai jisme route aur unka title map kiye gaye hain jaise: /dashboard → Dashboard, users → Users
  //currentPageTitle = yeh decide karta hai ke current page ka title kya show hoga
  //currentPageTitleProp agar passed ho to usko use karo warna pageTitles[location.pathname] check karo agar route ka title object me mil
  //jaye to use karo warna default 'Dashboard' use karo. agar current URL users hai to: pageTitles['/users'] ka value Users aayega
  //phir currentPageTitle = Users ho jae ga
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

  //component load hota hai → effect chal jata hai title update hota hai agar page title change ho jaye → phir wapas effect chalta hai
  //document.title = browser ke tab ka title set karta hai
  //i-Vault - ${currentPageTitle} ka matlab: tab par "i-Vault - Dashboard" ya "i-Vault - Users" dikhai dega
  //[currentPageTitle] ye dependency list hai:
  useEffect(() => {
    document.title = `i-Vault - ${currentPageTitle}`;
  }, [currentPageTitle]);

  //Agar user directly ya kisi tarah bhi '/notifications' page par aaye, to dot hat jaye. Route check karne wala effect
  useEffect(() => {
    if (location.pathname === '/notifications') {
      setReadNotificationsCount(totalNotificationsCount);
    }
  }, [location.pathname]);

  //Jab bhi state change ho, usko localStorage me save karwein
  useEffect(() => {
    localStorage.setItem('hasNotifications', JSON.stringify(hasNotifications));
  }, [hasNotifications]);

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

  //handle dropdown toggle
  const handleDropdownToggle = () => {
    setIsDropdownOpen(prev => !prev);
  };

  //Click handle karne ka function jo notification bell icon par click hone par call hota hai
  const handleNotificationClick = () => {
    //setReadNotificationsCount(0); // Bell se dot fauran gayab ho jaye
    navigate('/notifications'); // Notifications page par navigate karein
  };

  // Jab user kisi single notification par click kare ya saari read karle:
  // const handleReadNotification = () => {
  //   // 1. Manually ya loop ke zariye count barhayein jitni read ho chuki hain
  //   const updatedReadCount = 4; // Jitni notifications user ne click/read karlin
  //   // 2. Isko localStorage me save kar dein
  //   localStorage.setItem('readNotificationsCount', updatedReadCount.toString());
  //   // Agar aap Context/Redux use kar rahe hain to state update karein, 
  //   // warna localStorage khud hi agli baar page load par CommonPage me update ho jayega.
  // };

  ///UI Starts from here which is rendered on the screen
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
            <Badge variant="dot" invisible={!hasNotifications} sx={{'& .MuiBadge-badge': {backgroundColor: '#ef4444',}}}>
              <NotificationsIcon onClick={handleNotificationClick} style={{ marginRight: '3px', verticalAlign: 'middle' }}/>
            </Badge>
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
                <button className="dropdownItem" onClick={() => navigate('/editprofile')}>
                  <DriveFileRenameOutlineIcon className='navlinkIcon' style={{ marginRight: '3px', verticalAlign: 'middle' }}/>
                  Edit Profile
                </button>
              </div>
            )}
          </div>

          <button className="logoutBtn" onClick={() => navigate('/login')}>Log out</button>
        </div>
      </header>

      {/* 2. Body (Sidebar + Content) */}
      <div className="bodyContainer">
        
        {/* Sidebar */}
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