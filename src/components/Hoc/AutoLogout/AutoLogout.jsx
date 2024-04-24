import { message } from 'antd';
import React, { useEffect } from 'react'

const inactivityTimeOut = 1000 * 60 // 3 minutes timeout

const autoLogout = (WrappedComponent) => {

  const AutoLogout = () => {
    const signout = () => { 
      message.warning('session expired due to inactivity', parseInt(process.env.REACT_APP_POPUP_TIMEOUT))
      localStorage.clear();  
      window.location.reload();
    };
  
    let inactivityTimeout;
  
    const clearTimeoutFunc = () => { 
        if (inactivityTimeout) {
            clearTimeout(inactivityTimeout)
        } 
    }
    
    const startTimeoutFunc = () =>{
      console.log('timeout reset')
        inactivityTimeout = setTimeout(signout, inactivityTimeOut)
    }
  
    const resetTimeoutFunc = () => {
      clearTimeoutFunc(); 
      startTimeoutFunc(); 
    };
       
    useEffect(()=>{
        let events = [
            'load',
            'mousemove',
            'mousedown',
            'click',
            'scroll',
            'keypress'
        ];
  
        for (let i in events) { 
          window.addEventListener(events[i], resetTimeoutFunc)
        } 
    },[])
  
    return <WrappedComponent />
  }

  return AutoLogout
}

export default autoLogout