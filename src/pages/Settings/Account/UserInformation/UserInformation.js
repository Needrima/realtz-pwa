import React, { createContext, useEffect, useState } from 'react'
import Layout from '../../../../components/Layout'
import UserInformationLayout from '../../../../components/Settings/Account/UserInformation/UserInformationLayout'
import { useTimer } from 'react-timer-hook'
import { axiosUserInstance } from '../../../../api/axoios'
import { token } from '../../../../api/token'
import { message } from 'antd'
import { useSelector } from 'react-redux'

export const userInformationContext = createContext()
const UserInformation = () => {
    const {user} = useSelector(state => state.authReducer)
    const [state, setState] = useState({
        loading: true,
        userData: null,
        sendingOTP: false,
        verifyEmailOTP: '',
        verifyEmailOTPVerificationKey: '',
        verifyingEmail: false,
        verifyPhoneNumberOTP: '',
        verifyPhoneNumberOTPVerificationKey: '',
        verifyingPhoneNumber: false,
        verifyEmailBoxOpen: false,
    })

    const {loading, userData, sendingOTP, verifyEmailOTP, verifyingEmail, verifyPhoneNumberOTP, verifyingPhoneNumber, verifyEmailBoxOpen} = state

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
        console.log('verifying email')
        setState(state => ({
          ...state,
          verifyingEmail: true,
        }))

        const {verifyEmailOTPVerificationKey} = state;
        const reqData = {
          otp: otp,
          otp_verification_key: verifyEmailOTPVerificationKey,
        }
        try {
          const {data} = await axiosUserInstance.post("auth/verify-email", reqData, {
            headers: {
              token: token(),
            }
          })
          setState(state => ({
            ...state,
            verifyingEmail: false,
            userData: data?.updated_user,
            verifyEmailBoxOpen: false,
          }))
          expiryCountDown.pause()
          message.success(data?.message, parseInt(process.env.REACT_APP_POPUP_TIMEOUT))
        }catch(error) {
          setState(state => ({
            ...state,
            verifyingEmail: false,
          }))
          message.error(error?.respose?.data?.error ,parseInt(process.env.REACT_APP_POPUP_TIMEOUT))
        }
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

    const sendOTP = async (channel) => { // channel is either "email" for email otp or "sms" for phone otp
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
        console.log(data)
        setState(state => ({
          ...state,
          verifyEmailOTPVerificationKey: data?.otp_verification_key,
          sendingOTP: false,
          verifyEmailBoxOpen: true,
        }))
        if (!expiryCountDown.isRunning) expiryCountDown.restart(expiryTimestamp);
      }catch(error) {
        setState(state => ({
          ...state,
          sendingOTP: false,
        }))
        message.error(error?.response?.data?.error || 'could not verify email, try later', parseInt(process.env.REACT_APP_POPUP_TIMEOUT))
        console.log(error)
      }
    }

    const getUser = async () => {
      try {
        const { data } = await axiosUserInstance.get(
          `auth/get-user/${user?.reference}`,
          {
            headers: {
              token: token(),
            },
          }
        );
        setState((state) => ({
          ...state,
          loading: false,
          userData: data.user,
        }));
      } catch (error) {
        
      }
    };

    useEffect(() => {
      getUser();
    }, [user])

  return (
    <userInformationContext.Provider value={{
      loading,
      userData,
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