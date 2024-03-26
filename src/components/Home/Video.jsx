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

    // observes video when it is 51% of view
    useEffect(() => {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          // If the entry is not intersecting, the div is out of view
          setState(state => ({
            ...state,
            outofView51:!entry.isIntersecting
          }))
        });
      }, { threshold: 0.51 }); // 51% out of view
  
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

    // observes video when it is 49% of view
    useEffect(() => {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          // If the entry is not intersecting, the div is out of view
          setState(state => ({
            ...state,
            outofView49:!entry.isIntersecting
          }))
        });
      }, { threshold: 0.49 }); // 49% out of view
  
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
        if (outofView49 && !paused) { // video is 49% out of view and is playing
            // videoRef.current.currentTime = 0;
            videoRef.current.pause();
            videoRef.current.muted = true;
            setState(state => ({...state, paused: true, muted: true}))
        }
        if (!outofView51 && paused) { // video is 51% in view and is not playing
          videoRef.current.play();
          videoRef.current.muted = true;
          setState(state => ({...state, paused: false, muted: true}))
        }
    },[outofView49, outofView51])

    // playPause icon fade-in animation
    useEffect(() => {
        // set pausePlayImgVisible to false after a delay to trigger the fade-in animation
        const timeout = setTimeout(() => {
          setState(state => ({
            ...state,
            pausePlayImgVisible: false,
          }))
        }, 1700); // Adjust the delay as needed
    
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
        <video ref={videoRef} loop autoPlay muted className='w-100 vh-100' 
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