import { Layout } from 'antd'
import React, { createContext } from 'react'
import UserProfileLayout from '../../components/UserProfile/UserProfileLayout'

const UserProfileContext = createContext();
const UserProfile = () => {
  return (
    <UserProfileContext.Provider value={{
        
    }}>    
        <Layout>
            <UserProfileLayout/>
        </Layout>
    </UserProfileContext.Provider>

  )
}

export default UserProfile