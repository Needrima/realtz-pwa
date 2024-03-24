import React from 'react'
import settingsIcon from '../../assets/icons/settings-icon.svg'
import userImage from '../../assets/images/casual.jpg'
import uploadImageIcon from '../../assets/icons/upload-image-icon.svg'
import FormatNumber from '../../misc/NumberFormatter'
import video from '../../assets/videos/video.mp4'
import './UserProfile.scss'
import { useNavigate } from 'react-router-dom'

const UserProfileLayout = () => {
    const navigate = useNavigate();
  return (
    <div className='px-3 bg-white'>
        <div className='mt-5 d-flex justify-content-end'>
            <img src={settingsIcon} alt="settings-icon" onClick={() => navigate('/settings')} />
        </div>

        <div className='mt-3 d-flex justify-content-center'>
            <div className=' position-relative'>
                <img src={userImage} alt="avatar" className='rounded-circle avatar' />
                <img src={uploadImageIcon} alt="" className='position-absolute upload-img-icon' />
            </div>
        </div>

        <div className='text-primary fw-bold text-center mt-3'>Oyebode Amirdeen</div>
        <div className='text-primary fw-bold text-center text-secondary'>@needrima</div>

        <div className='d-flex justify-content-around mt-3'>
            <div className='text-primary text-center'>
                <div className='fw-bold'>{FormatNumber(2500)}</div>
                <div>Likes</div>
            </div>
            <div  className='text-primary text-center'>
                <div className='fw-bold'>{FormatNumber(25)}</div>
                <div>Listings</div>
            </div>
            <div className='text-primary text-center'>
                <div className='fw-bold'>4 / 5</div>
                <div>Star rating</div>
            </div>
        </div>

        <div className='mt-3 px-4 text-center bio'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro, tempore? Corrupti ullam vitae rem sapiente nihil aspernatur sequi tempora temporibus et in accusantium, veritatis facilis magni quis veniam assumenda quod deserunt fugiat illo! Corrupti, pariatur vero animi optio, nemo praesentium inventore magni, cupiditate sit voluptate incidunt qui. Ad reprehenderit eveniet laboriosam provident quisquam consequatur, quo earum! Id dolores quo, rem veniam saepe molestiae culpa numquam! Minus deserunt iusto incidunt! Modi labore tenetur placeat, sed sit harum. Laboriosam praesentium totam consequuntur ut nisi nam dolore quibusdam voluptas culpa dolor earum aliquid non maxime fugiat repudiandae, soluta omnis eaque tenetur esse distinctio?</div>

        <div className='mt-3 d-flex justify-content-center'>
            <button className='btn btn-primary btn-lg me-2 fw-bold'>Edit Profile</button>
            <button className='btn btn-primary btn-lg fw-bold'>Share Profile</button>
        </div>

        <div className='mt-5'>
            <div className='fw-bold fs-4'>Recent listings</div>

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
    </div>
  )
}

export default UserProfileLayout