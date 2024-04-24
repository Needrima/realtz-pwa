import React, { createContext, useState } from 'react'
import Layout from '../../../components/Layout'
import AccountLayout from '../../../components/Settings/Account/AccountLayout'
import { axiosUserInstance } from '../../../api/axoios'
import { token } from '../../../api/token'
import { Form, message } from 'antd';
import { useDispatch } from 'react-redux'
import { logout } from '../../../redux/Actions'
import { useNavigate } from 'react-router-dom'
import autoLogout from '../../../components/Hoc/AutoLogout/AutoLogout'

export const accountContext = createContext();
const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    deleteAccountBoxOpen: false,
    deleteAccountConsent: false,
    deleteAccountConsentForm: Form.useForm(),
    deletingAccount: false,
    switchAccountBoxOpen: false,
    switchAccountConsent: false,
    switchAccountConsentForm: Form.useForm(),
    switchingAccount: false,
  })
  const {deleteAccountBoxOpen, deleteAccountConsent, deleteAccountConsentForm, deletingAccount, switchAccountBoxOpen, switchAccountConsent,
    switchAccountConsentForm, switchingAccount} = state;

  const openDeleteAccountBox = (show) => {
    setState(state => ({
      ...state,
      deleteAccountBoxOpen: show,
      deleteAccountConsent: false
    }))
    deleteAccountConsentForm[0].resetFields()
  }

  const onDeleteAccountConsent = (consent) => {
    setState(state => ({
      ...state,
      deleteAccountConsent: consent,
    }))
  }

  const deleteAccount = async () => {
    setState(state => ({
      ...state,
      deletingAccount: true,
    }))

    console.log('deleting account')

    try {
      const {data} = await axiosUserInstance.get('auth/delete-account', {
        headers: {
          token: token(),
        }
      })
      setState(state => ({
        ...state,
        deletingAccount: false,
      }))
      // add a message
      dispatch(logout())
      deleteAccountConsentForm[0].resetFields()
      navigate('/', {replace: true})
    }catch(error) {
      console.log(error)
      setState(state => ({
        ...state,
        deletingAccount: false,
      }))
      message.error(error?.response?.data?.error || 'could not delete account', parseInt(process.env.REACT_APP_POPUP_TIMEOUT))
    }
  }

  const openSwitchAccountBox = (show) => {
    setState(state => ({
      ...state,
      switchAccountBoxOpen: show,
      switchAccountConsent: false
    }))
    switchAccountConsentForm[0].resetFields()
  }

  const onSwitchAccountConsent = (consent) => {
    setState(state => ({
      ...state,
      switchAccountConsent: consent,
    }))
  }

  const switchAccount = async (values) => {
    setState(state => ({
      ...state,
      switchingAccount: true,
    }))

    console.log('switching account with values:', values)

    const reqData = {
      bvn: values.bvn
    }

    try {
      const {data} = await axiosUserInstance.post('auth/switch-to-agent-account', reqData, {
        headers: {
          token: token(),
        }
      })
      setState(state => ({
        ...state,
        switchingAccount: false,
        switchAccountConsent: false
      }))
      switchAccountConsentForm[0].resetFields()
      message.success(data?.message || 'successfully switched to agent account', parseInt(process.env.REACT_APP_POPUP_TIMEOUT))
    }catch(error) {
      setState(state => ({
        ...state,
        switchingAccount: false,
      }))
      message.error(error?.response?.data?.error || 'could not switch account', parseInt(process.env.REACT_APP_POPUP_TIMEOUT))
    }
  }

  return (
    <accountContext.Provider value={{
      deleteAccountBoxOpen,
      deleteAccountConsent,
      deleteAccountConsentForm,
      deletingAccount,
      switchAccountBoxOpen,
      switchAccountConsent,
      switchAccountConsentForm, 
      switchingAccount,
      openDeleteAccountBox,
      onDeleteAccountConsent,
      deleteAccount,
      openSwitchAccountBox,
      onSwitchAccountConsent,
      switchAccount,
    }}>
      <Layout>
          <AccountLayout />
      </Layout>
    </accountContext.Provider>
  )
}

export default autoLogout(Account)