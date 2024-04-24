import React, { createContext, useState } from 'react'
import Layout from '../../../../components/Layout';
import ChangePasswordLayout from '../../../../components/Settings/Account/ChangePassword/ChangePasswordLayout';
import { message } from 'antd';
import { axiosUserInstance } from '../../../../api/axoios';
import { token } from '../../../../api/token';

export const changePasswordContext = createContext()
const ChangePassword = () => {
    const [state, setState] = useState({
        loading: false,
    })
    const {loading} = state;

    const onFinish = async (values) => {
      setState(state => ({
        ...state,
        loading: true,
      }))

      const reqData = {
        current_password: values.curent_password,
        new_password: values.new_password,
        confirm_password: values.confirm_password,
      }

      try {
        const {data} = await axiosUserInstance.post('auth/change-password', reqData, {
          headers: {
            token: token(),
          }
        })
        setState(state => ({
          ...state,
          loading: false,
        }))
        message.success(data?.message || "password change successful", parseInt(process.env.REACT_APP_POPUP_TIMEOUT))
      }catch(error) {
        setState(state => ({
          ...state,
          loading: false,
        }))
        message.error(error?.response?.data?.error || "could not change password", parseInt(process.env.REACT_APP_POPUP_TIMEOUT))
      }
    }

  return (
    <changePasswordContext.Provider value={{
      loading,
      onFinish
    }}>
      <Layout>
          <ChangePasswordLayout />
      </Layout>
    </changePasswordContext.Provider>
  )
}

export default ChangePassword