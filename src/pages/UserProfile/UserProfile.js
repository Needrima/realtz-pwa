import { Layout } from 'antd'
import React, { createContext, useState } from 'react'
import UserProfileLayout from '../../components/UserProfile/UserProfileLayout'

export const UserProfileContext = createContext();
const UserProfile = () => {
    const [state, setState] = useState({
        editProfileBoxOpen: false,
        shareProfileBoxOpen: false,
    })
    const {editProfileBoxOpen, shareProfileBoxOpen} = state;
    
    const openEditProfileBox = (show) => {
        setState(state => ({
            ...state,
            editProfileBoxOpen: show
        }))
    }

    const openShareProfileBox = (show) => {
        setState(state => ({
            ...state,
            shareProfileBoxOpen: show
        }))
    }

  return (
    <UserProfileContext.Provider value={{
        editProfileBoxOpen,
        openEditProfileBox,
        shareProfileBoxOpen,
        openShareProfileBox
    }}>    
        <Layout>
            <UserProfileLayout/>
        </Layout>
    </UserProfileContext.Provider>

  )
}

export default UserProfile