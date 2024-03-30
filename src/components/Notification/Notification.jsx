import { Drawer } from 'antd';
import React, { useState } from 'react'
import TimeConverter from '../../misc/TimeConverter';

const Notification = ({notification}) => {
    const [state, setState] = useState({
        notificationBoxIsOpen: false
    })
    const {notificationBoxIsOpen} = state;

  return (
    <>
        <div className='p-3 mb-3 rounded-4 notification' onClick={() => setState(state => ({...state, notificationBoxIsOpen: true}))}>
            <div className='text-primary fw-bold mb-3'>{TimeConverter(notification?.created_on)}</div>
            <div className='text-primary fw-bold'>{notification?.subject}</div>
            <div>{notification?.message?.slice(0, 50)} ...</div>
        </div>

        <Drawer
        open={notificationBoxIsOpen}
        title={<div className='text-primary fw-bold'>{notification?.subject}</div>}
        // footer={} // react node 
        closable={false}
        placement='bottom'
        height={'auto'}
        onClose={() => setState(state => ({...state, notificationBoxIsOpen: false}))}
        >
            <div className='text-primary fw-bold mb-3'>{TimeConverter(notification?.created_on)}</div>
            <div>{notification?.message}</div>
        </Drawer>
    </>
  )
}

export default Notification