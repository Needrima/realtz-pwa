import React, { createContext, useState } from 'react'
import Layout from '../../components/Layout'
import AddProductLayout from '../../components/AddProduct/AddProductLayout'
import Step1 from '../../components/AddProduct/Step1';
import { Form, message } from 'antd';
import Step2 from '../../components/AddProduct/Step2';
import Step3 from '../../components/AddProduct/Step3';

export const addProductContext = createContext();
const AddProduct = () => {
    const [state, setState] = useState({
        step: '1',
        videoFiles: [],
        listingInfo: {
            properties: [],
            facilities: [],
            hashTags:   [],
        },
        step2Form: Form.useForm(),
        step3Form: Form.useForm(),
    })
    const {step2Form, step3Form, step, videoFiles, listingInfo} = state;

    const changeStep = (step) => {
        setState(state => ({
            ...state,
            step: step
        }))
    }

    const renderStep = () => {
        switch (step) {
            case '1':
                return <Step1 />
            case '2':
                return <Step2 />
            case '3':
                return <Step3 />
            default:
                return <Step1 />
        }
    }

    const beforeVideoUpload = (file) => {
        return false;
    }

    const onChangeVideosUpload = ({file}) => {
        let largeFile = false;
        if (file.size > 100 << (10 * 2)) { // greater than 100mb
            message.warning(`could not add ${file.name}. file size is greater than 100mb`, parseInt(process.env.REACT_APP_POPUP_TIMEOUT))
            largeFile = true
        }

        if (!largeFile) {
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.src = URL.createObjectURL(file);
            video.onloadedmetadata = () => {
                if (video.duration > 30) {
                    message.warning(`could not add ${file.name}. file exceeds 30 seconds duration`, parseInt(process.env.REACT_APP_POPUP_TIMEOUT));
                }else {
                    setState(state => {
                        return {
                            ...state,
                            videoFiles: [...state.videoFiles, file]
                        }
                    })
                }
            };
        }
    }

    const removeFile = (file) => {
        setState(state => ({
            ...state,
            videoFiles: state.videoFiles.filter(eachFile => file.uid !== eachFile.uid)
        }))
    }

    const toggleProperty = (property) => {
        setState(state => ({
            ...state,
            listingInfo: {
                ...state.listingInfo,
                properties: state.listingInfo.properties.includes(property) 
                ?  state.listingInfo.properties.filter(prop => prop !== property) // remove if include
                :  [...state.listingInfo.properties, property] // add if not include
            }
        }))
    }

    const toggleFacility = (facility) => {
        setState(state => ({
            ...state,
            listingInfo: {
                ...state.listingInfo,
                facilities: state.listingInfo.facilities.includes(facility) 
                ?  state.listingInfo.facilities.filter(fac => fac !== facility) // remove if include
                :  [...state.listingInfo.facilities, facility] // add if not include
            }
        }))
    }

    const toggleHashTags = (hashTag) => {
        setState(state => ({
            ...state,
            listingInfo: {
                ...state.listingInfo,
                hashTags: state.listingInfo.hashTags.includes(hashTag) 
                ?  state.listingInfo.hashTags.filter(ht => ht !== hashTag) // remove if include
                :  [...state.listingInfo.hashTags, hashTag] // add if not include
            }
        }))
    }

    const addListingInfo = (values) => {
        console.log('values:', values)
        setState(state => ({
            ...state,
            listingInfo: {...state.listingInfo, ...values},
        }))
    }

    const createProduct = async () => {
        console.log(state);
    } 

  return (
    <addProductContext.Provider value={{
        step,
        videoFiles,
        listingInfo,
        step2Form,
        step3Form,
        changeStep,
        beforeVideoUpload,
        onChangeVideosUpload,
        removeFile,
        toggleProperty,
        toggleFacility,
        toggleHashTags,
        addListingInfo,
        createProduct
    }}>
        <Layout>
            <AddProductLayout>
                {renderStep()}
            </AddProductLayout>
        </Layout>
    </addProductContext.Provider>
  )
}

export default AddProduct