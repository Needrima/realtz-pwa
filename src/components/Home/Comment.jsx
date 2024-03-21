import { Drawer, Spin, message, Form } from 'antd';
import React, { useState } from 'react'
import useInfiniteScroll from 'react-easy-infinite-scroll-hook';
import TimeConverter from '../../misc/TimeConverter';
import { TextArea } from 'antd-mobile'
import { useSelector } from 'react-redux';
import { axiosProductInstance } from '../../api/axoios';

const Comment = ({comment, deleteComment}) => {
  const {user, token} = useSelector(state => state.authReducer)
  const [state, setState] = useState({
      repliesBoxOpen: false,
      repliesData: null,
      replies: [],
      fetchingReplies: false,
      numReplies: comment?.replied_to_by.length,
      newReply: '',
      addingNewReply: false,
  })
  const { repliesBoxOpen, fetchingReplies, numReplies, repliesData, replies, newReply, addingNewReply } = state;


  const getCommentReplies = async (page) => {
    setState(state => ({
      ...state,
      fetchingReplies: true,
    }))
    try {
      const {data} = await axiosProductInstance.get(`auth/get-comment-replies/${comment?.reference}/15/${page}`, {
        headers: {
          token: token
        }
      })
      console.log(data);
      // setState(state => ({
      //   ...state,
      //   fetchingReplies: false,
      //   repliesData: data,
      //   replies: [...state.replies, ...data?.replies]
      // }))
    }catch(error) {
      setState(state => ({
        ...state,
        fetchingReplies: false,
      }))
    }
  }

  const openReplies = () => {
    setState(state => ({
      ...state, repliesBoxOpen: true
    }))

    if (replies.length === 0) {
      getCommentReplies(1);
    }
  }

  const addReply = async () => {
    setState(state => ({
      ...state,
      addingNewReply: true,
    }))

    try {
      const { data } = await axiosProductInstance.post(`/auth/add-reply/${comment?.reference}`, {
        reply: newReply
      }, {
        headers: {
          token: token,
        }
      })
      message.success(data?.message)
      setState(state => ({
        ...state,
        addingNewReply: false,
        replies: [...state.replies, data?.added_reply],
        newReply: '',
        numReplies: state.numReplies + 1,
      }))
    }catch(error) {
      message.error(error?.response?.data?.error || 'could not add reply')
      setState(state => ({
        ...state,
        addingNewReply: false,
        newReply: '',
      }))
    }
  }

  const deleteReply = async (reply_reference) => {
    try {
      const {data} = await axiosProductInstance.get(`/auth/delete-comment/${comment?.reference}/${reply_reference}`, {
        headers: {
          token: token,
        }
      })
      message.success(data?.message)
      setState(state => ({
        ...state,
        replies: state.comments.filter(reply => reply?.reference !== data?.deleted_reference),
        numReplies: state.numReplies - 1
      }))
    }catch(error) {
      console.log(error)
    }
  }

  const repliesRef = useInfiniteScroll({
    // Function to fetch more items
    next: () => getCommentReplies(repliesData?.next_page),
    // The number of items loaded if you use the "Y-scroll" axis ("up" and "down")
    // if you are using the "X-scroll" axis ("left" and "right") use "columnCount" instead
    // you can also use "rowCount" and "columnCount" if you use "Y-scroll" and "X-scroll" at the same time 
    rowCount: repliesData ? repliesData?.replies ? repliesData?.replies?.length : 0 : 0,
    // Whether there are more items to load
    // if marked "true" in the specified direction, it will try to load more items if the threshold is reached
    // support for all directions "up", "down", "left", "right", both individually and in all directions at the same time
    hasMore: { down: !repliesData ? true : repliesData?.has_next },
  });

  return (
    <>
      <div className='mb-3'>
        <div className='mb-2'>
          <div>{comment?.comment}</div> 
            <div className='d-flex justify-content-end'>
              <span className='text-primary fw-bold text-decoration-underline me-3' onClick={openReplies}>Reply.({numReplies})</span>
              {user?.fullname === comment?.commenter && <span className='text-primary fw-bold text-decoration-underline me-3'>Edit</span>}
              {user?.fullname === comment?.commenter && <span className='text-primary fw-bold text-decoration-underline' onClick={() => deleteComment(comment?.reference)}>Delete</span>}
            </div>
        </div>
        
        <div className='d-flex justify-content-between text-primary fw-bold'>
          <div>{comment?.commenter}</div>
          <div>{TimeConverter(comment?.created_on)}</div>
        </div>
      </div>

        <Drawer
          open={repliesBoxOpen}
          title={<div className='text-primary fw-bold'>Replies</div>}
          footer={
            <>
              <Form onFinish={addReply}>
                <Form.Item
                  name="reply"
                >
                  <TextArea
                    placeholder='Enter reply ...'
                    name='reply'
                    value={newReply}
                    onChange={(val) => setState(state => ({
                      ...state,
                      newReply: val
                    }))}
                    disabled={addingNewReply}
                    className='border border-primary px-2 mb-2'
                    />
                </Form.Item>
                <button disabled={addingNewReply || !newReply} type='submit' className='btn btn-primary'>{addingNewReply ? <Spin spinning={addingNewReply} />: 'Comment'}</button>
              </Form>
              {repliesData && !repliesData?.has_next && <div className='text-center text-primary fw-bold'>no more comments</div>}
            </>
            } // react node 
          closable={true}
          placement='bottom'
          height={'70%'}
          onClose={() => setState(state => ({...state, repliesBoxOpen: false}))}
        >
          <div 
            ref={repliesRef} 
            style={{
              height: '100%',
              overflowY: 'auto',
            }}
          >
            {replies && replies?.length !== 0 ? 
            replies?.map((reply, index) => 
            <div key={index} className='mb-3'>
              <div className='mb-2'>
                <div>{reply?.replyer}</div> 
                  <div className='d-flex justify-content-end'>
                    {user?.fullname === reply?.replyer && <span className='text-primary fw-bold text-decoration-underline me-3'>Edit</span>}
                    {user?.fullname === reply?.replyer && <span className='text-primary fw-bold text-decoration-underline' onClick={() => deleteReply(reply?.reference)}>Delete</span>}
                  </div>
              </div>
              
              <div className='d-flex justify-content-between text-primary fw-bold'>
                <div>{reply?.replyer}</div>
                <div>{TimeConverter(reply?.created_on)}</div>
              </div>
            </div>
            )
            :
            <div className='fw-bold text-center text-primary mt-5'>no replies yet</div>
            }

            {fetchingReplies && <div className='text-center text-primary fw-bold'>
                <span className='me-2'>Loading</span> <Spin spinning={fetchingReplies} />
            </div>}
          </div>
      </Drawer>
    </>
  )
}

export default Comment