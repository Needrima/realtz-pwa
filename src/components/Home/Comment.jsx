import { Drawer, Spin } from 'antd';
import React, { useState } from 'react'
import useInfiniteScroll from 'react-easy-infinite-scroll-hook';
import TimeConverter from '../../misc/TimeConverter';

const Comment = ({comment}) => {
  console.log(comment);
  const [state, setState] = useState({
    repliesBoxOpen: false,
    repliesData: null,
    fetchingReplies: false,
  })
  const {repliesBoxOpen, fetchingReplies} = state

  const fetchMoreReplies = () => {
    if (fetchingReplies) return

      setState(state => ({
        ...state,
        fetchingReplies: true
      }))
  }


  const repliesRef = useInfiniteScroll({
    // Function to fetch more items
    next: fetchMoreReplies,
    // The number of items loaded if you use the "Y-scroll" axis ("up" and "down")
    // if you are using the "X-scroll" axis ("left" and "right") use "columnCount" instead
    // you can also use "rowCount" and "columnCount" if you use "Y-scroll" and "X-scroll" at the same time 
    rowCount: 4,
    // Whether there are more items to load
    // if marked "true" in the specified direction, it will try to load more items if the threshold is reached
    // support for all directions "up", "down", "left", "right", both individually and in all directions at the same time
    hasMore: { down: true },
  });

  return (
    <>
      <div className='mb-3'>
        <div className='mb-2'>{comment?.comment}<span className='text-primary fw-bold text-decoration-underline' onClick={() => setState({...state, repliesBoxOpen: true})}>reply</span></div>
        
        <div className='d-flex justify-content-between text-primary fw-bold'>
          <div>{comment?.commenter}</div>
          <div>{TimeConverter(comment?.created_on)}</div>
        </div>
      </div>

        <Drawer
          open={repliesBoxOpen}
          title={<div className='text-primary fw-bold'>Replies</div>}
          // footer={} // react node 
          closable={true}
          placement='bottom'
          height={'50%'}
          onClose={() => setState(state => ({...state, repliesBoxOpen: false}))}
        >
          <div 
            ref={repliesRef} 
            style={{
              height: '100%',
              overflowY: 'auto',
            }}
          >
            <div className='mb-3'>
              <div className='mb-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, excepturi eum laboriosam quisquam iusto unde debitis aliquam aperiam quae adipisci? Nostrum cumque, ab porro ipsa asperiores corrupti! Similique, ratione cupiditate?</div>
              
              <div className='d-flex justify-content-between text-primary fw-bold'>
                <div>Oyebode Amirdeen</div>
                <div>9:20, 24 Feb</div>
              </div>
            </div>

            <div className='mb-3'>
              <div className='mb-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, excepturi eum laboriosam quisquam iusto unde debitis aliquam aperiam quae adipisci? Nostrum cumque, ab porro ipsa asperiores corrupti! Similique, ratione cupiditate?</div>
              
              <div className='d-flex justify-content-between text-primary fw-bold'>
                <div>Oyebode Amirdeen</div>
                <div>9:20, 24 Feb</div>
              </div>
            </div>

            <div className='mb-3'>
              <div className='mb-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, excepturi eum laboriosam quisquam iusto unde debitis aliquam aperiam quae adipisci? Nostrum cumque, ab porro ipsa asperiores corrupti! Similique, ratione cupiditate?</div>
              
              <div className='d-flex justify-content-between text-primary fw-bold'>
                <div>Oyebode Amirdeen</div>
                <div>9:20, 24 Feb</div>
              </div>
            </div>

            <div className='mb-3'>
              <div className='mb-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, excepturi eum laboriosam quisquam iusto unde debitis aliquam aperiam quae adipisci? Nostrum cumque, ab porro ipsa asperiores corrupti! Similique, ratione cupiditate?</div>
              
              <div className='d-flex justify-content-between text-primary fw-bold'>
                <div>Oyebode Amirdeen</div>
                <div>9:20, 24 Feb</div>
              </div>
            </div>

            {fetchingReplies && <div className='text-center text-primary fw-bold'>
                <span className='me-2'>Loading</span> <Spin spinning={fetchingReplies} />
            </div>}
          </div>
      </Drawer>
    </>
  )
}

export default Comment