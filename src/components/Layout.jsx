import { Drawer } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import homeIcon from '../assets/icons/home-icon.svg'
import homeIconBlue from '../assets/icons/home-icon-blue.svg'
import exploreIcon from '../assets/icons/explore-icon.svg'
import exploreIconBlue from '../assets/icons/explore-icon-blue.svg'
import inboxIcon from '../assets/icons/inbox-icon.svg'
import inboxIconBlue from '../assets/icons/inbox-icon-blue.svg'
import profileIcon from '../assets/icons/profile-icon.svg'
import profileIconBlue from '../assets/icons/profile-icon-blue.svg'
import settingsIconNav from '../assets/icons/settings-icon-nav.svg'
import settingsIconNavBlue from '../assets/icons/settings-icon-nav-blue.svg'

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.authReducer);

  const [navBar, setNavbar] = useState(false)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  return (
    <div id="layout position-relative">
      {children}
      <Drawer
        open={navBar}
        closable={true}
        onClose={() => setNavbar(false)}
      >
        <div className={`mb-3 fw-bold fs-2 d-flex alig-items-end ${window.location.pathname === '/home' ? 'text-primary' : 'text-muted'}`} onClick={() => {
           setNavbar(false)
           navigate('/home')
        }}>
          <img src={window.location.pathname === '/home' ? homeIconBlue : homeIcon} alt="" className="me-2" />
          <span>Home</span>
        </div>

        <div className={`mb-3 fw-bold fs-2 d-flex alig-items-end ${window.location.pathname === '/explore' ? 'text-primary' : 'text-muted'}`} onClick={() => {
           setNavbar(false)
           navigate('/explore')
        }}>
          <img src={window.location.pathname === '/explore' ? exploreIconBlue : exploreIcon} alt="" className="me-2" />
          <span>Explore</span>
        </div>

        <div className={`mb-3 fw-bold fs-2 d-flex alig-items-end ${window.location.pathname === '/notifications' ? 'text-primary' : 'text-muted'}`} onClick={() => {
           setNavbar(false)
           navigate('/notifications')
        }}>
          <img src={window.location.pathname === '/notifications' ? inboxIconBlue : inboxIcon} alt="" className="me-2" />
          <span>Inbox</span>
        </div>

        <div className={`mb-3 fw-bold fs-2 d-flex alig-items-end ${window.location.pathname.split('/')[1] === 'profile' ? 'text-primary' : 'text-muted'}`} onClick={() => {
           setNavbar(false)
           navigate('/profile')
        }}>
          <img src={window.location.pathname.split('/')[1] === 'profile' ? profileIconBlue : profileIcon} alt="" className="me-2" />
          <span>Profile</span>
        </div>

        <div className={`mb-3 fw-bold fs-2 d-flex alig-items-end ${window.location.pathname === '/settings' ? 'text-primary' : 'text-muted'}`} onClick={() => {
           setNavbar(false)
           navigate('/settings')
        }}>
          <img src={window.location.pathname === '/settings' ? settingsIconNavBlue : settingsIconNav} alt="" className="me-2" />
          <span>Settings</span>
        </div>
      </Drawer>
      
      <i 
      className={`bi bi-list ${window.location.pathname === '/home' ? 'text-white border-white' : 'text-dark border-dark'} border px-2 rounded fw-bold fs-4`}
      style={{position: 'absolute', top: '2%', right: '2%'}}
      onClick={() => setNavbar(true)}
      ></i>
    </div>
  )
};

export default Layout;
