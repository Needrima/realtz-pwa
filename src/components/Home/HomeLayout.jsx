import React, { useContext } from 'react'
import './Home.scss'
import video from '../../assets/videos/video.mp4'
import profileIcon from '../../assets/icons/profile-circle.svg'
import saveIcon from '../../assets/icons/bookmark-white.svg'
import likeIcon from '../../assets/icons/heart-white.svg'
import commentIcon from '../../assets/icons/comment.svg'
import shareIcon from '../../assets/icons/share-white.svg'
import { HomeContext } from '../../pages/Home/Home'
import Video from './Video'
import Product from './Product'

const HomeLayout = () => {
    const {tab, changeTab} = useContext(HomeContext);
  return (
    <div className='bg-dark'>
        <Product />
        <Product />

        <div className='position-fixed w-100 d-flex justify-content-center' style={{top: '5%'}}>
            <div onClick={() => changeTab('home')} className={`text-light me-3 fw-bold fs-3 ${tab === 'home' ? 'active-tab' : ''} position-relative`}>Home</div>
            <div onClick={() => changeTab('trending')} className={`text-light fw-bold fs-3 ${tab === 'trending' ? 'active-tab' : ''} position-relative`}>Trending</div>
        </div>
    </div>
  )
}

export default HomeLayout