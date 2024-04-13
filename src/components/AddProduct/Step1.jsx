import { Upload } from 'antd';
import React, { useContext } from 'react'
import { addProductContext } from '../../pages/AddProduct/AddProduct';

const Step1 = () => {
    const {beforeVideoUpload, onChangeVideosUpload, videoFiles, removeFile, changeStep} = useContext(addProductContext)
  return (
    <div className='text-center mt-6 w-100 d-flex flex-column align-items-center justify-content-center'>
        <div className='mb-3 w-100 d-flex justify-content-around flex-wrap'>
            {videoFiles.length !== 0 && videoFiles.map((file, index) => 
                <div key={index} className='col-6 p-1 position-relative' style={{height: 127}}>
                    <video loop autoPlay muted className='w-100 h-100 object-fit-fill rounded-2'>
                        <source src={URL.createObjectURL(file)} type="video/mp4" />
                    </video>
                    <i className="bi bi-trash-fill text-white fw-bold fs-2 position-absolute"
                     style={{bottom: 0, right: 10}}
                     onClick={() => removeFile(file)}
                     ></i>
                </div>
            )}
        </div>

        {videoFiles.length === 0 && <div className='mb-3 fw-bold text-primary'>Upload videos (maximum 3)</div>}
        <div className='d-flex justify-content-center'>
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
                <button className='btn btn-primary p-3 fw-bold me-2'>Add Videos</button>
            </Upload>
            <button className='btn btn-primary p-3 fw-bold' disabled={videoFiles.length === 0} onClick={() => changeStep('2')}>Next</button>
        </div>
    </div>
  )
}

export default Step1