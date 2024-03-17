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

const HomeLayout = () => {
    const {tab, changeTab} = useContext(HomeContext);
  return (
    <div className='bg-dark'>
        {/* <div className='w-100 vh-100 position-relative mb-3'>
            <video loop muted autoPlay className='w-100 h-100 object-fit-fill'>
                <source src={video} type="video/mp4" />
            </video>

            <div className='position-absolute bottom-0 mb-5' style={{right: '10%'}}>
                <div className='mb-4'>
                    <img className='d-block' src={likeIcon} alt="like video" />
                    <div className='text-light text-center fw-bold'>1k</div>
                </div>

                <div className='mb-4'>
                    <img className='d-block' src={commentIcon} alt="like video" />
                    <div className='text-light text-center fw-bold'>596</div>
                </div>

                <div className='mb-4'>
                    <img className='d-block' src={saveIcon} alt="like video" />
                    <div className='text-light text-center fw-bold'>200</div>
                </div>

                <div className='mb-4'>
                    <img className='d-block' src={shareIcon} alt="like video" />
                </div>

                <div className='mb-4'>
                    <img className='d-block' src={profileIcon} alt="like video" />
                </div>
            </div>
        </div> */}
        <Video />
        <Video />
        <Video />

        <div className='position-fixed w-100 d-flex justify-content-center' style={{top: '5%'}}>
            <div onClick={() => changeTab('home')} className={`text-light me-3 fw-bold fs-3 ${tab === 'home' ? 'active-tab' : ''} position-relative`}>Home</div>
            <div onClick={() => changeTab('trending')} className={`text-light fw-bold fs-3 ${tab === 'trending' ? 'active-tab' : ''} position-relative`}>Trending</div>
        </div>
    </div>
  )
}

export default HomeLayout