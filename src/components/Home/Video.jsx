import React, { useEffect, useRef, useState } from 'react'
import playIcon from '../../assets/icons/play.svg'
import pauseIcon from '../../assets/icons/pause.svg'

const Video = ({video}) => {
    const videoRef = useRef();
    const [state, setState] = useState({
        paused: false,
        muted: true,
        videoOutOfView: false,
        pausePlayImgVisible: true,
    })
    const {paused, muted, videoOutOfView, pausePlayImgVisible } = state;

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
    const videoDivRef = useRef(null);
    useEffect(() => {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          // If the entry is not intersecting, the div is out of view
          setState(state => ({
            ...state,
            videoOutOfView:!entry.isIntersecting
          }))
        });
      }, { threshold: 0.5 }); // 50% out of view
  
      // Start observing the div
      if (videoDivRef.current) {
        observer.observe(videoDivRef.current);
      }
  
      // Cleanup
      return () => {
        if (videoDivRef.current) {
          observer.unobserve(videoDivRef.current);
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

    // playPause icon fade-in animation
    useEffect(() => {
        // set pausePlayImgVisible to false after a delay to trigger the fade-in animation
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
    <div ref={videoDivRef} className='w-100 vh-100 position-relative'>
        <video ref={videoRef} loop autoPlay muted className='w-100 vh-100 object-fit-fill' onClick={pausePlay}> {/*object-fit-fill*/}
            <source src={video} type="video/mp4" />
        </video>

        {paused ? 
        <img className={`position-absolute top-50 start-50 ${pausePlayImgVisible ? 'visible' : 'fade-in-element'} pause-play-img`}
         src={playIcon} alt="play icon" 
         onClick={pausePlay} />
        :
        <img className={`position-absolute top-50 start-50 ${pausePlayImgVisible ? 'visible' : 'fade-in-element'} pause-play-img`}
         src={pauseIcon} alt="pause icon" 
         onClick={pausePlay} />}
    </div>
  )
}

export default Video