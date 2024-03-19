import React, { useContext, useRef, useState } from 'react'
import './Home.scss'
import { HomeContext } from '../../pages/Home/Home'
import Product from './Product'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Drawer, Spin } from 'antd'

const HomeLayout = () => {
  const {tab, changeTab} = useContext(HomeContext);
  const fetchData = () => {
    console.log('fetching more data ...')
  }

  const fetchCommentData = () => {
    console.log("fetching more comments")
  }

  const [commentBoxOpen, setCommentBoxOpen] = useState(false)
  const infiniteScrollRef = useRef(null);
  const handleContentUpdate = () => {

    console.log('closing drawe')
    setCommentBoxOpen(false)
    // Force update the infinite scroll component after Drawer content has been updated
    if (infiniteScrollRef.current) {
      console.log(infiniteScrollRef.current)
      infiniteScrollRef.current.props.next();
    }
  };
  
  return (
    <div className='bg-dark'>
      <InfiniteScroll
        dataLength={2} //This is important field to render the next data
        hasMore={true} 
        next={fetchData} // triggers if hasMore={true}
        loader={
        <div className='mb-3 d-flex justify-content-center align-items-center'>
          <div className='text-light fw-bold fs-3 me-3'>Loading</div>
          <Spin />
        </div>} // triggers if hasMore={true}
        endMessage={
          <p className='text-center text-light fw-bold'>
            <b>No more {tab} feeds</b>
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
        <Product />
        <Product />
      </InfiniteScroll>

      <div
        className="position-fixed w-100 d-flex justify-content-center"
        style={{ top: "5%" }}
      >
        <div
          onClick={() => changeTab("home")}
          className={`text-light me-3 fw-bold fs-3 ${
            tab === "home" ? "active-tab" : ""
          } position-relative`}
        >
          Home
        </div>
        <div
          onClick={() => changeTab("trending")}
          className={`text-light fw-bold fs-3 ${
            tab === "trending" ? "active-tab" : ""
          } position-relative`}
        >
          Trending
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
