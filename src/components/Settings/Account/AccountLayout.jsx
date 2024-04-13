import React from 'react'
import '../Settings.scss'
import proceedIcon from '../../../assets/icons/proceed-icon.svg'

const AccountLayout = () => {
  return (
    <div className='p-2'>
        <h1 className='fw-bold text-primary mt-3 text-center mb-5'>Account</h1>

        <div className='options rounded py-4 px-2'>
            <div className='d-flex justify-content-between align-items-center mb-4'>
                <span className='fs-4'>User Information</span>
                <img src={proceedIcon} alt="" />
            </div>

            <div className='d-flex justify-content-between align-items-center mb-4'>
                <span className='fs-4'>Password</span>
                <img src={proceedIcon} alt="" />
            </div>

            <div className='d-flex justify-content-between align-items-center mb-4'>
                <span className='fs-4'>Switch To Agent Account</span>
                <img src={proceedIcon} alt="" />
            </div>

            <div className='d-flex justify-content-between align-items-center mb-4'>
                <span className='fs-4'>Deactivate Account</span>
                <img src={proceedIcon} alt="" />
            </div>

            <div className='d-flex justify-content-between align-items-center'>
                <span className='fs-4'>Delete Account</span>
                <img src={proceedIcon} alt="" />
            </div>
        </div>
    </div>
  )
}

export default AccountLayout