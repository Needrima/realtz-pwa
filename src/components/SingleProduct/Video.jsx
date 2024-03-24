import React, { useEffect, useRef, useState } from 'react'
import playIcon from '../../assets/icons/play.svg'
import pauseIcon from '../../assets/icons/pause.svg'
import muteIcon from '../../assets/icons/mute.svg'
import unMuteIcon from '../../assets/icons/unmute.svg'
import { useNavigate } from 'react-router-dom'

const Video = ({video, viewProduct, productRef}) => {
    const videoRef = useRef(null);
    const videoDivRef = useRef(null);
    const navigate = useNavigate();

    const [state, setState] = useState({
        paused: false,
        muted: true,
        outofView51: false,
        outofView49: false,
        pausePlayImgVisible: true,
        startTime: 0,
        isMonitoringPlay:false, 
    })
    const {paused, muted, pausePlayImgVisible, outofView51, outofView49, startTime, isMonitoringPlay } = state;

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

    // handles viewing product if watched for atleast 10 seconds
    const handlePlay = (event) => {
      setState({...state, startTime: event.target.currentTime, isMonitoringPlay: true})
    };
  
    const handleTimeUpdate = (event) => {
      if (isMonitoringPlay &&  event.target.currentTime - startTime >= 10) {
        // console.log('Video has been playing for at least 10 seconds');
        viewProduct()
        setState({...state, startTime: 0, isMonitoringPlay: false})
      }
    };

  return (
    <div ref={videoDivRef} className='w-100 vh-100 position-relative'>
        <video ref={videoRef} loop autoPlay muted className='w-100 vh-100 object-fit-fill' 
          onClick={() => navigate(`/product/${productRef}`)} 
          onPlay={handlePlay} 
          onTimeUpdate={handleTimeUpdate}
        > {/*object-fit-fill*/}
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

        {muted ? 
        <img className={`position-absolute mute-unmute-img`}
         src={unMuteIcon} alt="mute icon" 
         onClick={muteUnmute} />
        :
        <img className={`position-absolute mute-unmute-img`}
         src={muteIcon} alt="umute icon" 
         onClick={muteUnmute} />}
    </div>
  )
}

export default Video