import React, { useContext } from 'react'
import './Home.scss'
import video from '../../assets/videos/video.mp4'
import { HomeContext } from '../../pages/Home/Home'

const HomeLayout = () => {
    const {tab, changeTab} = useContext(HomeContext);
  return (
    <div className='bg-dark'>
        <div className='w-100 vh-100 position-relative'>
            <video loop muted autoPlay className='w-100 h-100' style={{zIndex: '-1'}}>
                <source src={video} type="video/mp4" />
            </video>

            {/* <div className='position-absolute top-0 start-0 text-light'>Text fixed</div> */}
        </div>

        <div className='position-fixed w-100 d-flex justify-content-center' style={{top: '5%'}}>
            <div onClick={() => changeTab('home')} className={`text-light me-2 fw-bold ${tab === 'home' ? 'active-tab' : ''} position-relative`}>Home</div>
            <div onClick={() => changeTab('trending')} className={`text-light fw-bold ${tab === 'trending' ? 'active-tab' : ''} position-relative`}>Trending</div>
        </div>
    </div>
  )
}

export default HomeLayout