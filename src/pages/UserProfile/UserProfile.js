import { Layout } from 'antd'
import React, { createContext, useEffect, useState } from 'react'
import UserProfileLayout from '../../components/UserProfile/UserProfileLayout'
import { useParams } from 'react-router-dom';
import { axiosUserInstance } from '../../api/axoios';
import { useSelector } from 'react-redux';

export const UserProfileContext = createContext();
const UserProfile = () => {
    const {token} = useSelector(state => state?.authReducer)
    const {reference} = useParams()
    
    const [state, setState] = useState({
        userData: null,
        loading: true,
        editProfileBoxOpen: false,
        shareProfileBoxOpen: false,
        viewImageBoxOpen: false,
        imageModalIsOpen: false,
        uploadImageModalOpen: false,
        ratingBoxIsOpen: false,
    })
    const {userData, loading, editProfileBoxOpen, shareProfileBoxOpen, viewImageBoxOpen, imageModalIsOpen, uploadImageModalOpen, ratingBoxIsOpen} = state;
    
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

    const openUploadImageModal = (show) => {
        setState(state => ({
            ...state,
            uploadImageModalOpen: show
        }))
    }

    const openRatingBox = (show) => {
        setState(state => ({
            ...state,
            ratingBoxIsOpen: show
        }))
    }

    const getUser = async () => {
        try {
            const {data} = await axiosUserInstance.get(`auth/get-user/${reference}`, {
                headers: {
                    token: token,
                }
            })
            setState(state => ({
                ...state,
                loading: false,
                userData: data.user
            }))
        }catch(error) {
            console.log(error)
        }
    } 

    useEffect(() => {
        getUser();
    }, [token])

  return (
    <UserProfileContext.Provider value={{
        editProfileBoxOpen,
        openEditProfileBox,
        shareProfileBoxOpen,
        openShareProfileBox,
        viewImageBoxOpen,
        openViewImageBox,
        imageModalIsOpen,
        showImageModal,
        uploadImageModalOpen,
        openUploadImageModal,
        ratingBoxIsOpen,
        openRatingBox,
        userData,
        loading
    }}>    
        <Layout>
            <UserProfileLayout/>
        </Layout>
    </UserProfileContext.Provider>

  )
}

export default UserProfile