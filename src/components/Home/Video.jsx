import React, { useEffect, useRef, useState } from 'react'
import video from '../../assets/videos/video.mp4'
import profileIcon from '../../assets/icons/profile-circle.svg'
import saveIcon from '../../assets/icons/bookmark-white.svg'
import likeIcon from '../../assets/icons/heart-white.svg'
import commentIcon from '../../assets/icons/comment.svg'
import shareIcon from '../../assets/icons/share-white.svg'
import playIcon from '../../assets/icons/play.svg'

const Video = ({id}) => {
    const videoRef = useRef();
    const [state, setState] = useState({
        paused: true,
        muted: true,
        videoOutOfView: false,
        pausePlayImgVisible: true,
    })
    const {paused, muted, videoOutOfView, pausePlayImgVisible} = state;

    // handle pause and play
    const pausePlay = () => {
        if (paused) {
            setState(state => ({...state, paused: !state.paused, pausePlayImgVisible: true}))
            videoRef.current.play();
        }else {
            setState(state => ({...state, paused: !state.paused, pausePlayImgVisible: true}))
            videoRef.current.pause();
        }
    }

    // handles mute and unmuting. need a mute icon and unmute icon 
    const muteUnmute = () => {
        if (muted) {
            videoRef.current.muted = false;
            setState(state => ({...state, muted: !state.muted}))
        }else {
            videoRef.current.muted = true;
            setState(state => ({...state, muted: !state.muted}))
        }
    }

    // observes video when it is out of view
    const divRef = useRef(null);
    useEffect(() => {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          // If the entry is not intersecting, the div is out of view
          setState(state => ({
            ...state,
            videoOutOfView:!entry.isIntersecting
          }))
        });
      });
  
      // Start observing the div
      if (divRef.current) {
        observer.observe(divRef.current);
      }
  
      // Cleanup
      return () => {
        if (divRef.current) {
          observer.unobserve(divRef.current);
        }
      };
    }, []);

    // pauses video when it is out of view
    useEffect(() => {
        if (videoOutOfView) {
            videoRef.current.currentTime = 0;
            videoRef.current.pause();
            setState(state => ({...state, paused: true}))
        }
    },[videoOutOfView])

    useEffect(() => {
        // Set isVisible to true after a delay to trigger the fade-in animation
        const timeout = setTimeout(() => {
          setState(state => ({
            ...state,
            pausePlayImgVisible: false,
          }))
        }, 1000); // Adjust the delay as needed
    
        // Cleanup function to clear the timeout
        return () => clearTimeout(timeout);
    }, [pausePlayImgVisible]); 

  return (
    <div ref={divRef} className='w-100 vh-100 position-relative'>
        <video ref={videoRef} loop className='w-100 h-100 object-fit-fill' onClick={pausePlay} id={id}>
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

        <img className={`position-absolute top-50 start-50 ${pausePlayImgVisible ? 'visible' : 'fade-in-element'} pause-play-img`}
         src={playIcon} alt="play icon" 
         onClick={pausePlay} />
        
        <div className='position-absolute bottom-0 text-light mb-3' style={{left: '4%'}}>
            <div className='fs-4'><span className='fs-1 fw-bold'>John Doe</span>. Nov 2nd</div>
            <div className='fs-4' style={{width: "80%"}}>4 Bedrooms Duplex #realestate #construction #design ... <u className='fw-bold'>more</u></div>
        </div>
    </div>
  )
}

export default Video