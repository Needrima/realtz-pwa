import React, { useContext, useRef, useState } from 'react'
import './Home.scss'
import { HomeContext } from '../../pages/Home/Home'
import Product from './Product'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Drawer, Spin } from 'antd'

const HomeLayout = () => {
  const {tab, changeTab, homeProductsData, trendingProductsData, 
    homeProducts, trendingProducts, getTrendingProducts, getHomeProducts} = useContext(HomeContext);
  
  return (
    <div className='bg-dark h-100'>
      {tab === 'home' && <InfiniteScroll
        dataLength={homeProducts.length} //This is important field to render the next data
        hasMore={!homeProductsData ? true : homeProductsData?.has_next} 
        next={() => getHomeProducts(homeProductsData?.next_page)} // triggers if hasMore={true}
        loader={
        <div className={`mb-3 d-flex align-items-center ${homeProductsData ? '' : 'product-loading-center'}`}>
          <div className='text-light fw-bold fs-3 me-3'>Loading</div>
          <Spin />
        </div>} // triggers if hasMore={true}
        endMessage={
          <p className={`text-center fw-bold text-light ${homeProductsData ? '' : 'product-loading-center'}`}>
            <b>no more {tab} feeds</b>
          </p>
        } // triggers if hasMore={false}
        // below props only if you need pull down functionality
        refreshFunction={() => window.location.reload()}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
      >
        {homeProducts && homeProducts.length !== 0 && homeProducts.map((product, index) => <Product key={index} product={product} />)}
        {homeProducts && homeProducts.length !== 0 && homeProducts.map((product, index) => <Product key={index} product={product} />)}
      </InfiniteScroll>}

      {tab === 'trending' && <InfiniteScroll
        dataLength={trendingProducts.length} //This is important field to render the next data
        hasMore={!trendingProductsData ? true : trendingProductsData?.has_next} 
        next={() => getTrendingProducts(trendingProductsData?.next_page)} // triggers if hasMore={true}
        loader={
        <div className={`mb-3 d-flex align-items-center ${trendingProductsData ? '' : 'product-loading-center'}`}>
          <div className='text-light fw-bold fs-3 me-3'>Loading</div>
          <Spin />
        </div>} // triggers if hasMore={true}
        endMessage={
          <p className={`text-center fw-bold text-light ${trendingProductsData ? '' : 'product-loading-center'}`}>
            <b>no more {tab} feeds</b>
          </p>
        } // triggers if hasMore={false}
        // below props only if you need pull down functionality
        refreshFunction={() => window.location.reload()}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
      >
      {trendingProducts && trendingProducts.length !== 0 && trendingProducts.map((product, index) => <Product key={index} product={product} />)}
      </InfiniteScroll>}

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
