import React, { useContext } from 'react'
import './Settings.scss'
import userIcon from '../../assets/icons/user.svg'
import bellIcon from '../../assets/icons/bell.svg'
import shareIcon from '../../assets/icons/share-icon.svg'
import shieldIcon from '../../assets/icons/shield-icon.svg'
import proceedIcon from '../../assets/icons/proceed-icon.svg'
import { useNavigate } from 'react-router-dom'
import defaultImage from '../../assets/images/default.jpg'
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    PinterestShareButton,
    RedditShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailIcon,
    FacebookIcon,
    LinkedinIcon,
    PinterestIcon,
    RedditIcon,
    TelegramIcon,
    XIcon,
    WhatsappIcon,
  } from "react-share";
import { Drawer } from 'antd'
import { settingsContext } from '../../pages/Settings/Settings'
import { useSelector } from 'react-redux'

const SettingsLayout = () => {
    const navigate = useNavigate()
    const {user} = useSelector(state => state.authReducer)
    const {openShareProfileBox, shareProfileBoxOpen} = useContext(settingsContext)
  return (
    <div className='p-2'>
        <h1 className='fw-bold text-primary mt-3 text-center mb-5'>Settings</h1>

        <div className='options rounded py-4 px-2'>
            <div className='d-flex justify-content-between align-items-center mb-4' onClick={() => navigate('/settings/account')}>
                <div className='d-flex '>
                    <img src={userIcon} alt="user icon" className='me-2' />
                    <span className='fw-bold fs-4'>Account</span>
                </div>
                <img src={proceedIcon} alt="" />
            </div>

            <div className='d-flex justify-content-between align-items-center mb-4'>
                <div className='d-flex '>
                    <img src={shieldIcon} alt="user icon" className='me-2' />
                    <span className='fw-bold fs-4'>Security</span>
                </div>
                <img src={proceedIcon} alt="" />
            </div>

            <div className='d-flex justify-content-between align-items-center mb-4' onClick={() => navigate("/notifications")}>
                <div className='d-flex '>
                    <img src={bellIcon} alt="user icon" className='me-2' />
                    <span className='fw-bold fs-4'>Notifications</span>
                </div>
                <img src={proceedIcon} alt="" />
            </div>

            <div className='d-flex justify-content-between align-items-center' onClick={() => openShareProfileBox(true)}>
                <div className='d-flex '>
                    <img src={shareIcon} alt="user icon" className='me-2' />
                    <span className='fw-bold fs-4'>Share Profile</span>
                </div>
                <img src={proceedIcon} alt="" />
            </div>
        </div>

        {/* drawer to display share icons */}
        <Drawer
            open={shareProfileBoxOpen}
            title={<div className="text-primary fw-bold">Share Profile</div>}
            // footer={} // react node
            closable={true}
            placement="bottom"
            height={"auto"}
            onClose={() => openShareProfileBox(false)}
          >
            <FacebookShareButton
              className="me-2 mb-2"
              url={`${window.location.origin}/profile/${user?.reference}`}
            >
              <FacebookIcon round={true} />
            </FacebookShareButton>

            <EmailShareButton
              className="me-2 mb-2"
              subject={user?.username}
              body={user?.bio}
              url={`${window.location.origin}/profile/${user?.reference}`}
            >
              <EmailIcon round={true} />
            </EmailShareButton>

            <LinkedinShareButton
              className="me-2 mb-2"
              url={`${window.location.origin}/profile/${user?.reference}`}
              title={user?.username}
              summary={user?.bio}
            >
              <LinkedinIcon round={true} />
            </LinkedinShareButton>

            <PinterestShareButton
              className="me-2 mb-2"
              url={`${window.location.origin}/profile/${user?.reference}`}
              media={user || defaultImage}
              description={user?.bio}
            >
              <PinterestIcon round={true} />
            </PinterestShareButton>

            <RedditShareButton
              className="me-2 mb-2"
              url={`${window.location.origin}/profile/${user?.reference}`}
              title={user?.username}
            >
              <RedditIcon round={true} />
            </RedditShareButton>

            <TelegramShareButton
              className="me-2 mb-2"
              url={`${window.location.origin}/profile/${user?.reference}`}
              title={user?.username}
            >
              <TelegramIcon round={true} />
            </TelegramShareButton>

            <TwitterShareButton
              className="me-2 mb-2"
              url={`${window.location.origin}/profile/${user?.reference}`}
              title={user?.username}
            >
              <XIcon round={true} />
            </TwitterShareButton>

            <WhatsappShareButton
              className="me-2 mb-2"
              url={`${window.location.origin}/profile/${user?.reference}`}
              title={user?.username}
            >
              <WhatsappIcon round={true} />
            </WhatsappShareButton>
          </Drawer>
    </div>
  )
}

export default SettingsLayout