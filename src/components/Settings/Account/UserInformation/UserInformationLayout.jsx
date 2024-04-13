import React, { useContext } from 'react'
import wariningIcon from '../../../../assets/icons/warning-icon.svg'
import { Drawer } from 'antd'
import './UserInformation.scss'
import { userInformationContext } from '../../../../pages/Settings/Account/UserInformation/UserInformation'
import OtpInput from 'react-otp-input';
import timerIcon from '../../../../assets/icons/timer.svg'
import CustomSpin from '../../../UI/CustomSpin/CustomSpin'

const UserInformationLayout = () => {
    const {loading, userData, sendingOTP, verifyEmailOTP, onEmailOTPInput, verifyingEmail, verifyEmailBoxOpen, openVerifyEmailBox, expiryCountDown,
        sendOTP,} = useContext(userInformationContext);

  return (
    <div className='p-2'>
        <h1 className='fw-bold text-primary mt-3 text-center mb-5'>User Information</h1>

        {loading ?
        <div className='text-center mt-10'>
            <CustomSpin spinning={loading} />
        </div> 
        :
        <div className='options rounded py-4 px-2'>
            <div className='mb-4'>
                <div className='fw-bold  fs-1 fs-1'>Firstname</div>
                <div className='fs-5 text-primary'>{userData?.firstname || ''}</div>
            </div>

            <div className='mb-4'>
                <div className='fw-bold  fs-1'>Lastname</div>
                <div className='fs-5 text-primary'>{userData?.lastname || ''}</div>
            </div>

            <div className='mb-4'>
                <div className='fw-bold  fs-1'>Username</div>
                <div className='fs-5 text-primary'>{userData?.username || ''}</div>
            </div>

            <div className='mb-4'>
                <div className='fw-bold  fs-1'>Email {!userData?.is_email_verified && <img src={wariningIcon} alt="" />}</div>
                <div className='fs-5 text-primary'>{userData?.email || ''} {!userData?.is_email_verified && <span className='text-primary text-decoration-underline' onClick={() => sendOTP('email')}>( {sendingOTP ? <CustomSpin spinning={sendingOTP} /> : 'verify'} )</span>}</div>
            </div>

            <div className='mb'>
                <div className='fw-bold  fs-1'>Phone Number {!userData?.is_phone_number_verified && <img src={wariningIcon} alt="" />}</div>
                <div className='fs-5 text-primary'>{userData?.phone_number || ''} {!userData?.is_phone_number_verified && <span className='text-primary text-decoration-underline'>( verify )</span>}</div>
            </div>
        </div>
        }

        {/* verify email drawer */}
        <Drawer
            open={verifyEmailBoxOpen}
            title={<div className='text-primary fw-bold'>Verify Email</div>}
            // footer={} // react node 
            closable={!verifyingEmail}
            maskClosable={!verifyingEmail}
            placement='bottom'
            height={'auto'}
            onClose={() => openVerifyEmailBox(false)}
        >
            <div className='mb-3'>Enter 6 digits otp sent to <span className='text-primary fw-bold'>{userData?.email}</span></div>
            <OtpInput
                value={verifyEmailOTP}
                onChange={onEmailOTPInput}
                numInputs={6}
                // renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} disabled={verifyingEmail || sendingOTP} />}
                inputStyle={"otp-input rounded border-0 mb-2"}
            />

            <div className="text-center mt-5">
                <span className="otp-countdown p-3 rounded-4">
                    <img src={timerIcon} alt="timer icon" /> {expiryCountDown.minutes}:{expiryCountDown.seconds}
                </span>
            </div>

            <div className="text-center mt-3">
                Didn't receive OTP?{" "}
                <span
                className={`text-primary fw-bold ${
                    expiryCountDown.isRunning || verifyingEmail || sendingOTP ? "opacity-50 pe-none" : ""
                }`}
                onClick={() => sendOTP('email')}
                >
                Resend OTP
                </span>
            </div>
        </Drawer>
    </div>
  )
}

export default UserInformationLayout