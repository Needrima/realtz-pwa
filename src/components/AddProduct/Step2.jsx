import { Checkbox, Form, Input } from 'antd'
import React, { useContext, useRef, useState } from 'react'
import { addProductContext } from '../../pages/AddProduct/AddProduct'

const Step2 = () => {
    const {step2Form, toggleProperty, toggleFacility, toggleHashTags, listingInfo: {properties, facilities, hashTags}, changeStep, addListingInfo} = useContext(addProductContext);
    const [state, setState] = useState({
        addedProp: '',
        addedFacility: '',
        addedHashTag: '',
        rentChecked: false,
        shortletChecked: false,
    });
    const {addedProp, addedFacility, addedHashTag, rentChecked, shortletChecked} = state;

  return (
    <div className='my-5'>
        <h1 className='fw-bold mb-3'>Listing <span className='text-primary'>information</span></h1>
        <Form 
            onFinish={(values) => {
                addListingInfo(values)
                changeStep('3')
            }}
            form={step2Form[0]}
        >
            <Form.Item
                name="title"
                label={<span className='fw-bold text-primary'>Title</span>}
                rules={[
                    { required: true, message: "Title is required" },
                    {
                        min: 3,
                        message: "Title should be atleast 3 characters long",
                    },
                    { whitespace: true, message: "Title cannot be empty" },
                ]}
                hasFeedback
            >
                <Input
                placeholder="e.g 5 rooms luxury duplex"
                className="text-input"
                />
            </Form.Item>

            <Form.Item
                name="location"
                label={<span className='fw-bold text-primary'>Location (city/town, state)</span>}
                rules={[
                    { required: true, message: "Location is required" },
                    {
                        min: 3,
                        message: "Location should be atleast 3 characters long",
                    },
                    { whitespace: true, message: "Location cannot be empty" },
                ]}
                hasFeedback
            >
                <Input
                placeholder="e.g Victoria Island, Lagos"
                className="text-input"
                />
            </Form.Item>

            <Form.Item
                name="address"
                label={<span className='fw-bold text-primary'>Address (house number, street)</span>}
                rules={[
                    { required: true, message: "Address is required" },
                    {
                        min: 3,
                        message: "Address should be atleast 3 characters long",
                    },
                    { whitespace: true, message: "Address cannot be empty" },
                ]}
                hasFeedback
            >
                <Input
                placeholder="e.g 21, John Doe avenue"
                className="text-input"
                />
            </Form.Item>

            <Form.Item
                name="description"
                label={<span className='fw-bold text-primary'>Description</span>}
                rules={[
                    {required: true, message: 'Reply cannot be empty'},
                    {
                        min: 3,
                        message: "Address should be atleast 3 characters long",
                    },
                    {
                        max: 500,
                        message: "Address should be atmost 500 characters long",
                    },
                ]}
            >
            <Input.TextArea
                rows={4}
                placeholder='Give a brief description of the listing'
                className='px-2'
            />
            </Form.Item>
            
            <Form.Item
                label={<span className='fw-bold text-primary'>Properties</span>}
            >
                <div className='d-flex flex-wrap mb-2'>
                    {properties.length !== 0 && properties.map((prop, index) => <button 
                    key={index} 
                    className="btn btn-primary me-2 mb-2 text-capitalize"
                    onClick={() => toggleProperty(prop)}
                    >{prop.toLowerCase().trim()} X</button>)}
                </div>

                <input 
                placeholder="e.g 5 Bathrooms" 
                className="text-input mb-2" 
                onChange={e => setState(state => ({...state, addedProp: e.target.value}))}
                value={addedProp}
                />

                <button 
                disabled={addedProp === ''}
                className='btn btn-primary' 
                onClick={() => {
                    toggleProperty(addedProp)
                    setState(state => ({...state, addedProp: ''}))
                }}
                type='button'
                >Add</button>
            </Form.Item>

            <Form.Item
                label={<span className='fw-bold text-primary'>Facilities</span>}
            >
                <div className='d-flex flex-wrap mb-2'>
                    {facilities.length !== 0 && facilities.map((fac, index) => <button 
                    key={index} 
                    className="btn btn-primary me-2 mb-2 text-capitalize"
                    onClick={() => toggleFacility(fac)}
                    >{fac.toLowerCase().trim()} X</button>)}
                </div>

                <input 
                placeholder="e.g Swimming pool" 
                className="text-input mb-2" 
                onChange={e => setState(state => ({...state, addedFacility: e.target.value}))}
                value={addedFacility}
                />

                <button 
                disabled={addedFacility === ''}
                className='btn btn-primary' 
                onClick={() => {
                    toggleFacility(addedFacility)
                    setState(state => ({...state, addedFacility: ''}))
                }}
                type='button'
                >Add</button>
            </Form.Item>

            <Form.Item
                label={<span className='fw-bold text-primary'>Hahstags</span>}
            >
                <div className='d-flex flex-wrap mb-2'>
                    {hashTags.length !== 0 && hashTags.map((ht, index) => <button 
                    key={index} 
                    className="btn btn-primary me-2"
                    onClick={() => toggleHashTags(ht)}
                    >{ht.toLowerCase().trim().startsWith('#') ? ht.toLowerCase().trim() : '#'+ht.toLowerCase().trim()} X</button>)}
                </div>

                <input 
                placeholder="e.g #pets_allowed" 
                className="text-input mb-2" 
                onChange={e => setState(state => ({...state, addedHashTag: e.target.value}))}
                value={addedHashTag}
                />

                <button 
                disabled={addedHashTag === ''}
                className='btn btn-primary' 
                onClick={() => {
                    toggleHashTags(addedHashTag)
                    setState(state => ({...state, addedHashTag: ''}))
                }}
                type='button'
                >Add</button>
            </Form.Item>

            <div className='text-center d-flex justify-content-center'>
                <Form.Item
                name="for_rent"
                valuePropName="checked"
                rules={[
                    // {required: true, message: "You have not accepted our terms and condtions"},
                ]}
                >
                    <Checkbox 
                    className='text-primary fw-bold me-2' 
                    defaultChecked={false}
                    onChange={(e) => setState(state => ({...state, rentChecked: e.target.checked}))}
                    >
                        For rent
                    </Checkbox>
                </Form.Item>

                <Form.Item
                name="for_shortlet"
                valuePropName="checked"
                rules={[
                    // {required: true, message: "You have not accepted our terms and condtions"},
                ]}
                >
                <Checkbox 
                className='text-primary fw-bold' 
                defaultChecked={false}
                onChange={(e) => setState(state => ({...state, shortletChecked: e.target.checked}))}
                >
                    For shortlet
                </Checkbox>
                </Form.Item>
            </div>

            <div className="text-center">
              <button
                className="btn btn-primary btn-lg px-5 py-3 fw-bold me-2"
                onClick={() => changeStep('1')}
                type='button'
              >
                &larr;
              </button>

              <button
                className="btn btn-primary btn-lg px-5 py-3 fw-bold"
                type='submit'
                disabled={!rentChecked && !shortletChecked}
              >
                Next
              </button>
            </div>
        </Form>
    </div>
  )
}

export default Step2