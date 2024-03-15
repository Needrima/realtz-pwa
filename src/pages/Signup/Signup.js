import React, { useState } from 'react'
import './Signup.scss'
import {Form, Input, Button} from 'antd'
import userIcon from '../../assets/icons/user.svg'
import emailIcon from '../../assets/icons/sms.svg'
import phoneIcon from '../../assets/icons/call.svg'
import passwordIcon from '../../assets/icons/password.svg'
import { useNavigate } from 'react-router-dom'
import OtpInput from 'react-otp-input';
import { ALPHABET_REGEX, ALPHANUM_REGEX, PHONE_REGEX, SYMBOLS_REGEX } from '../../misc/regex'

const Signup = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    otp: '',
    signUpFormSubmitted: false,
  })
  const {otp, signUpFormSubmitted} = state;

  const onInputOTP = (e) => {
    setState(state => ({
      ...state,
      otp: e
    }))

    if (e.length === 6) {
      console.log("verifying email")
    }
  }

  const onFinish = (e) => {
    console.log(e)
    setState(state => ({
      ...state,
      signUpFormSubmitted: true,
    }))
  }

  return (
    <>
      {!signUpFormSubmitted 
        ? 
        <div>
          <h1 className='fw-bold mt-5 mb-3'>Create your <span className='text-default'>account</span></h1>

          <div className='mb-3 text-muted'>Lorem ipsum dolor sit amet, consecturadipiscing</div>

          <Form onFinish={onFinish}>
            <Form.Item
              name='firstname'
              rules={[
                {required: true, message: 'Firstname is required'},
                {min: 3, message: "Firstname should be atleast 3 characters long"},
                {whitespace: true, message: "Firstname cannot be empty"},
                {
                  async validator(rule, value) {
                    if (ALPHABET_REGEX.test(value)) return Promise.resolve();
                    return Promise.reject(new Error("Firstname must be alphabets with '-' as the only special character allowed"));
                  },
                  validateTrigger: "onChange",
                },
                
              ]}
              hasFeedback
            >
              <Input
                prefix={<img src={userIcon} />}
                placeholder='Firstname'
                className='text-input'
              />
            </Form.Item>

            <Form.Item
              name='lastname'
              rules={[
                {required: true, message: 'Lastname is required'},
                {min: 3, message: "Lastname should be atleast 3 characters long"},
                {whitespace: true, message: "Lastname cannot be empty"},
                {
                  async validator(rule, value) {
                    if (ALPHABET_REGEX.test(value)) return Promise.resolve();
                    return Promise.reject(new Error("Firstname must be alphabets with '-' as the only special character allowed"));
                  },
                  validateTrigger: "onChange",
                },
                
              ]}
              hasFeedback
            >
              <Input
                prefix={<img src={userIcon} />}
                placeholder='Lastname'
                className='text-input'
              />
            </Form.Item>

            <Form.Item
              name='email'
              rules={[
                { required: true, message: 'Email is required'},
                {whitespace: true, message: "Email cannot be empty"},
                {type: "email", message: 'Email is not a valid email address'},
              ]}
              hasFeedback
            >
              <Input
                prefix={<img src={emailIcon} />}
                placeholder='Email address'
                className='text-input'
              />
            </Form.Item>

            <Form.Item
              name='phone_number'
              rules={[
                { required: true, message: 'Phone number is required'},
                {whitespace: true, message: "Phone number cannot be empty"},
                {
                  async validator(rule, value) {
                    if (PHONE_REGEX.test(value)) return Promise.resolve();
                    return Promise.reject(new Error("Phone number must be a nigerian phone number e.g 08012345678"));
                  },
                  validateTrigger: "onChange",
                },
              ]}
              hasFeedback
            >
              <Input
                prefix={<img src={phoneIcon} />}
                placeholder='Phone number'
                className='text-input'
              />
            </Form.Item>

            <Form.Item
                name='password'
                rules={[
                  { required: true, message: 'Password is required'},
                  {whitespace: true, message: "Password cannot be empty"},
                  {
                    async validator(rule, value) {
                      if (ALPHANUM_REGEX.test(value) && SYMBOLS_REGEX.test(value) && value.length >= 6) return Promise.resolve();
                      return Promise.reject(new Error("Password must be atleast 6 characters with a combination of atleaset one lowercase, one uppercase, one number and one special character"));
                    },
                    validateTrigger: "onChange",
                  },
                ]}
                hasFeedback
              >
              <Input.Password
                prefix={<img src={passwordIcon} />}
                placeholder='Password'
                className='text-input'
              />
            </Form.Item>

            <Form.Item
              name='confirm_password'
            >
              <Input.Password
                prefix={<img src={passwordIcon} />}
                placeholder='Confirm password'
                className='text-input'
              />
            </Form.Item>

            <div className='text-center'>
              <button className='btn btn-primary btn-lg px-5 py-3 fw-bold'> Create Account</button>
            </div>
          </Form>

          <div className='text-center mt-5'>Already have an account? <span className='text-primary fw-bold' onClick={() => navigate("/login")}>Login</span></div>
      </div>
      :
      <div>
        <h1 className='fw-bold mt-5 mb-3'>Enter <span className='text-primary'>code</span></h1>

        <div className='mb-3 mb-5 text-muted'>Enter 6 digit OTP sent to <br /> <span className='text-primary fw-bold'>johndoe@gmail.com</span></div>

        <OtpInput
          value={otp}
          onChange={onInputOTP}
          numInputs={6}
          // renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
          inputStyle={"otp-input rounded border-0"}
        />
      </div>
    }
    </>
  )
}

export default Signup