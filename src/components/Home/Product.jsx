import React, { useState } from 'react'
import Video from './Video'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import profileIcon from '../../assets/icons/profile-circle.svg'
import saveIcon from '../../assets/icons/bookmark-white.svg'
import saveIconSaved from '../../assets/icons/bookmark-blue.svg'
import likeIcon from '../../assets/icons/heart-white.svg'
import likeIconLiked from '../../assets/icons/heart-blue.svg'
import commentIcon from '../../assets/icons/comment.svg'
import shareIcon from '../../assets/icons/share-white.svg'
import { Drawer, Spin, message, Form, Input } from 'antd'
import useInfiniteScroll from 'react-easy-infinite-scroll-hook';
import Comment from './Comment'
import { useSelector } from 'react-redux';
import { axiosProductInstance } from '../../api/axoios';
import { TextArea } from 'antd-mobile'
import TimeConverter from '../../misc/TimeConverter';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
  XIcon,
  WhatsappIcon,
} from "react-share";
import { useNavigate } from 'react-router-dom';
import FormatNumber from '../../misc/NumberFormatter';

const Product = ({product}) => {
  const {user, token} = useSelector(state => state.authReducer)
  const navigate = useNavigate();
  const [state, setState] = useState({
      commentsBoxOpen: false,
      shareBoxOpen: false,
      commentsData: null,
      comments: [],
      fetchingComments: false,
      productLiked: product?.liked_by.includes(user.reference),
      numLikes: product?.liked_by.length,
      productSaved: product?.saved_by.includes(user.reference),
      numComments: product?.commented_on_by?.length || 0,
      newComment: '',
      addingNewComment: false,
      likingProduct: false,
      savingProduct: false,
      productViewed: product?.viewed_by.includes(user.reference),
      editCommentBoxOpen: false,
      commentToEdit: null,
      editingComment: false
  })
  const { commentsBoxOpen, fetchingComments, commentsData, comments, productLiked, productSaved, numLikes, numComments, newComment,
     addingNewComment, likingProduct, savingProduct, shareBoxOpen, productViewed, editCommentBoxOpen, commentToEdit, editingComment } = state;

  const likeProduct = async () => {
    setState(state => ({
      ...state,
      likingProduct: true,
    }))
    try {
      const {data} = await axiosProductInstance.get(`auth/like/${product.reference}`, {
        headers: {
          token: token
        }
      })
      setState(state => ({
        ...state,
        productLiked: true,
        numLikes: state.numLikes + 1,
        likingProduct: false
      }))  
    }catch(error) {
      setState(state => ({
        ...state,
        productLiked: false,
        numLikes: state.numLikes + 1,
        likingProduct: false
      }))
    }
  }

  const unLikeProduct = async () => {
    setState(state => ({
      ...state,
      likingProduct: true,
    }))
    try {
      const {data} = await axiosProductInstance.get(`auth/unlike/${product.reference}`, {
        headers: {
          token: token
        }
      })
      setState(state => ({
        ...state,
        productLiked: false,
        numLikes: state.numLikes - 1,
        likingProduct: false,
      }))
  
    }catch(error) {
      setState(state => ({
        ...state,
        productLiked: false,
        numLikes: state.numLikes + 1,
        likingProduct: false
      }))
    }
  }

  const saveProduct = async () => {
    setState(state => ({
      ...state,
      savingProduct: true,
    }))
    try {
      const {data} = await axiosProductInstance.get(`auth/save/${product.reference}`, {
        headers: {
          token: token
        }
      })
      setState(state => ({
        ...state,
        productSaved: true,
        savingProduct: false,
      }))  
    }catch(error) {
      setState(state => ({
        ...state,
        productSaved: false,
        savingProduct: false
      }))
    }
  }

  const unSaveProduct = async () => {
    setState(state => ({
      ...state,
      savingProduct: true,
    }))

    try {
      const {data} = await axiosProductInstance.get(`auth/unsave/${product.reference}`, {
        headers: {
          token: token
        }
      })
      setState(state => ({
        ...state,
        productSaved: false,
        savingProduct: false,
      }))  
    }catch(error) {
      setState(state => ({
        ...state,
        productSaved: true,
        savingProduct: false,
      }))
    }
  }

  const getProductComments = async (page) => {
    setState(state => ({
      ...state,
      fetchingComments: true,
    }))
    try {
      const {data} = await axiosProductInstance.get(`auth/get-product-comments/${product?.reference}/15/${page}`, {
        headers: {
          token: token
        }
      })
      setState(state => ({
        ...state,
        fetchingComments: false,
        commentsData: data,
        comments: [...state.comments, ...data?.comments]
      }))
    }catch(error) {
      setState(state => ({
        ...state,
        fetchingComments: false,
      }))
    }
  }

  const openComments = () => {
    setState(state => ({
      ...state, commentsBoxOpen: true
    }))

    if (comments.length === 0) {
      getProductComments(1);
    }
  }

  const addComment = async (values) => {
    setState(state => ({
      ...state,
      addingNewComment: true,
    }))
    console.log(values)

    try {
      const { data } = await axiosProductInstance.post(`/auth/add-comment/${product?.reference}`, {
        comment: values.comment
      }, {
        headers: {
          token: token,
        }
      })
      message.success(data?.message)
      setState(state => ({
        ...state,
        addingNewComment: false,
        comments: [...state.comments, data?.added_comment],
        newComment: '',
        numComments: state.numComments + 1,
      }))
    }catch(error) {
      message.error(error?.response?.data?.error || 'could not add comment')
      setState(state => ({
        ...state,
        addingNewComment: false,
        newComment: '',
      }))
    }
  }

  const deleteComment = async (comment_reference) => {
    try {
      const {data} = await axiosProductInstance.get(`/auth/delete-comment/${product?.reference}/${comment_reference}`, {
        headers: {
          token: token,
        }
      })
      message.success(data?.message)
      setState(state => ({
        ...state,
        comments: state.comments.filter(comment => comment?.reference !== data?.deleted_reference),
        numComments: state.numComments - 1
      }))
    }catch(error) {
      console.log(error)
    }
  }

  const viewProduct = async () => {
    console.log('about to trigger view product endpoint')
    if (productViewed) return;
    try {
      const {data} = await axiosProductInstance.get(`/auth/view/${product?.reference}`, {
        headers: {
          token: token,
        }
      })
      setState(state => ({...state, productViewed: true}))
    }catch(error) {
      console.log(error?.response?.data?.error)
    }
  }

  const openEditCommentBox = (commentToEdit) => {
    setState(state => ({
      ...state,
      commentToEdit: commentToEdit,
      editCommentBoxOpen: true
    }))
  }

  const editComment = (values) => {
    console.log('new comment:', commentToEdit)
  }

  const commentsRef = useInfiniteScroll({
    // Function to fetch more items
    next: () => getProductComments(commentsData?.next_page),
    // The number of items loaded if you use the "Y-scroll" axis ("up" and "down")
    // if you are using the "X-scroll" axis ("left" and "right") use "columnCount" instead
    // you can also use "rowCount" and "columnCount" if you use "Y-scroll" and "X-scroll" at the same time 
    rowCount: commentsData ? commentsData?.comments ? commentsData?.comments?.length : 0 : 0,
    // Whether there are more items to load
    // if marked "true" in the specified direction, it will try to load more items if the threshold is reached
    // support for all directions "up", "down", "left", "right", both individually and in all directions at the same time
    // hasMore: { down: !commentsData ? true : commentsData?.has_next },
    hasMore: { down: commentsData ? commentsData?.has_next : false },
  });

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
          {product.videos.map((video, index) => <Video key={index} video={video} viewProduct={viewProduct} />)}
        </Carousel>;

        <div className='position-absolute bottom-0 mb-5' style={{right: '10%'}}>
            <div className='mb-4'>
                {likingProduct ? <Spin spinning={likingProduct} /> : productLiked ? 
                <img onClick={unLikeProduct} className='d-block' src={likeIconLiked} alt="like video" /> // chage this to blue like image
                : 
                <img onClick={likeProduct} className='d-block' src={likeIcon} alt="like video" /> 
                }
                <div className='text-light text-center fw-bold'>{FormatNumber(numLikes)}</div>
            </div>

            <div className='mb-4'>
                <img className='d-block' src={commentIcon} alt="comment on video" onClick={openComments} />
                <div className='text-light text-center fw-bold'>{FormatNumber(numComments)}</div>
            </div>

            <div className='mb-4'>
                {savingProduct ? <Spin spinning={savingProduct} /> : productSaved ? 
                <img onClick={unSaveProduct} className='d-block' src={saveIconSaved} alt="save video" /> // chage this to blue like image
                : 
                <img onClick={saveProduct}className='d-block' src={saveIcon} alt="save video" /> 
                }
                <div className='text-light text-center fw-bold'>{productSaved}</div>
            </div>

            <div className='mb-4'>
                <img onClick={() => setState(state => ({...state, shareBoxOpen: true})) } className='d-block' src={shareIcon} alt="share video" />
            </div>

            <div className='mb-4'>
                <img onClick={() => navigate(`/profile/${product?.user_reference}`)} className='d-block' src={profileIcon} alt="view owners profile" />
            </div>
        </div>
        
        <div className='position-absolute bottom-0 text-light mb-4' style={{left: '4%', width: '80%'}}>
            <div className='fs-4 fw-bold'>{product?.owner}</div>
            <div className='fs-4'>{TimeConverter(product?.created_on)}</div>
            <div className='fs-4'>
              {product?.description.slice(0, 50)} {' '}
              {product?.hash_tags.map(hash_tag => hash_tag.startsWith('#') ? hash_tag : '#'+hash_tag).slice(0, 2).join(' ')} ... <u className='fw-bold'>more</u></div>
        </div>
                
        {/* drawer to display comments */}
        <Drawer
          open={commentsBoxOpen}
          title={<div className='text-primary fw-bold'>Comments</div>}
          footer={
          <>
            <Form onFinish={addComment}>
              <Form.Item
                name="comment"
                rules={[
                  {required: true, message: 'Comment cannot be empty'},
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder='Enter comment ...'
                  disabled={addingNewComment}
                  className='border border-primary px-2 mb-2'
                  />
              </Form.Item>
              <button disabled={addingNewComment} type='submit' className='btn btn-primary'>{addingNewComment ? <Spin spinning={addingNewComment} />: 'Comment'}</button>
            </Form>
            {commentsData && !commentsData?.has_next && <div className='text-center text-primary fw-bold'>no more comments</div>}
          </>
          } // react node 
          closable={true}
          placement='bottom'
          height={'70%'}
          onClose={() => setState(state => ({...state, commentsBoxOpen: false}))}
        >
          <div 
            ref={commentsRef} 
            style={{
              height: '100%',
              overflowY: 'auto',
            }}
          > 
            {comments && comments?.length !== 0 ? 
            comments?.map((comment, index) => <Comment key={index} comment={comment} deleteComment={deleteComment} openEditCommentBox={openEditCommentBox} />)
            :
            <div className='fw-bold text-center text-primary mt-5'>no comments yet</div>
            }
          </div>
          {fetchingComments && 
            <div className='text-center text-primary fw-bold'>
                <span className='me-2'>Loading</span> <Spin spinning={fetchingComments} />
            </div>
          }
        </Drawer>

        {/* drawer to display edit comment */}
        <Drawer
          open={editCommentBoxOpen}
          title={<div className='text-primary fw-bold'>Edit comment</div>}
          // footer={} // react node 
          closable={true}
          placement='bottom'
          height={'auuto'}
          onClose={() => setState(state => ({...state, editCommentBoxOpen: false, commentToEdit: null}))}
        >
          <Form onFinish={editComment}>
              <Form.Item
                name="comment"
              >
                {/* <TextArea
                  placeholder='Enter comment ...'
                  name='comment'
                  value={commentToEdit?.comment}
                  onChange={(val) => setState(state => ({
                    ...state,
                    commentToEdit: {...state.commentToEdit, comment: val}
                  }))}
                  disabled={editingComment}
                  className='border border-primary px-2'
                  /> */}
                <Input.TextArea rows={4}
                placeholder='Enter comment ...'
                name='comment'
                value={commentToEdit?.comment}
                disabled={editingComment}
                 />
              </Form.Item>
              <button disabled={editingComment || !commentToEdit?.comment} type='submit' className='btn btn-primary'>{editingComment ? <Spin spinning={editingComment} />: 'Edit'}</button>
            </Form>
        </Drawer>

        {/* drawer to display share icons */}
        <Drawer
          open={shareBoxOpen}
          title={<div className='text-primary fw-bold'>Share</div>}
          // footer={} // react node 
          closable={true}
          placement='bottom'
          height={'auto'}
          onClose={() => setState(state => ({...state, shareBoxOpen: false}))}
        >
          <FacebookShareButton 
            className='me-2 mb-2'
            url={`${window.location.origin}/product/${product.reference}`}
            hashtag='#realtz_app'
          >
            <FacebookIcon
            round={true} />
          </FacebookShareButton>

          <EmailShareButton 
            className='me-2 mb-2'
            subject='Checkout this property on Realtz'
            body='Checkout this awesome property on Realtz'
            url={`${window.location.origin}/product/${product.reference}`}
            >
            <EmailIcon
            round={true} />
          </EmailShareButton>

          <LinkedinShareButton 
            className='me-2 mb-2'
            url={`${window.location.origin}/product/${product.reference}`}
            title='Checkout this property on Realtz'
            summary={`${product.description.slice(0, 50)} ....`}
            source={`${window.location.origin}/home`}
            >
            <LinkedinIcon
            round={true} />
          </LinkedinShareButton>

          <PinterestShareButton 
            className='me-2 mb-2'
            url={`${window.location.origin}/product/${product.reference}`}
            media={product.videos[0]}
            description={`${product.description.slice(0, 50)} ....`}
            >
            <PinterestIcon
            round={true} />
          </PinterestShareButton>

          <RedditShareButton 
            className='me-2 mb-2'
            url={`${window.location.origin}/product/${product.reference}`}
            title='Checkout this property on Realtz'
            >
            <RedditIcon
            round={true} />
          </RedditShareButton>

          <TelegramShareButton 
          className='me-2 mb-2'
          url={`${window.location.origin}/product/${product.reference}`}
          title='Checkout this property on Realtz'
          >
            <TelegramIcon
            round={true} />
          </TelegramShareButton>

          <TwitterShareButton 
            className='me-2 mb-2'
            url={`${window.location.origin}/product/${product.reference}`}
            title='Checkout this property on Realtz'
            hashtags={['#realz_app', '#property_rentals', '#property_shortlets']}
          >
            <XIcon
            round={true} />
          </TwitterShareButton>

          <WhatsappShareButton 
            className='me-2 mb-2'
            url={`${window.location.origin}/product/${product.reference}`}
            title='Checkout this property on Realtz'
          >
            <WhatsappIcon
            round={true} />
          </WhatsappShareButton>
        </Drawer>
    </div>
  )
}

export default Product