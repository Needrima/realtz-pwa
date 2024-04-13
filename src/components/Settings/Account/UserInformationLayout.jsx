import React from 'react'
import wariningIcon from '../../../assets/icons/warning-icon.svg'
import { useSelector } from 'react-redux'

const UserInformationLayout = () => {
    const {user} = useSelector(state => state.authReducer)
    console.log(user)
  return (
    <div className='p-2'>
        <h1 className='fw-bold text-primary mt-3 text-center mb-5'>User Information</h1>

        <div className='options rounded py-4 px-2'>
            <div className='mb-4'>
                <div className='fw-bold  fs-1 fs-1'>Firstname</div>
                <div className='fs-5 text-primary'>{user?.firstname || ''}</div>
            </div>

            <div className='mb-4'>
                <div className='fw-bold  fs-1'>Lastname</div>
                <div className='fs-5 text-primary'>{user?.lastname || ''}</div>
            </div>

            <div className='mb-4'>
                <div className='fw-bold  fs-1'>Username</div>
                <div className='fs-5 text-primary'>{user?.username || ''}</div>
            </div>

            <div className='mb-4'>
                <div className='fw-bold  fs-1'>Email {!user?.is_email_verified && <img src={wariningIcon} alt="" />}</div>
                <div className='fs-5 text-primary'>{user?.email || ''} {!user?.is_email_verified && <span className='text-primary text-decoration-underline'>(verify)</span>}</div>
            </div>

            <div className='mb'>
                <div className='fw-bold  fs-1'>Phone Number {!user?.is_phone_number_verified && <img src={wariningIcon} alt="" />}</div>
                <div className='fs-5 text-primary'>{user?.phone_number || ''} {!user?.is_phone_number_verified && <span className='text-primary text-decoration-underline'>(verify)</span>}</div>
            </div>
        </div>
    </div>
  )
}

export default UserInformationLayout