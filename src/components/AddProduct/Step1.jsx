import { Upload } from 'antd';
import React, { useContext } from 'react'
import { addProductContext } from '../../pages/AddProduct/AddProduct';
import video from '../../assets/videos/video.mp4'

const Step1 = () => {
    const {beforeVideoUpload, onChangeVideosUpload, videoFiles, removeFile} = useContext(addProductContext)
  return (
    <div className='text-center'>
        <div className='mb-3'>
            <Upload
                multiple
                listType="picture"
                accept=".mp4,.mkv,.mov"
                beforeUpload={beforeVideoUpload}
                onChange={onChangeVideosUpload}
                showUploadList={false}
                fileList={videoFiles}
                maxCount={3}
            >
                <button className='btn btn-primary btn-lg px-5 fw-bold'>Add Videos</button>
            </Upload>
        </div>
        <div className='d-flex justify-content-between flex-wrap'>
            {videoFiles.length !== 0 && videoFiles.map((file, index) => 
                <div key={index} className='col-6 p-1 position-relative' style={{height: 127}}>
                    <video loop autoPlay muted className='w-100 h-100 object-fit-fill rounded-2'>
                        <source src={URL.createObjectURL(file)} type="video/mp4" />
                    </video>
                    <i className="bi bi-trash text-primary fw-bold fs-2 position-absolute"
                     style={{bottom: 0, right: 10}}
                     onClick={() => removeFile(file)}
                     ></i>
                </div>
            )}
            {/* <div className='col-6 p-1' style={{height: 127}}>
                <video loop autoPlay muted className='w-100 h-100 object-fit-fill rounded-2'>
                    <source src={video} type="video/mp4" />
                </video>
            </div>
            <div className='col-6 p-1' style={{height: 127}}>
                <video loop autoPlay muted className='w-100 h-100 object-fit-fill rounded-2'>
                    <source src={video} type="video/mp4" />
                </video>
            </div>
            <div className='col-6 p-1' style={{height: 127}}>
                <video loop autoPlay muted className='w-100 h-100 object-fit-fill rounded-2'>
                    <source src={video} type="video/mp4" />
                </video>
            </div> */}
        </div>
    </div>
  )
}

export default Step1