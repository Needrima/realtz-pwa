import React, { useContext } from 'react'
import settingsIcon from '../../assets/icons/settings-icon.svg'
import userImage from '../../assets/images/casual.jpg'
import uploadImageIcon from '../../assets/icons/upload-image-icon.svg'
import FormatNumber from '../../misc/NumberFormatter'
import video from '../../assets/videos/video.mp4'
import './UserProfile.scss'
import { useNavigate } from 'react-router-dom'
import { Drawer, Form, Input, Modal, Rate, Spin, Upload } from 'antd'
import { UserProfileContext } from '../../pages/UserProfile/UserProfile'
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
import { USERNAME_REGEX } from '../../misc/regex'
import { useSelector } from 'react-redux'

const UserProfileLayout = () => {
    const navigate = useNavigate();
    const {user, token} = useSelector(state => state?.authReducer) 
    const {userData, loading, editProfileBoxOpen, openEditProfileBox, shareProfileBoxOpen, openShareProfileBox, viewImageBoxOpen, openViewImageBox,
        imageModalIsOpen, showImageModal, uploadImageModalOpen, openUploadImageModal, ratingBoxIsOpen, openRatingBox} = useContext(UserProfileContext);
    console.log('user:', user);
    console.log('userData:', userData);
  return (
    <div className='px-3 bg-white vh-100'>
      {loading ? 
      <div className='text-center text-primary fw-bold product-loading-center'>
        <span className='me-2'>Loading ...</span> <Spin className='user-profile-spin' spinning={loading} />
      </div>
      : 
      <>
        <div className='mt-5 d-flex justify-content-end'>
            <img src={settingsIcon} alt="settings-icon" onClick={() => navigate('/settings')} />
        </div>

        <div className='mt-3 d-flex justify-content-center'>
            <div className='position-relative' onClick={() => openViewImageBox(true)}>
                <img src={userData?.image || userImage} alt="avatar" className='rounded-circle avatar' />
                {user?.reference === userData?.reference && <img src={uploadImageIcon} alt="" className='position-absolute upload-img-icon' />}
            </div>
        </div>

        <div className='text-primary fw-bold text-center mt-3 text-capitalize'>{userData?.fullname}</div>
          <div className='text-primary fw-bold text-center text-secondary'>@{userData?.username.toLowerCase()}</div>
          {userData?.user_type === 'agent' &&
          <div className='text-primary fw-bold text-center mt-3'>
          <Rate
            defaultValue={userData?.star_rating}
            className='text-primary me-2'
            tooltips={['Poor', 'Fair', 'Average', 'Good', 'Awesome']}
            // allowClear={false}
            disabled
            allowHalf
          />
          {user?.reference !== userData?.reference && <i className="bi bi-plus-circle-fill" onClick={() =>  openRatingBox(true)} ></i>}
          <br />
          Avg. Rating
        </div>}

        {userData?.user_type === 'agent' && 
        <div className='d-flex justify-content-around mt-3'>
            <div className='text-primary text-center'>
                <div className='fw-bold'>{FormatNumber(userData?.num_likes)}</div>
                <div>Likes</div>
            </div>
            <div  className='text-primary text-center'>
                <div className='fw-bold'>{FormatNumber(userData?.num_products)}</div>
                <div>Listings</div>
            </div>
            <div className='text-primary text-center'>
                <div className='fw-bold'>{userData?.star_rating} / 5</div>
                <div>Star rating</div>
            </div>
        </div>}

        <div className='mt-3 px-4 text-center bio'>
          {userData?.bio || (userData?.reference === user?.reference) 
          ? "You don't have a bio yet. Click the edit profile button to tell others a little about yourself" 
          : `${userData?.username} has not added a bio yet` 
          }
        </div>

        <div className='mt-3 d-flex justify-content-center'>
            {user?.reference === userData?.reference && <button className='btn btn-primary btn-lg me-2 fw-bold' onClick={() => openEditProfileBox(true)}>Edit Profile</button>}
            <button className='btn btn-primary btn-lg fw-bold' onClick={() => openShareProfileBox(true)}>Share Profile</button>
        </div>

        <div className='mt-5'>
            <div className='fw-bold fs-4'>{userData?.user_type === 'agent' ? 'Recent listings' : 'Liked listings'}</div>

            <div className='my-3 row'>
                <div className="p-1 col-6 mb-1">
                    <div className="rounded-3 p-2 listing">
                        <div className='w-100 position-relative video-div '>
                            <video loop autoPlay muted className='w-100 object-fit-fill rounded-3'> {/*object-fit-fill*/}
                                <source src={video} type="video/mp4" />
                            </video>
                            <span className='badge bg-primary position-absolute status-badge'>Rented</span>
                        </div>

                        <div className='text-primary mt-1 fw-bold'>5 Bedroom Semi-Detached Duplex</div>
                        <div className='mt-1 address'>Lakeview Park Estate, VGC, Lekki, Lagos</div>
                        <div className="mt-1 d-flex justify-content-between align-items-center">
                            <span className='badge badge-primary bg-primary status-badge'>More</span>
                            <span style={{fontSize: '7px'}}>Posted: October 2, 2023</span>
                        </div>
                    </div>
                </div>

                <div className="p-1 col-6 mb-1">
                    <div className="rounded-3 p-2 listing">
                        <div className='w-100 position-relative video-div '>
                            <video loop autoPlay muted className='w-100 object-fit-fill rounded-3'> {/*object-fit-fill*/}
                                <source src={video} type="video/mp4" />
                            </video>
                            <span className='badge bg-primary position-absolute status-badge'>For rent</span>
                        </div>

                        <div className='text-primary mt-1 fw-bold'>5 Bedroom Semi-Detached Duplex</div>
                        <div className='mt-1 address'>Lakeview Park Estate, VGC, Lekki, Lagos</div>
                        <div className="mt-1 d-flex justify-content-between align-items-center">
                            <span className='badge badge-primary bg-primary status-badge'>More</span>
                            <span style={{fontSize: '7px'}}>Posted: October 2, 2023</span>
                        </div>
                    </div>
                </div>

                <div className="p-1 col-6 mb-1">
                    <div className="rounded-3 p-2 listing">
                        <div className='w-100 position-relative video-div '>
                            <video loop autoPlay muted className='w-100 object-fit-fill rounded-3'> {/*object-fit-fill*/}
                                <source src={video} type="video/mp4" />
                            </video>
                            <span className='badge bg-primary position-absolute status-badge'>On shortlet</span>
                        </div>

                        <div className='text-primary mt-1 fw-bold'>5 Bedroom Semi-Detached Duplex</div>
                        <div className='mt-1 address'>Lakeview Park Estate, VGC, Lekki, Lagos</div>
                        <div className="mt-1 d-flex justify-content-between align-items-center">
                            <span className='badge badge-primary bg-primary status-badge'>More</span>
                            <span style={{fontSize: '7px'}}>Posted: October 2, 2023</span>
                        </div>
                    </div>
                </div>

                <div className="p-1 col-6 mb-1">
                    <div className="rounded-3 p-2 listing">
                        <div className='w-100 position-relative video-div '>
                            <video loop autoPlay muted className='w-100 object-fit-fill rounded-3'> {/*object-fit-fill*/}
                                <source src={video} type="video/mp4" />
                            </video>
                            <span className='badge bg-primary position-absolute status-badge'>For shortlet</span>
                        </div>

                        <div className='text-primary mt-1 fw-bold'>5 Bedroom Semi-Detached Duplex</div>
                        <div className='mt-1 address'>Lakeview Park Estate, VGC, Lekki, Lagos</div>
                        <div className="mt-1 d-flex justify-content-between align-items-center">
                            <span className='badge badge-primary bg-primary status-badge'>More</span>
                            <span style={{fontSize: '7px'}}>Posted: October 2, 2023</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* image actions drawer */}
        <Drawer
         open={viewImageBoxOpen}
        //  title={<div className='text-primary fw-bold'>Share Profile</div>}
         // footer={} // react node 
         placement='bottom'
         height={'auto'}
         closable={false}
         onClose={() => openViewImageBox(false)}
        >
            <div className='text-center text-primary fw-bold fs-3' onClick={() => showImageModal(true)}>View</div>
            {user?.reference === userData?.reference &&
            <>
              <hr />
              <div className='text-center text-primary fw-bold fs-3' onClick={() => openUploadImageModal(true)}>Change</div>
            </>}
        </Drawer>

        {/* give rating drawer */}
        {userData?.reference !== user?.reference &&
        <Drawer
         open={ratingBoxIsOpen}
         title={<div className='text-primary fw-bold'>Rate Agent</div>}
         // footer={} // react node 
         placement='bottom'
         height={'auto'}
         closable={true}
         onClose={() => openRatingBox(false)}
        >
            <div className='text-center text-primary fw-bold fs-3'>
              <Rate
              defaultValue={0}
              className='text-primary'
              tooltips={['Poor', 'Fair', 'Average', 'Good', 'Awesome']}
              // allowClear={false}
              // allowHalf
              onChange={(rating) => console.log(rating)}
              disabled={true}
              />
            </div>
        </Drawer>}

        {/* drawer to edit profile */}
        {userData?.reference === user?.reference &&
        <Drawer
          open={editProfileBoxOpen}
          title={<div className='text-primary fw-bold'>Edit profile</div>}
          // footer={} // react node 
          closable={true}
          height={'auto'}
          onClose={() => openEditProfileBox(false)}
        >
            <Form 
            // form={editForm}
            // onFinish={editComment}
          >
            <Form.Item
              name='username'
              label='Username'
              rules={[
                {min: 3, message: "Username should be atleast 3 characters long"},
                {whitespace: true, message: "Username cannot be empty"},
                {
                  async validator(rule, value) {
                    if (USERNAME_REGEX.test(value)) return Promise.resolve();
                    return Promise.reject(new Error("Username must be alphanumeric with '_' as the only special character allowed"));
                  },
                  validateTrigger: "onChange",
                },
                
              ]}
            >
              <Input
                placeholder='Username'
                className='text-input'
              />
            </Form.Item>

            <Form.Item
              name="bio"
              label='Bio'
            >
              <Input.TextArea 
                rows={4}
                placeholder='Write a little about yourself'
              //   disabled={editingComment}
                className='border border-primary px-2 mb-2'
              />
            </Form.Item>
              
            <button 
                // disabled={editingComment} 
                type='submit'
                className='btn btn-primary'
            >Edit</button>
          </Form>
        </Drawer>}

        {/* drawer to display share icons */}
        <Drawer
          open={shareProfileBoxOpen}
          title={<div className='text-primary fw-bold'>Share Profile</div>}
          // footer={} // react node 
          closable={true}
          placement='bottom'
          height={'auto'}
          onClose={() => openShareProfileBox(false)}
        >
          <FacebookShareButton 
            className='me-2 mb-2'
            url={`${window.location.origin}/profile/${userData?.reference}`}
          >
            <FacebookIcon
            round={true} />
          </FacebookShareButton>

          <EmailShareButton 
            className='me-2 mb-2'
            subject='username on realtz'
            body='profile bio'
            url={`${window.location.origin}/profile/${userData?.reference}`}
            >
            <EmailIcon
            round={true} />
          </EmailShareButton>

          <LinkedinShareButton 
            className='me-2 mb-2'
            url={`${window.location.origin}/profile/${userData?.reference}`}
            title='username on realtz'
            summary={`profile bio`}
            >
            <LinkedinIcon
            round={true} />
          </LinkedinShareButton>

          <PinterestShareButton 
            className='me-2 mb-2'
            url={`${window.location.origin}/profile/${userData?.reference}`}
            media={`user image`}
            description={`profile bio`}
            >
            <PinterestIcon
            round={true} />
          </PinterestShareButton>

          <RedditShareButton 
            className='me-2 mb-2'
            url={`${window.location.origin}/profile/${userData?.reference}`}
            title='username on realtz'
            >
            <RedditIcon
            round={true} />
          </RedditShareButton>

          <TelegramShareButton 
          className='me-2 mb-2'
          url={`${window.location.origin}/profile/${userData?.reference}`}
          title='username on realtz'
          >
            <TelegramIcon
            round={true} />
          </TelegramShareButton>

          <TwitterShareButton 
            className='me-2 mb-2'
            url={`${window.location.origin}/profile/${userData?.reference}`}
            title='username on realtz'
          >
            <XIcon
            round={true} />
          </TwitterShareButton>

          <WhatsappShareButton 
            className='me-2 mb-2'
            url={`${window.location.origin}/profile/${userData?.reference}`}
            title='username on realtz'
          >
            <WhatsappIcon
            round={true} />
          </WhatsappShareButton>
        </Drawer>
        
        {/* view avatar modal */}
        <Modal 
         title="Avatar"
         open={imageModalIsOpen}
         onOk={() => showImageModal(false)} 
         onCancel={() => showImageModal(false)}
         footer={[]}
          >
            <img src={userData?.image || userImage} alt="avatar" className='w-100' />
        </Modal>

        {/* change avatar modal */}
        <Modal 
         title="Avatar"
         open={uploadImageModalOpen}
         onOk={() => openUploadImageModal(false)} 
         onCancel={() => openUploadImageModal(false)}
         footer={[]}
          >
            <div className='text-center'>
              <Upload>
                  <button className='btn btn-outline-primary'>Choose Image</button>
              </Upload>
            </div>
        </Modal>
      </>}
    </div>
  )
}

export default UserProfileLayout