import React, { createContext, useEffect, useState } from 'react'
import UserProfileLayout from '../../components/UserProfile/UserProfileLayout'
import { useParams } from 'react-router-dom';
import { axiosProductInstance, axiosUserInstance } from '../../api/axoios';
import { useSelector } from 'react-redux';
import Layout from "../../components/Layout";

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
        loadingProfileProducts: true,
        profileProducts: null,
    })
    const {userData, loading, editProfileBoxOpen, shareProfileBoxOpen, viewImageBoxOpen, imageModalIsOpen, uploadImageModalOpen, ratingBoxIsOpen,
        loadingProfileProducts, profileProducts} = state;
    
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
            if (data?.user?.user_type === 'agent') {
                console.log('getting agents listing')
                getUserProducts(data?.user?.reference)
            }else if (data?.user?.user_type === 'user') {
                console.log('getting like products')
                getLikedProducts(data?.user?.reference)
            }
        }catch(error) {
            console.log(error)
        }
    } 

    const getUserProducts = async (reference) => {
        try {
            const {data} = await axiosProductInstance.get(
                `auth/get-user-products/${reference}/${process.env.REACT_APP_DEFAULT_FETCH_COUNT}/1`, {
                    headers: {
                        token: token,
                    }
                })
            setState(state => ({
                ...state,
                loadingProfileProducts: false,
                profileProducts: data?.products,
            }))
        }catch(error) {
            console.log(error)
        }
    }

    const getLikedProducts = async (reference) => {
        try {
            const {data} = await axiosProductInstance.get(
                `auth/get-liked-products/${reference}/${process.env.REACT_APP_DEFAULT_FETCH_COUNT}/1`, {
                    headers: {
                        token: token,
                    }
                })
            setState(state => ({
                ...state,
                loadingProfileProducts: false,
                profileProducts: data?.products,
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
        loading,
        loadingProfileProducts, 
        profileProducts,
    }}>    
        <Layout>
            <UserProfileLayout/>
        </Layout>
    </UserProfileContext.Provider>

  )
}

export default UserProfile