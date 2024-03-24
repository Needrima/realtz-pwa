import { Layout } from 'antd'
import React, { createContext, useState } from 'react'
import UserProfileLayout from '../../components/UserProfile/UserProfileLayout'

export const UserProfileContext = createContext();
const UserProfile = () => {
    const [state, setState] = useState({
        editProfileBoxOpen: false,
        shareProfileBoxOpen: false,
        viewImageBoxOpen: false,
        imageModalIsOpen: false,
    })
    const {editProfileBoxOpen, shareProfileBoxOpen, viewImageBoxOpen, imageModalIsOpen} = state;
    
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

    const openViewImageBox = (show) => {
        setState(state => ({
            ...state,
            viewImageBoxOpen: show
        }))
    }

    const showImageModal = (show) => {
        setState(state => ({
            ...state,
            imageModalIsOpen: show
        }))
    }

  return (
    <UserProfileContext.Provider value={{
        editProfileBoxOpen,
        openEditProfileBox,
        shareProfileBoxOpen,
        openShareProfileBox,
        viewImageBoxOpen,
        openViewImageBox,
        imageModalIsOpen,
        showImageModal
    }}>    
        <Layout>
            <UserProfileLayout/>
        </Layout>
    </UserProfileContext.Provider>

  )
}

export default UserProfile