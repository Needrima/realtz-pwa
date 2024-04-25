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
import addProductIcon from '../assets/icons/add-product.svg'
import addProductIconBlue from '../assets/icons/add-product-blue.svg'
// import navIconBlack from '../assets/icons/nav-icon-black.svg'
// import navIconWhite from '../assets/icons/nav-icon-white.svg'

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.authReducer);
  // const [navBar, setNavbar] = useState(false)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  return (
    <>
      <div id="layout position-relative">
        {children}
        
        {/* navigation menu drawer */}
        {/* <Drawer
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

          <div className={`mb-3 fw-bold fs-2 d-flex alig-items-end ${window.location.pathname.split('/')[1] === 'settings' ? 'text-primary' : 'text-muted'}`} onClick={() => {
            setNavbar(false)
            navigate('/settings')
          }}>
            <img src={window.location.pathname.split('/')[1] === 'settings' ? settingsIconNavBlue : settingsIconNav} alt="" className="me-2" />
            <span>Settings</span>
          </div>
        </Drawer>
        <img 
        src={window.location.pathname === '/home' ? navIconWhite : navIconBlack} alt=""
        className="position-fixed"
        style={{top: '2%', right: '2%'}}
        onClick={() => setNavbar(true)}
        /> */}
      </div>
      
      <div className="position-fixed bottom-0 w-100 bg-white d-flex justify-content-around align-items-center py-3 border-top border-secondary border-2">
        <div className="text-center" onClick={() => navigate('/home')} >
          <img  src={window.location.pathname === '/home' ? homeIconBlue : homeIcon} alt="home nav icon" />
          <div className={`fw-bold ${window.location.pathname === '/home' && 'text-primary'}`}>Home</div>
        </div>

        <div className="text-center" onClick={() => navigate('/explore')} >
          <img src={window.location.pathname === '/explore' ? exploreIconBlue : exploreIcon} alt="explore nav icon" />
          <div className={`fw-bold ${window.location.pathname === '/explore' && 'text-primary'}`}>Explore</div>
        </div>

      {user?.user_type === 'user' 
      ? (
          <div className="text-center" onClick={() => navigate('/notifications')} >
            <img src={window.location.pathname === '/notifications' ? inboxIconBlue : inboxIcon} alt="inbox nav icon" />
            <div className={`fw-bold ${window.location.pathname === '/notifications' && 'text-primary'}`}>Inbox</div>
          </div>
        )
      : (
          <div className="text-center" onClick={() => navigate('/add-product')} >
            <img src={window.location.pathname === '/add-product' ? addProductIconBlue : addProductIcon} alt="inbox nav icon" />
            <div className={`fw-bold ${window.location.pathname === '/add-product' && 'text-primary'}`}>Add Listing</div>
          </div>
        )
      }

        <div className="text-center" onClick={() => navigate('/settings')} >
          <img src={window.location.pathname.split('/')[1] === 'settings' ? settingsIconNavBlue : settingsIconNav} alt="settings nav icon" />
          <div className={`fw-bold ${window.location.pathname.split('/')[1] === 'settings' && 'text-primary'}`}>Settings</div>
        </div>

        <div className="text-center" onClick={() => window.location.href='/profile'} >
          {user?.image
           ? <img src={user?.image} width={32} height={32} alt="profile nav icon" className="rounded-circle" />
           : <img src={window.location.pathname.split('/')[1] === 'profile' ? profileIconBlue : profileIcon} alt="profile nav icon" />
          }
          <div className={`fw-bold ${window.location.pathname.split('/')[1] === 'profile' && 'text-primary'}`}>Profile</div>
        </div>
      </div>
    </>
  )
};

export default Layout;
