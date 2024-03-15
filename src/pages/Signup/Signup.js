import React from 'react'
import './Signup.scss'
import {Form, Input, Button} from 'antd'
import userIcon from '../../assets/icons/user.svg'
import emailIcon from '../../assets/icons/sms.svg'
import phoneIcon from '../../assets/icons/call.svg'
import passwordIcon from '../../assets/icons/password.svg'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate();
  const onFinish = (e) => {
    console.log(e)
  }

  return (
    <div>
        <h1 className='fw-bold mt-5 mb-3'>Create your <span className='text-default'>account</span></h1>

        <div className='mb-3 text-muted'>Lorem ipsum dolor sit amet, consecturadipiscing</div>

        <Form onFinish={onFinish}>
          <Form.Item>
            <Input
              prefix={<img src={userIcon} />}
              placeholder='Firstname'
              className='text-input'
              rules={[
                { required: true, message: 'Firstname is required'}
              ]}
            />
          </Form.Item>

          <Form.Item>
            <Input
              prefix={<img src={userIcon} />}
              placeholder='Lastname'
              className='text-input'
              rules={[
                { required: true, message: 'Lastname is required'}
              ]}
            />
          </Form.Item>

          <Form.Item>
            <Input
              prefix={<img src={emailIcon} />}
              placeholder='Email address'
              className='text-input'
              rules={[
                { required: true, message: 'Email is required'}
              ]}
              type='email'
            />
          </Form.Item>

          <Form.Item>
            <Input
              prefix={<img src={phoneIcon} />}
              placeholder='Phone number'
              className='text-input'
              rules={[
                { required: true, message: 'Phone number is required'}
              ]}
            />
          </Form.Item>

          <Form.Item>
            <Input.Password
              prefix={<img src={passwordIcon} />}
              placeholder='Password'
              className='text-input'
              rules={[
                { required: true, message: 'Password is required'}
              ]}
            />
          </Form.Item>

          <Form.Item>
            <Input.Password
              prefix={<img src={passwordIcon} />}
              placeholder='Confirm Password'
              className='text-input'
            />
          </Form.Item>

          <div className='text-center'>
            <button className='btn btn-primary btn-lg px-5 py-3 fw-bold'> Create Account</button>
          </div>
        </Form>

        <div className='text-center mt-5'>Already have an account? <span className='text-primary fw-bold' onClick={() => navigate("/login")}>Login</span></div>
    </div>
  )
}

export default Signup