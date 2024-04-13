import React, { useContext, useState } from 'react'
import './Notification.scss'
import InfiniteScroll from 'react-infinite-scroll-component'
import CustomSpin from '../UI/CustomSpin/CustomSpin'
import { NotificationContext } from '../../pages/Notification/Notification'
import Notification from './Notification'
import './Notification.scss'

const NotificationLayout = () => {
  const {loading, notificationData, notifications, getNotifications} = useContext(NotificationContext);

  return (
    <div className='px-2 mt-5'>
        <div className='text-primary fw-bold h1 text-center mb-5'>Notifications</div>
        
        {loading ? <div className='product-loading-center'><CustomSpin spinning={loading} /> </div>: 
        <>
        <InfiniteScroll
          dataLength={notifications.length} //This is important field to render the next data
          hasMore={!notificationData ? true : notificationData?.has_next} 
          next={() => getNotifications(notificationData?.next_page)} // triggers if hasMore={true}
          loader={
          <div className={`mb-3 d-flex align-items-center ${notificationData ? '' : 'product-loading-center'}`}>
            <CustomSpin spinning={true} />
          </div>} // triggers if hasMore={true}
          endMessage={
            <p className={`text-center fw-bold text-light ${notificationData ? '' : 'product-loading-center'}`}>
              <b className='text-primary'>no more notifications</b>
            </p>
          } // triggers if hasMore={false}
          // below props only if you need pull down functionality
          // refreshFunction={() => {}}
          // pullDownToRefresh
          // pullDownToRefreshThreshold={50}
        >
        {notifications && notifications.length > 0 ? notifications.map(notification => <Notification notification={notification} />) : <div className='text-center text-primary'>You don't have any notification</div>}
      </InfiniteScroll>
      </>}
    </div>
  )
}

export default NotificationLayout