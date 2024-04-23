import React, { createContext, useState } from 'react'
import Layout from '../../../../components/Layout';
import ChangePasswordLayout from '../../../../components/Settings/Account/ChangePassword/ChangePasswordLayout';

export const changePasswordContext = createContext()
const ChangePassword = () => {
    const [state, setState] = useState({
        loading: false,
    })
    const {loading} = state;
    const onFinish = (values) => {
      console.log(values);
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