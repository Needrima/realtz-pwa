import React, { createContext, useState } from 'react'
import Layout from '../../components/Layout'
import AddProductLayout from '../../components/AddProduct/AddProductLayout'
import Step1 from '../../components/AddProduct/Step1';
import { message } from 'antd';
import Step2 from '../../components/AddProduct/Step2';

export const addProductContext = createContext();
const AddProduct = () => {
    const [state, setState] = useState({
        step: '2',
        videoFiles: [],
        listingInfo: {},
    })
    const {step, videoFiles} = state;

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
                        console.log('settig state for video:', file.name)
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
        console.log(file)
        setState(state => ({
            ...state,
            videoFiles: state.videoFiles.filter(eachFile => file.uid !== eachFile.uid)
        }))
    }

  return (
    <addProductContext.Provider value={{
        step,
        videoFiles,
        changeStep,
        beforeVideoUpload,
        onChangeVideosUpload,
        removeFile
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