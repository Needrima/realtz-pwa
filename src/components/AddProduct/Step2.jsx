import { Form, Input } from 'antd'
import React, { useContext, useState } from 'react'
import { addProductContext } from '../../pages/AddProduct/AddProduct'

const Step2 = () => {
    const {toggleProperty, toggleFacility, listingInfo: {properties, facilities}} = useContext(addProductContext);
    const [state, setState] = useState({
        addedProp: '',
        addedFacility: '',
    });

    const {addedProp, addedFacility} = state;

  return (
    <div className='mt-5'>
        <h1 className='fw-bold mb-3'>Listing <span className='text-primary'>information</span></h1>
        <Form>
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
                label={<span className='fw-bold text-primary'>Location</span>}
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
                name="Address"
                label={<span className='fw-bold text-primary'>Address</span>}
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
                    className="btn btn-primary me-2 text-capitalize"
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
                >Add</button>
            </Form.Item>

            <Form.Item
                label={<span className='fw-bold text-primary'>Facilities</span>}
            >
                <div className='d-flex flex-wrap mb-2'>
                    {facilities.length !== 0 && facilities.map((fac, index) => <button 
                    key={index} 
                    className="btn btn-primary me-2 text-capitalize"
                    onClick={() => toggleFacility(fac)}
                    >{fac.toLowerCase().trim()} X</button>)}
                </div>

                <input 
                placeholder="e.g Swimming pool, Dogs allowed" 
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
                >Add</button>
            </Form.Item>
        </Form>
    </div>
  )
}

export default Step2