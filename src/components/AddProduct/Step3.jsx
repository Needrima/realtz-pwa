import React, { useContext } from 'react'
import { addProductContext } from '../../pages/AddProduct/AddProduct'
import { NUMBER_ONLY_REGEX } from '../../misc/regex';
import { Form, Input } from 'antd';

const Step3 = () => {
    const {step3Form, changeStep, addListingInfo, listingInfo:{for_rent, for_shortlet}, createProduct} = useContext(addProductContext);
    console.log(for_rent, for_shortlet)
  return (
    <div className='my-5'>
        <h1 className='fw-bold mb-3'>Pricing <span className='text-primary'>information</span></h1>
        <Form 
            onFinish={(values) => {
                addListingInfo(values, '3')
                createProduct();
            }}
            form={step3Form[0]}
        >
            {for_rent && <>
            <Form.Item
                name="annual_rent"
                label={<span className='fw-bold text-primary'>Annual Rent(annually)</span>}
                rules={[
                    { required: true, message: "annual rent is required" },
                    { whitespace: true, message: "annual rent cannot be empty" },
                    {
                    async validator(rule, value) {
                        if (NUMBER_ONLY_REGEX.test(value)) return Promise.resolve();
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
                        if (NUMBER_ONLY_REGEX.test(value)) return Promise.resolve();
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
                        if (NUMBER_ONLY_REGEX.test(value)) return Promise.resolve();
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
                        if (NUMBER_ONLY_REGEX.test(value)) return Promise.resolve();
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
                label={<span className='fw-bold text-primary'>Shortlet Amount(nightly)</span>}
                rules={[
                    { required: true, message: "shortlet amount is required" },
                    { whitespace: true, message: "shortlet amount cannot be empty" },
                    {
                    async validator(rule, value) {
                        if (NUMBER_ONLY_REGEX.test(value)) return Promise.resolve();
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
                        if (NUMBER_ONLY_REGEX.test(value)) return Promise.resolve();
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
                className="btn btn-primary btn-lg px-5 py-3 fw-bold me-2"
                onClick={() => changeStep('2')}
                type='button'
              >
                &larr;
              </button>

              <button
                className="btn btn-primary btn-lg px-5 py-3 fw-bold"
                type='submit'
              >
                Add Listing
              </button>
            </div>
        </Form>
    </div>
  )
}

export default Step3