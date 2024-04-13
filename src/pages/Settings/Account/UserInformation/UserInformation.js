import React, { createContext, useState } from 'react'
import Layout from '../../../../components/Layout'
import UserInformationLayout from '../../../../components/Settings/Account/UserInformation/UserInformationLayout'
import { useTimer } from 'react-timer-hook'
import { axiosUserInstance } from '../../../../api/axoios'
import { token } from '../../../../api/token'
import { message } from 'antd'

export const userInformationContext = createContext()
const UserInformation = () => {
    const [state, setState] = useState({
        sendingOTP: false,
        verifyEmailOTP: '',
        verifyEmailOTPVerificationCode: '',
        verifyingEmail: false,
        verifyPhoneNumberOTP: '',
        verifyPhoneNumberOTPVerificationCode: '',
        verifyingPhoneNumber: false,
        verifyEmailBoxOpen: false,
    })

    const {sendingOTP, verifyEmailOTP, verifyingEmail, verifyPhoneNumberOTP, verifyingPhoneNumber, verifyEmailBoxOpen} = state

    // external libraries hooks
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 180); // three minutes timer
    const expiryCountDown = useTimer({ expiryTimestamp, onExpire: () => console.log("timeout") });

    const onEmailOTPInput = async (otp) => {
      setState(state => ({
        ...state,
        verifyEmailOTP: otp,
      }))

      if (otp.length === 6) {
        console.log('verifying otp')
      }
    }

    const onPhoneNumberOTPInput = async (otp) => {
      setState(state => ({
        ...state,
        verifyPhoneNumberOTP: otp,
      }))

      if (otp.length === 6) {
        console.log('verifying otp')
      }
    }

    const openVerifyEmailBox = (show) => {
      setState(state => ({
        ...state,
        verifyEmailBoxOpen: show,
      }))
    }

    const sendOTP = async (channel) => {
      setState(state => ({
        ...state,
        sendingOTP: true,
      }))

      const reqData = {
        channel: channel,
      }

      try {
        const {data} = await axiosUserInstance.post("auth/send-otp", reqData, {
          headers: {
            token: token(),
          }
        })
        setState(state => ({
          ...state,
          verifyEmailOTPVerificationCode: data?.otp_verification_key,
          sendingOTP: false,
          verifyEmailBoxOpen: true,
        }))
        if (!expiryCountDown.isRunning) expiryCountDown.restart(expiryTimestamp);
      }catch(error) {
        setState(state => ({
          ...state,
          sendingOTP: false,
        }))
        message.error(error?.response?.data?.error || 'could not verify email, try later')
        console.log(error)
      }
    }

  return (
    <userInformationContext.Provider value={{
      sendingOTP,
      verifyEmailOTP,
      verifyingEmail,
      verifyPhoneNumberOTP,
      verifyingPhoneNumber,
      onEmailOTPInput,
      onPhoneNumberOTPInput,
      openVerifyEmailBox,
      verifyEmailBoxOpen,
      expiryCountDown,
      sendOTP,
    }}>
      <Layout>
          <UserInformationLayout />
      </Layout>
    </userInformationContext.Provider>
  )
}

export default UserInformation