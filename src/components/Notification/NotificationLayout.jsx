import React, { useState } from 'react'
import './Notification.scss'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Spin, Drawer } from 'antd'

const NotificationLayout = () => {
    const [state, setState] = useState({
        fullNotificationShown: false
    })

    const {fullNotificationShown} = state;

    const showFullNotification = () => {
        setState(state => ({
            ...state,
            fullNotificationShown: true,
        }))
    }

    const fetchData = () => {
        console.log('fetching more data ...')
    }
  return (
    <div className='px-2 mt-5'>
        <div className='text-primary fw-bold h1 text-center mb-5'>Notifications</div>
        
        <InfiniteScroll
        dataLength={2} //This is important field to render the next data
        hasMore={true} 
        next={fetchData} // triggers if hasMore={true}
        loader={
        <div className='mb-3 d-flex justify-content-center align-items-center'>
          <div className='text-primary fw-bold fs-3 me-3'>Loading</div>
          <Spin />
        </div>} // triggers if hasMore={true}
        endMessage={
          <p className='text-primary text-center fw-bold'>
            <b>No more notifications</b>
          </p>
        } // triggers if hasMore={false}
        // below props only if you need pull down functionality
        refreshFunction={() => window.location.reload()}
        // pullDownToRefresh
        // pullDownToRefreshThreshold={50}
        // pullDownToRefreshContent={
        //   <h3 className='text-center text-light fw-bold'>&#8595; Pull down to refresh</h3>
        // }
        // releaseToRefreshContent={
        //   <h3 className='text-center text-light fw-bold'>&#8593; Release to refresh</h3>
        // }
      >
        <div className='p-3 mb-3 rounded-4 notification' onClick={() => showFullNotification()}>
            <div className='text-primary fw-bold mb-3'>9:20, 24 Feb</div>
            <div className='text-primary fw-bold'>Transaction notification</div>
            <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis quasi repudiandae, ...</div>
        </div>

        <div className='p-3 mb-3 rounded-4 notification' onClick={() => showFullNotification()}>
            <div className='text-primary fw-bold mb-3'>9:20, 24 Feb</div>
            <div className='text-primary fw-bold'>Transaction notification</div>
            <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis quasi repudiandae, ...</div>
        </div>

        <div className='p-3 mb-3 rounded-4 notification' onClick={() => showFullNotification()}>
            <div className='text-primary fw-bold mb-3'>9:20, 24 Feb</div>
            <div className='text-primary fw-bold'>Transaction notification</div>
            <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis quasi repudiandae, ...</div>
        </div>

        <div className='p-3 mb-3 rounded-4 notification' onClick={() => showFullNotification()}>
            <div className='text-primary fw-bold mb-3'>9:20, 24 Feb</div>
            <div className='text-primary fw-bold'>Transaction notification</div>
            <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis quasi repudiandae, ...</div>
        </div>

        <div className='p-3 mb-3 rounded-4 notification' onClick={() => showFullNotification()}>
            <div className='text-primary fw-bold mb-3'>9:20, 24 Feb</div>
            <div className='text-primary fw-bold'>Transaction notification</div>
            <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis quasi repudiandae, ...</div>
        </div>

        <div className='p-3 mb-3 rounded-4 notification' onClick={() => showFullNotification()}>
            <div className='text-primary fw-bold mb-3'>9:20, 24 Feb</div>
            <div className='text-primary fw-bold'>Transaction notification</div>
            <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis quasi repudiandae, ...</div>
        </div>

        <div className='p-3 mb-3 rounded-4 notification' onClick={() => showFullNotification()}>
            <div className='text-primary fw-bold mb-3'>9:20, 24 Feb</div>
            <div className='text-primary fw-bold'>Transaction notification</div>
            <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis quasi repudiandae, ...</div>
        </div>

        <div className='p-3 mb-3 rounded-4 notification' onClick={() => showFullNotification()}>
            <div className='text-primary fw-bold mb-3'>9:20, 24 Feb</div>
            <div className='text-primary fw-bold'>Transaction notification</div>
            <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis quasi repudiandae, ...</div>
        </div>

        <div className='p-3 mb-3 rounded-4 notification' onClick={() => showFullNotification()}>
            <div className='text-primary fw-bold mb-3'>9:20, 24 Feb</div>
            <div className='text-primary fw-bold'>Transaction notification</div>
            <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis quasi repudiandae, ...</div>
        </div>

        <div className='p-3 mb-3 rounded-4 notification' onClick={() => showFullNotification()}>
            <div className='text-primary fw-bold mb-3'>9:20, 24 Feb</div>
            <div className='text-primary fw-bold'>Transaction notification</div>
            <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis quasi repudiandae, ...</div>
        </div>
      </InfiniteScroll>
      
      <Drawer
        open={fullNotificationShown}
        title={<div className='text-primary fw-bold'>Transaction notification</div>}
        // footer={} // react node 
        closable={false}
        placement='bottom'
        height={'auto'}
        onClose={() => setState(state => ({...state, fullNotificationShown: false}))}
      >
            <div className='text-primary fw-bold mb-3'>9:20, 24 Feb</div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam numquam voluptates ipsam fuga explicabo magni neque quibusdam obcaecati! Aspernatur, corrupti? lorem20</div>
      </Drawer>
    </div>
  )
}

export default NotificationLayout