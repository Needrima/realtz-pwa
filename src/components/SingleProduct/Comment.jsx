import { Drawer, Spin, message, Form, Input } from 'antd';
import React, { useState } from 'react'
import useInfiniteScroll from 'react-easy-infinite-scroll-hook';
import TimeConverter from '../../misc/TimeConverter';
import { useSelector } from 'react-redux';
import { axiosProductInstance } from '../../api/axoios';
import FormatNumber from '../../misc/NumberFormatter';
import CustomSpin from '../UI/CustomSpin/CustomSpin';

const Comment = ({comment, deleteComment, openEditCommentBox}) => {
  const {user, token, isLoggedIn} = useSelector(state => state.authReducer)
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [state, setState] = useState({
      repliesBoxOpen: false,
      repliesData: null,
      replies: [],
      fetchingReplies: false,
      numReplies: comment?.replied_to_by?.length || 0,
      addingNewReply: false,
      editReplyBoxOpen: false,
      replyToEdit: null,
      editingReply: false,
  })
  const { repliesBoxOpen, fetchingReplies, numReplies, repliesData, replies, addingNewReply, editReplyBoxOpen, replyToEdit, editingReply } = state;


  const getCommentReplies = async (page) => {
    setState(state => ({
      ...state,
      fetchingReplies: true,
    }))
    try {
      const {data} = await axiosProductInstance.get(`get-comment-replies/${comment?.reference}/${process.env.REACT_APP_DEFAULT_FETCH_COUNT}/${page}`, {
        headers: {
          token: token
        }
      })
      setState(state => ({
        ...state,
        fetchingReplies: false,
        repliesData: data, 
        replies: [...state.replies, ...data?.replies]
      }))
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

  const openEditReplyBox = (replyToEdit) => {
    setState(state => ({
      ...state,
      replyToEdit: replyToEdit,
      editReplyBoxOpen: true
    }))
    editForm.setFieldValue('edited_reply', replyToEdit?.reply)
  }

  const addReply = async (values) => {
    setState(state => ({
      ...state,
      addingNewReply: true,
    }))

    try {
      const { data } = await axiosProductInstance.post(`/auth/add-reply/${comment?.reference}`, {
        reply: values.reply,
      }, {
        headers: {
          token: token,
        }
      })
      message.success(data?.message, parseInt(process.env.REACT_APP_POPUP_TIMEOUT))
      setState(state => ({
        ...state,
        addingNewReply: false,
        replies: [...state.replies, data?.added_reply],
        newReply: '',
        numReplies: state.numReplies + 1,
      }))
      form.setFieldsValue({ reply: '' });
    }catch(error) {
      message.error(error?.response?.data?.error || 'could not add reply', parseInt(process.env.REACT_APP_POPUP_TIMEOUT))
      setState(state => ({
        ...state,
        addingNewReply: false,
        newReply: '',
      }))
    }
  }

  const deleteReply = async (reply_reference) => {
    try {
      const {data} = await axiosProductInstance.get(`/auth/delete-reply/${comment?.reference}/${reply_reference}`, {
        headers: {
          token: token,
        }
      })
      message.success(data?.message, parseInt(process.env.REACT_APP_POPUP_TIMEOUT))
      setState(state => ({
        ...state,
        replies: state.replies.filter(reply => reply?.reference !== data?.deleted_reference),
        numReplies: state.numReplies - 1
      }))
    }catch(error) {
      message.error(error?.response?.data?.error || 'could not delete reply', parseInt(process.env.REACT_APP_POPUP_TIMEOUT))
    }
  }

  const editReply = async (values) => {
    if (values.edited_reply.trim() === replyToEdit?.reply) {
      message.warning('no change has been made')
      return
    }
    setState(state => ({
      ...state,
      editingReply: true,
    }))
    try {
      const {data} = await axiosProductInstance.post(`/auth/edit-reply/${replyToEdit?.reference}`, {
        reply: values.edited_reply
      }, {
        headers: {
          token: token,
        }
      })
      setState(state => ({
        ...state,
        replyToEdit: null,
        editReplyBoxOpen: false,
        replies: state.replies.map(reply => reply.reference === data?.updated_reply.reference ? data?.updated_reply : reply),
        editingReply: false
      }))
      editForm.setFieldValue('edited_reply', '')
      message.success(data?.message, parseInt(process.env.REACT_APP_POPUP_TIMEOUT))
    }catch(error) {
      message.error(error?.response?.data?.error || 'could not edit reply', parseInt(process.env.REACT_APP_POPUP_TIMEOUT))
      setState(state => ({
        ...state,
        editingReply: false
      }))
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
    // hasMore: { down: !repliesData ? true : repliesData?.has_next },
    hasMore: { down: repliesData ? repliesData?.has_next : false },
  });

  return (
    <>
      <div className='mb-3'>
        <div className='mb-2'>
          <div>{comment?.comment}</div> 
            <div className='d-flex justify-content-end'>
              <span className='text-primary fw-bold text-decoration-underline me-3' onClick={openReplies}>Reply.({FormatNumber(numReplies)})</span>
              {user?.reference === comment?.commenter_reference && <span onClick={() => openEditCommentBox(comment)} className='text-primary fw-bold text-decoration-underline me-3'>Edit</span>}
              {user?.reference === comment?.commenter_reference && <span className='text-primary fw-bold text-decoration-underline' onClick={() => deleteComment(comment?.reference)}>Delete</span>}
            </div>
        </div>
        
        <div className='d-flex justify-content-between text-primary fw-bold'>
          <div>{comment?.commenter}</div>
          <div>{TimeConverter(comment?.created_on)}</div>
        </div>
        <hr />
      </div>

      <Drawer
          open={repliesBoxOpen}
          title={<div className='text-primary fw-bold'>Replies</div>}
          footer={isLoggedIn &&
            <>
              <Form 
              form={form}
              onFinish={addReply}
              >
                <Form.Item
                  name="reply"
                  rules={[
                    {required: true, message: 'Reply cannot be empty'},
                  ]}
                >
                <Input.TextArea
                  rows={4}
                  placeholder='Enter reply ...'
                  disabled={addingNewReply}
                  className='border border-primary px-2 mb-2'
                  />
                </Form.Item>
                <button disabled={addingNewReply} type='submit' className='btn btn-primary'>{addingNewReply ? <CustomSpin color={'white'} spinning={addingNewReply} />: 'Reply'}</button>
              </Form>
              {repliesData && !repliesData?.has_next && <div className='text-center text-primary fw-bold'>no more replies</div>}
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
                  <div>{reply?.reply}</div> 
                  <div className='d-flex justify-content-end'>
                    {user?.reference === reply?.replyer_reference && <span onClick={() => openEditReplyBox(reply)} className='text-primary fw-bold text-decoration-underline me-3'>Edit</span>}
                    {user?.reference === reply?.replyer_reference && <span className='text-primary fw-bold text-decoration-underline' onClick={() => deleteReply(reply?.reference)}>Delete</span>}
                  </div>
              </div>
              
              <div className='d-flex justify-content-between text-primary fw-bold'>
                <div>{reply?.replyer}</div>
                <div>{TimeConverter(reply?.created_on)}</div>
              </div>
              <hr />
            </div>
            )
            :
            <div className='fw-bold text-center text-primary mt-5'>no replies yet</div>
            }

            {fetchingReplies && <div className='text-center text-primary fw-bold'>
                <CustomSpin spinning={fetchingReplies} />
            </div>}
          </div>
      </Drawer>

      {/* drawer to display edit reply */}
      <Drawer
          open={editReplyBoxOpen}
          title={<div className='text-primary fw-bold'>Edit reply</div>}
          // footer={} // react node 
          closable={true}
          placement='bottom'
          height={'auto'}
          onClose={() => {
            setState(state => ({...state, editReplyBoxOpen: false, replyToEdit: null}))
            editForm.setFieldValue('edited_reply', '')
          }}
        >
          <Form 
            form={editForm}
            onFinish={editReply}
          >
              <Form.Item
                name="edited_reply"
                rules={[
                  {required: true, message: 'Reply cannot be empty'},
                ]}
              >
                <Input.TextArea 
                  rows={4}
                  placeholder='Enter reply ...'
                  disabled={editingReply}
                  className='border border-primary px-2 mb-2'
                 />
              </Form.Item>
              <button 
                disabled={editingReply} 
                type='submit'
                className='btn btn-primary'
              >{editingReply ? <CustomSpin color={'white'} spinning={editingReply} />: 'Edit'}</button>
            </Form>
        </Drawer>
    </>
  )
}

export default Comment