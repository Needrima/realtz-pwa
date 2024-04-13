import React, { useContext } from 'react'
import { addProductContext } from '../../pages/AddProduct/AddProduct'
import { FLOAT_ONLY_REGEX } from '../../misc/regex';
import { Drawer, Form, Input } from 'antd';
import CustomSpin from '../UI/CustomSpin/CustomSpin';

const Step3 = () => {
    const {step3Form, changeStep, addPricing, listingInfo:{for_rent, for_shortlet}, createProduct, createProductBoxOpen,
    openCreateProductBox, creatingProduct} = useContext(addProductContext);
  return (
    <div className='my-5'>
        <h1 className='fw-bold mb-3'>Pricing <span className='text-primary'>information</span></h1>
        <Form 
            onFinish={(values) => {
                Object.entries(values).forEach(([key, value]) => {
                    if (isNaN(parseFloat(value))) {
                        values[key] = value;
                    }else {
                        values[key] = parseFloat(value)
                    }
                });
                addPricing(values)
                openCreateProductBox(true)
            }}
            form={step3Form[0]}
        >
            {for_rent && <>
            <Form.Item
                name="annual_rent"
                label={<span className='fw-bold text-primary'>Rent (annually)</span>}
                rules={[
                    { required: true, message: "annual rent is required" },
                    { whitespace: true, message: "annual rent cannot be empty" },
                    {
                    async validator(rule, value) {
                        if (FLOAT_ONLY_REGEX.test(value)) return Promise.resolve();
                        return Promise.reject(
                        new Error(
                            "annual rent should be numbers only e.g 500000"
                        )
                        );
                    },
                    validateTrigger: "onChange",
                    },
                ]}
                hasFeedback
            >
                <Input
                placeholder="e.g 500000"
                className="text-input"
                />
            </Form.Item>

            <Form.Item
                name="agreement"
                label={<span className='fw-bold text-primary'>Agreement</span>}
                rules={[
                    { required: true, message: "agreement is required" },
                    { whitespace: true, message: "agreement cannot be empty" },
                    {
                    async validator(rule, value) {
                        if (FLOAT_ONLY_REGEX.test(value)) return Promise.resolve();
                        return Promise.reject(
                        new Error(
                            "agreement should be numbers only e.g 500000"
                        )
                        );
                    },
                    validateTrigger: "onChange",
                    },
                ]}
                hasFeedback
            >
                <Input
                placeholder="e.g 100000"
                className="text-input"
                />
            </Form.Item>

            <Form.Item
                name="commission"
                label={<span className='fw-bold text-primary'>Commission</span>}
                rules={[
                    { required: true, message: "commission is required" },
                    { whitespace: true, message: "commission cannot be empty" },
                    {
                    async validator(rule, value) {
                        if (FLOAT_ONLY_REGEX.test(value)) return Promise.resolve();
                        return Promise.reject(
                        new Error(
                            "commission should be numbers only e.g 500000"
                        )
                        );
                    },
                    validateTrigger: "onChange",
                    },
                ]}
                hasFeedback
            >
                <Input
                placeholder="e.g 500000"
                className="text-input"
                />
            </Form.Item>

            <Form.Item
                name="rent_caution_fee"
                label={<span className='fw-bold text-primary'>Rental Caution Fee</span>}
                rules={[
                    { required: true, message: "rental caution fee is required" },
                    { whitespace: true, message: "rental caution fee cannot be empty" },
                    {
                    async validator(rule, value) {
                        if (FLOAT_ONLY_REGEX.test(value)) return Promise.resolve();
                        return Promise.reject(
                        new Error(
                            "rental caution fee should be numbers only e.g 500000"
                        )
                        );
                    },
                    validateTrigger: "onChange",
                    },
                ]}
                hasFeedback
            >
                <Input
                placeholder="e.g 500000"
                className="text-input"
                />
            </Form.Item>
            </>}

            {for_shortlet && <>
            <Form.Item
                name="short_let_amount"
                label={<span className='fw-bold text-primary'>Shortlet (nightly)</span>}
                rules={[
                    { required: true, message: "shortlet amount is required" },
                    { whitespace: true, message: "shortlet amount cannot be empty" },
                    {
                    async validator(rule, value) {
                        if (FLOAT_ONLY_REGEX.test(value)) return Promise.resolve();
                        return Promise.reject(
                        new Error(
                            "shortlet amount should be numbers only e.g 150000"
                        )
                        );
                    },
                    validateTrigger: "onChange",
                    },
                ]}
                hasFeedback
            >
                <Input
                placeholder="e.g 150000"
                className="text-input"
                />
            </Form.Item>

            <Form.Item
                name="shortlet_caution_fee"
                label={<span className='fw-bold text-primary'>Shortlet Caution Fee</span>}
                rules={[
                    { required: true, message: "shortlet caution fee is required" },
                    { whitespace: true, message: "shortlet caution fee cannot be empty" },
                    {
                    async validator(rule, value) {
                        if (FLOAT_ONLY_REGEX.test(value)) return Promise.resolve();
                        return Promise.reject(
                        new Error(
                            "shortlet caution fee should be numbers only e.g 40000"
                        )
                        );
                    },
                    validateTrigger: "onChange",
                    },
                ]}
                hasFeedback
            >
                <Input
                placeholder="e.g 40000"
                className="text-input"
                />
            </Form.Item>
            </>}

            <div className="text-center">
              <button
                className="btn btn-primary px-4 py-3 fw-bold me-2"
                onClick={() => changeStep('2')}
                type='button'
              >
                &larr;
              </button>

              <button
                className="btn btn-primary p-3 fw-bold"
                type='submit'
              >
                Add Listing
              </button>
            </div>
        </Form>

        <Drawer
            open={createProductBoxOpen}
            title={<div className='text-primary fw-bold'>Add Listing</div>}
            // footer={} // react node
            placement="bottom"
            height={"auto"}
            closable={!creatingProduct}
            maskClosable={!creatingProduct}
            onClose={() => openCreateProductBox(false)}
        >
            <div className='text-danger fw-bold fs-4 mb-3'>
                NB: Ensure that all the listing information and pricing information entered are correct and accurate.
            </div>
            <div className='text-center'>
                <button className="btn btn-primary me-2" onClick={() => createProduct()} disabled={creatingProduct}
                >{creatingProduct ? <CustomSpin color={'white'} /> : 'Add Lisitng'}</button>
                <button className="btn btn-primary" onClick={() => openCreateProductBox(false)} disabled={creatingProduct}>Cancel</button>
            </div>
        </Drawer>
    </div>
  )
}

export default Step3