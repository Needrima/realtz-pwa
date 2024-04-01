import React, { useContext } from "react";
import settingsIcon from "../../assets/icons/settings-icon.svg";
import userImage from "../../assets/images/casual.jpg";
import uploadImageIcon from "../../assets/icons/upload-image-icon.svg";
import FormatNumber from "../../misc/NumberFormatter";
import video from "../../assets/videos/video.mp4";
import "./UserProfile.scss";
import { useNavigate } from "react-router-dom";
import { Drawer, Form, Input, Modal, Rate, Spin, Upload, message } from "antd";
import { UserProfileContext } from "../../pages/UserProfile/UserProfile";
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
import { USERNAME_REGEX } from "../../misc/regex";
import { useSelector } from "react-redux";
import TimeConverter from "../../misc/TimeConverter";
import CustomSpin from "../UI/CustomSpin/CustomSpin";
import { axiosUserInstance } from "../../api/axoios";

const UserProfileLayout = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state?.authReducer);
  const {
    userData,
    loading,
    editProfileBoxOpen,
    openEditProfileBox,
    shareProfileBoxOpen,
    openShareProfileBox,
    viewImageBoxOpen,
    openViewImageBox,
    imageModalIsOpen,
    showImageModal,
    uploadImageModalOpen,
    openUploadImageModal,
    ratingBoxIsOpen,
    openRatingBox,
    loadingProfileProducts,
    profileProducts,
    uploadImage,
    uploadingProfileImage,
    editProfile,
    editButtonLoading,
    formRef,
  } = useContext(UserProfileContext);

  return (
    <div className="px-3 bg-white vh-100">
      {loading ? (
        <div className="text-center text-primary fw-bold product-loading-center">
          <CustomSpin className="user-profile-spin" spinning={loading} />
        </div>
      ) : (
        <>
          <div className="mt-5 d-flex justify-content-end">
            <img
              src={settingsIcon}
              alt="settings-icon"
              onClick={() => navigate("/settings")}
            />
          </div>

          <div className="mt-3 d-flex justify-content-center">
            <div
              className="position-relative"
              onClick={() => openViewImageBox(true)}
            >
              <img
                src={userData?.image || userImage}
                alt="avatar"
                className="rounded-circle avatar"
              />
              {user?.reference === userData?.reference && (
                <img
                  src={uploadImageIcon}
                  alt=""
                  className="position-absolute upload-img-icon"
                />
              )}
            </div>
          </div>

          <div className="text-primary fw-bold text-center mt-3 text-capitalize">
            {userData?.fullname}
          </div>
          <div className="text-primary fw-bold text-center text-secondary">
            @{userData?.username.toLowerCase()}
          </div>
          {userData?.user_type === "agent" && (
            <div className="text-primary fw-bold text-center mt-3">
              <Rate
                defaultValue={userData?.star_rating}
                className="text-primary me-2"
                tooltips={["Poor", "Fair", "Average", "Good", "Awesome"]}
                // allowClear={false}
                disabled
                allowHalf
              />
              {user?.reference !== userData?.reference && (
                <i
                  className="bi bi-plus-circle-fill"
                  onClick={() => openRatingBox(true)}
                ></i>
              )}
              <br />
              Avg. Rating
            </div>
          )}

          {userData?.user_type === "agent" && (
            <div className="d-flex justify-content-around mt-3">
              <div className="text-primary text-center">
                <div className="fw-bold">
                  {FormatNumber(userData?.num_likes)}
                </div>
                <div>Likes</div>
              </div>
              <div className="text-primary text-center">
                <div className="fw-bold">
                  {FormatNumber(userData?.num_products)}
                </div>
                <div>Listings</div>
              </div>
              <div className="text-primary text-center">
                <div className="fw-bold">{userData?.star_rating} / 5</div>
                <div>Star rating</div>
              </div>
            </div>
          )}

          <div className="mt-3 px-4 text-center bio">
            {userData?.bio || userData?.reference === user?.reference
              ? "You don't have a bio yet. Click the edit profile button to tell others a little about yourself"
              : `${userData?.username} has not added a bio yet`}
          </div>

          <div className="mt-3 d-flex justify-content-center">
            {user?.reference === userData?.reference && (
              <button
                className="btn btn-primary btn-lg me-2 fw-bold"
                onClick={() => openEditProfileBox(true)}
              >
                Edit Profile
              </button>
            )}
            <button
              className="btn btn-primary btn-lg fw-bold"
              onClick={() => openShareProfileBox(true)}
            >
              Share Profile
            </button>
          </div>

          <div className="mt-5">
            {userData?.user_type === "agent" && (
              <div>
                <span className="me-1">
                  {userData?.reference === user?.reference
                    ? `Your listings`
                    : `Other listings from ${userData?.username}`}
                </span>
                <a
                  href={`/get-user-products/${userData?.reference}`}
                  className="text-primary fw-bold"
                >
                  view more
                </a>
              </div>
            )}
            {userData?.user_type === "user" && (
              <div>
                <span className="me-1">
                  {userData?.reference === user?.reference
                    ? `Your liked listings`
                    : `${userData?.username} also liked`}
                </span>
                <a
                  href={`/get-liked-products/${userData?.reference}`}
                  className="text-primary fw-bold text-decoration-none"
                >
                  view more
                </a>
              </div>
            )}

            {loadingProfileProducts ? (
              <div className="text-center mt-5">
                <CustomSpin spinning={loadingProfileProducts} />
              </div>
            ) : (
              <div className="my-3 row">
                {profileProducts && profileProducts.length !== 0 ? (
                  profileProducts.slice(0, 4).map((product, index) => (
                    <div key={index} className="p-1 col-6 mb-1">
                      <div className="rounded-3 p-2 listing">
                        <div
                          className="w-100 position-relative video-div"
                          onClick={() =>
                            navigate(`/product/${product.reference}`)
                          }
                        >
                          <video
                            loop
                            autoPlay
                            muted
                            className="w-100 object-fit-fill rounded-3"
                          >
                            {" "}
                            {/*object-fit-fill*/}
                            <source src={product.videos[0]} type="video/mp4" />
                          </video>
                          <div className="position-absolute status-badge">
                            <span
                              className={`badge ${
                                product?.is_on_rent ? "bg-danger" : "bg-primary"
                              } me-2`}
                            >
                              {product?.is_on_rent ? "On Rent" : "For rent"}
                            </span>
                            <span
                              className={`badge ${
                                product?.is_on_shortlet
                                  ? "bg-danger"
                                  : "bg-primary"
                              } me-2`}
                            >
                              {product?.is_on_shortlet
                                ? "On Shortlet"
                                : "For Shortlet"}
                            </span>
                          </div>
                        </div>

                        <div className="text-primary mt-1 fw-bold">
                          5 Bedroom Semi-Detached Duplex
                        </div>

                        <div className="mt-1 address">{product?.location}</div>

                        <div className="mt-1 d-flex justify-content-between align-items-center">
                          <span className="badge badge-primary bg-primary status-badge">
                            More
                          </span>
                          <span style={{ fontSize: "7px" }}>
                            Posted: {TimeConverter(product?.created_on)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                    {userData?.user_type === `agent`
                      ? userData?.reference === user?.reference
                        ? `You have not added any listing`
                        : `${userData?.username} has not added any listing`
                      : userData?.reference === user?.reference
                      ? `You have not liked any listing`
                      : `${userData?.username} has not liked any listing`}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* image actions drawer */}
          <Drawer
            open={viewImageBoxOpen}
            //  title={<div className='text-primary fw-bold'>Share Profile</div>}
            // footer={} // react node
            placement="bottom"
            height={"auto"}
            closable={false}
            onClose={() => openViewImageBox(false)}
          >
            <div
              className="text-center text-primary fw-bold fs-3"
              onClick={() => showImageModal(true)}
            >
              View
            </div>
            {user?.reference === userData?.reference && (
              <>
                <hr />
                <div
                  className="text-center text-primary fw-bold fs-3"
                  onClick={() => openUploadImageModal(true)}
                >
                  Change
                </div>
              </>
            )}
          </Drawer>

          {/* give rating drawer */}
          {userData?.reference !== user?.reference && (
            <Drawer
              open={ratingBoxIsOpen}
              title={<div className="text-primary fw-bold">Rate Agent</div>}
              // footer={} // react node
              placement="bottom"
              height={"auto"}
              closable={true}
              onClose={() => openRatingBox(false)}
            >
              <div className="text-center text-primary fw-bold fs-3">
                <Rate
                  defaultValue={0}
                  className="text-primary"
                  tooltips={["Poor", "Fair", "Average", "Good", "Awesome"]}
                  // allowClear={false}
                  // allowHalf
                  onChange={(rating) => console.log(rating)}
                  disabled={true}
                />
              </div>
            </Drawer>
          )}

          {/* drawer to edit profile */}
          {userData?.reference === user?.reference && (
            <Drawer
              open={editProfileBoxOpen}
              title={<div className="text-primary fw-bold">Edit profile</div>}
              // footer={} // react node
              closable={true}
              height={"auto"}
              onClose={() => openEditProfileBox(false)}
            >
              <Form
                // form={editForm}
                onFinish={editProfile}
                ref={formRef}
              >
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[
                    {
                      min: 3,
                      message: "Username should be atleast 3 characters long",
                    },
                    { whitespace: true, message: "Username cannot be empty" },
                    {
                      async validator(rule, value) {
                        if (USERNAME_REGEX.test(value))
                          return Promise.resolve();
                        return Promise.reject(
                          new Error(
                            "Username must be alphanumeric with '_' as the only special character allowed"
                          )
                        );
                      },
                      validateTrigger: "onChange",
                    },
                  ]}
                >
                  <Input placeholder="Username" className="text-input" />
                </Form.Item>

                <Form.Item name="bio" label="Bio">
                  <Input.TextArea
                    rows={4}
                    placeholder="Write a little about yourself"
                    //   disabled={editingComment}
                    className="border border-primary px-2 mb-2"
                  />
                </Form.Item>

                <button
                  // disabled={editingComment}
                  type="submit"
                  className="btn btn-primary px-5 py-2"
                >
                  {editButtonLoading ? <CustomSpin color={"white"} /> : "Edit"}
                </button>
              </Form>
            </Drawer>
          )}

          {/* drawer to display share icons */}
          <Drawer
            open={shareProfileBoxOpen}
            title={<div className="text-primary fw-bold">Share Profile</div>}
            // footer={} // react node
            closable={true}
            placement="bottom"
            height={"auto"}
            onClose={() => openShareProfileBox(false)}
          >
            <FacebookShareButton
              className="me-2 mb-2"
              url={`${window.location.origin}/profile/${userData?.reference}`}
            >
              <FacebookIcon round={true} />
            </FacebookShareButton>

            <EmailShareButton
              className="me-2 mb-2"
              subject={userData?.username}
              body={userData?.bio}
              url={`${window.location.origin}/profile/${userData?.reference}`}
            >
              <EmailIcon round={true} />
            </EmailShareButton>

            <LinkedinShareButton
              className="me-2 mb-2"
              url={`${window.location.origin}/profile/${userData?.reference}`}
              title={userData?.username}
              summary={userData?.bio}
            >
              <LinkedinIcon round={true} />
            </LinkedinShareButton>

            <PinterestShareButton
              className="me-2 mb-2"
              url={`${window.location.origin}/profile/${userData?.reference}`}
              media={userData?.image}
              description={userData?.bio}
            >
              <PinterestIcon round={true} />
            </PinterestShareButton>

            <RedditShareButton
              className="me-2 mb-2"
              url={`${window.location.origin}/profile/${userData?.reference}`}
              title={userData?.username}
            >
              <RedditIcon round={true} />
            </RedditShareButton>

            <TelegramShareButton
              className="me-2 mb-2"
              url={`${window.location.origin}/profile/${userData?.reference}`}
              title={userData?.username}
            >
              <TelegramIcon round={true} />
            </TelegramShareButton>

            <TwitterShareButton
              className="me-2 mb-2"
              url={`${window.location.origin}/profile/${userData?.reference}`}
              title={userData?.username}
            >
              <XIcon round={true} />
            </TwitterShareButton>

            <WhatsappShareButton
              className="me-2 mb-2"
              url={`${window.location.origin}/profile/${userData?.reference}`}
              title={userData?.username}
            >
              <WhatsappIcon round={true} />
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
            <img
              src={userData?.image || userImage}
              alt="avatar"
              className="w-100"
            />
          </Modal>

          {/* change avatar modal */}
          <Modal
            title="Avatar"
            open={uploadImageModalOpen}
            onOk={() => openUploadImageModal(false)}
            onCancel={() => openUploadImageModal(false)}
            footer={[]}
          >
            <div className="text-center">
              <Upload
                listType="picture"
                accept=".png,.jpeg,.jpg"
                beforeUpload={(file) => {
                  return false;
                }}
                onChange={uploadImage}
                showUploadList={uploadingProfileImage}
              >
                <button
                  disabled={uploadingProfileImage}
                  className="btn btn-primary"
                >
                  {uploadingProfileImage ? (
                    <>
                      Uploading{" "}
                      <CustomSpin
                        color={"white"}
                        spinning={uploadingProfileImage}
                      />
                    </>
                  ) : (
                    "Choose Image"
                  )}
                </button>
              </Upload>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default UserProfileLayout;
