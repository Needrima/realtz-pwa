import { Form, Input } from 'antd'
import React, { useContext } from 'react'
import passwordIcon from "../../../../assets/icons/password.svg";
import { PASSWORD_LOWERCASE_REGEX, PASSWORD_NUM_REGEX, PASSWORD_SYMBOLS_REGEX, PASSWORD_UPPERCASE_REGEX } from '../../../../misc/regex';
import CustomSpin from '../../../UI/CustomSpin/CustomSpin';
import { changePasswordContext } from '../../../../pages/Settings/Account/ChangePassword/ChangePassword';

const ChangePasswordLayout = () => {
    const {loading, onFinish} = useContext(changePasswordContext);
  return (
    <div className='px-2 pt-5 pb-3'>
    <h1 className='fw-bold text-primary mt-3 text-center mb-5'>Change password</h1>

     <Form onFinish={onFinish}>
        <Form.Item
          name="curent_password"
          rules={[
            { required: true, message: "Password is required" },
            { whitespace: true, message: "Password cannot be empty" },
          ]}
        >
          <Input.Password
            prefix={<img src={passwordIcon} alt="password icon" />}
            placeholder="Current password"
            className="text-input"
          />
        </Form.Item>

        <Form.Item
            name="new_password"
            rules={[
            { required: true, message: "Password is required" },
            { whitespace: true, message: "Password cannot be empty" },
            {
                async validator(rule, value) {
                if (
                    PASSWORD_UPPERCASE_REGEX.test(value) &&
                    PASSWORD_LOWERCASE_REGEX.test(value) &&
                    PASSWORD_NUM_REGEX.test(value) &&
                    PASSWORD_SYMBOLS_REGEX.test(value) &&
                    value.length >= 6
                )
                    return Promise.resolve();
                return Promise.reject(
                    new Error(
                    "Password must be atleast 6 characters with atleaset 1 lowercase, 1 uppercase, 1 number and one special character"
                    )
                );
                },
                validateTrigger: "onChange",
            },
            ]}
            hasFeedback
        >
            <Input.Password
                prefix={<img src={passwordIcon} alt="password icon" />}
                placeholder="New password"
                className="text-input"
            />
        </Form.Item>

        <Form.Item
            name="confirm_password"
            dependencies={["new_password"]}
            rules={[
            { required: true, message: "Confirm password is required"},
            ({ getFieldValue }) => ({
                async validator(rule, value) {
                if (value && getFieldValue("new_password") === value)
                    return Promise.resolve();
                return Promise.reject(new Error("Passwords mismatch"));
                },
                validateTrigger: "onChange",
            }),
            ]}
            hasFeedback
        >
            <Input.Password
                prefix={<img src={passwordIcon} alt="password icon" />}
                placeholder="Confirm password"
                className="text-input"
            />
        </Form.Item>

        <div className="text-center">
          <button
            disabled={loading}
            className="login-button w-100 btn btn-primary btn-lg px-5 py-3 fw-bold"
          >
            {loading ? <CustomSpin color={'white'} spinning={loading} /> : "Change Password"}
          </button>
        </div>
      </Form>
    </div>
  )
}

export default ChangePasswordLayout