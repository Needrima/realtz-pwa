import React from 'react'
import './Catalogue.scss'
import InfiniteScroll from "react-infinite-scroll-component";
import CustomSpin from '../UI/CustomSpin/CustomSpin';
import FormatNumber from '../../misc/NumberFormatter';

const Catalogue = ({products, productsData, nextFunc}) => {
  return (
    <div className='catalogue'>
    <InfiniteScroll
      dataLength={products.length} //This is important field to render the next data
      hasMore={!productsData ? true : productsData?.has_next} 
      next={() => nextFunc(productsData?.next_page)} // triggers if hasMore={true}
      loader={
      <div className={`mb-3 d-flex align-items-center ${productsData ? '' : 'product-loading-center'}`}>
        <CustomSpin />
      </div>} // triggers if hasMore={true}
      endMessage={
        <p className={`text-center fw-bold text-light ${productsData ? '' : 'product-loading-center'}`}>
          <b>no more feeds</b>
        </p>
      } // triggers if hasMore={false}
      // below props only if you need pull down functionality
      // refreshFunction={() => {}}
      // pullDownToRefresh
      // pullDownToRefreshThreshold={50}
    >
      <div className='row'>
        {products && products.length !== 0 ? products.map((product, index) => (
          <div key={index} className="col-4 border border-1 rounded video-div position-relative">
            <video loop autoPlay muted className='w-100 h-100 object-fit-fill rounded' > {/*object-fit-fill*/} 
                <source src={product?.videos[0]} type="video/mp4" />
            </video>
            <span className='position-absolute text-white d-flex align-items-center view-count'>
              <i className="bi bi-play-fill fs-3"></i> <span className='fw-bold'>{FormatNumber(product?.viewed_by?.length)}</span>
            </span>
          </div>
        )) 
        : 
        <div className='vh-100 d-flex align-items-center justify-content-center text-primary fw-bold'>No feeds available</div>
        }
      </div>
    </InfiniteScroll>
    </div>
  )
}

export default Catalogue