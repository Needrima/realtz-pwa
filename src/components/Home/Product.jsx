import React, { useEffect, useRef, useState } from 'react'
import Video from './Video'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import profileIcon from '../../assets/icons/profile-circle.svg'
import saveIcon from '../../assets/icons/bookmark-white.svg'
import likeIcon from '../../assets/icons/heart-white.svg'
import commentIcon from '../../assets/icons/comment.svg'
import shareIcon from '../../assets/icons/share-white.svg'
import { Drawer, Spin } from 'antd'
import useInfiniteScroll from 'react-easy-infinite-scroll-hook';
import Comment from './Comment'
import { useSelector } from 'react-redux';

const Product = ({product}) => {
  console.log(product)
  const {user} = useSelector(state => state.authReducer)
  console.log(user)
  const [state, setState] = useState({
      commentsBoxOpen: false,
      commentsData: null,
      fetchingComments: false,
      nextCommentsPage: 2, // assuming initial page on load to be 1
      previousCommmentPage: 0, // assuming initial page on load to be 1
      productLiked: product?.liked_by.includes(user.reference),
      productSaved: product?.saved_by.includes(user.reference)
  })
  const { commentsBoxOpen, fetchingComments, commentsData, productLiked, productSaved} = state;

  const likeProduct = () => {
    console.log('liking product')
  }

  // const commentsRef = useInfiniteScroll({
  //   // Function to fetch more items
  //   next: () => fetchMoreComments(nextCommentsPage),
  //   // The number of items loaded if you use the "Y-scroll" axis ("up" and "down")
  //   // if you are using the "X-scroll" axis ("left" and "right") use "columnCount" instead
  //   // you can also use "rowCount" and "columnCount" if you use "Y-scroll" and "X-scroll" at the same time 
  //   rowCount: commentsData ? commentsData?.comments ? commentsData?.comments?.length : 0 : 0,
  //   // Whether there are more items to load
  //   // if marked "true" in the specified direction, it will try to load more items if the threshold is reached
  //   // support for all directions "up", "down", "left", "right", both individually and in all directions at the same time
  //   hasMore: { down: commentsData ? commentsData?.has_next : false },
  // });

  //carousel responsveness property
  const responsive = {
      // superLargeDesktop: {
      //   // the naming can be any, depends on you.
      //   breakpoint: { max: 4000, min: 3000 },
      //   items: 5
      // },
      // desktop: {
      //   breakpoint: { max: 3000, min: 1024 },
      //   items: 3
      // },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
      }
  };

  return (
    <div className='position-relative w-100 vh-100'>
        <Carousel 
            responsive={responsive}
            showDots={true}
            arrows={false}
            beforeChange={() => {
                const videos = document.getElementsByTagName('video');
                for (let i = 0; i < videos.length; i++){
                    videos[i].currentTime = 0;
                    videos[i].pause();
                }
            }}
        >
          {product.videos.map((video, index) => <Video key={index} video={video}/>)}
        </Carousel>;

        <div className='position-absolute bottom-0 mb-5' style={{right: '10%'}}>
            <div className='mb-4'>
                {productLiked ? 
                <img className='d-block' src={likeIcon} alt="like video" /> // chage this to red like image
                : 
                <img onClick={likeProduct} className='d-block' src={likeIcon} alt="like video" /> 
                }
                <div className='text-light text-center fw-bold'>{product?.liked_by.length}</div>
            </div>

            <div className='mb-4'>
                <img className='d-block' src={commentIcon} alt="comment on video" onClick={() => setState(state => ({...state, commentsBoxOpen: true}))} />
                <div className='text-light text-center fw-bold'>{product?.commented_on_by.length}</div>
            </div>

            <div className='mb-4'>
            {productSaved ? 
                <img className='d-block' src={saveIcon} alt="like video" /> // chage this to red like image
                : 
                <img onClick={likeProduct} className='d-block' src={saveIcon} alt="like video" /> 
                }
                <div className='text-light text-center fw-bold'>{product?.saved_by.length}</div>
            </div>

            <div className='mb-4'>
                <img className='d-block' src={shareIcon} alt="share video" />
            </div>

            <div className='mb-4'>
                <img className='d-block' src={profileIcon} alt="view owners profile" />
            </div>
        </div>
        
        <div className='position-absolute bottom-0 text-light mb-4' style={{left: '4%'}}>
            <div className='fs-4'><span className='fs-1 fw-bold'>John Doe</span>. Nov 2nd</div>
            <div className='fs-4' style={{width: "80%"}}>4 Bedrooms Duplex #realestate #construction #design ... <u className='fw-bold'>more</u></div>
        </div>

        <Drawer
          open={commentsBoxOpen}
          title={<div className='text-primary fw-bold'>Comments</div>}
          // footer={} // react node 
          closable={true}
          placement='bottom'
          height={'50%'}
          onClose={() => setState(state => ({...state, commentsBoxOpen: false}))}
        >
          <div 
            // ref={commentsRef} 
            style={{
              height: '100%',
              overflowY: 'auto',
            }}
          >

            <Comment />
            <Comment />
            <Comment />
            <Comment />

            {fetchingComments && <div className='text-center text-primary fw-bold'>
                <span className='me-2'>Loading</span> <Spin spinning={fetchingComments} />
            </div>}
          </div>
          
          {commentsData ? !commentsData?.has_next : <div className='text-center text-primary fw-bold'>no more comments</div>}
        </Drawer>
    </div>
  )
}

export default Product