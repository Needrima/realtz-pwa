import React from "react";
import { Form, Input } from "antd";
import {
  PASSWORD_SYMBOLS_REGEX,
  PASSWORD_UPPERCASE_REGEX,
  PASSWORD_LOWERCASE_REGEX,
  PASSWORD_NUM_REGEX,
} from "../../misc/regex";
import { useNavigate } from "react-router-dom";
import emailIcon from "../../assets/icons/sms.svg";
import passwordIcon from "../../assets/icons/password.svg";
const Login = () => {
  const onFinish = () => {
    console.log("Hello world");
  };

  const navigate = useNavigate();

  return (
    <div className="px-2 pt-5 pb-3">
      <h1 className="fw-bold mt-3 mb-3">
        Let's <span className="text-default">Sign you in</span>
      </h1>
      <p className="mb-5 text-muted">
        Lorem ipsum dolor sit amet, consecturadipiscing
      </p>

      <Form onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Email is required" },
            { whitespace: true, message: "Email cannot be empty" },
            {
              type: "email",
              message: "Email is not a valid email address",
            },
          ]}
          hasFeedback
        >
          <Input
            prefix={<img src={emailIcon} />}
            placeholder="Email address"
            className="text-input"
          />
        </Form.Item>

        <Form.Item
          name="password"
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
                    "Password must be atleast 6 characters with atleast 1 lowercase, 1 uppercase, 1 number and one special character"
                  )
                );
              },
              validateTrigger: "onChange",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<img src={passwordIcon} />}
            placeholder="Password"
            className="text-input"
          />
        </Form.Item>

        <div className="d-flex justify-content-between mb-5">
          <div onClick={() => navigate("/forgot-password")}>
            Forgot Password
          </div>
        </div>

        <div className="text-center">
          <button className="login-button w-100 btn btn-primary btn-lg px-5 py-3 fw-bold">
            Login
          </button>
        </div>
      </Form>

      <div className="w-max-content mx-auto mt-8">
        Don't have an account?{" "}
        <span
          className="fw-bold text-default"
          onClick={() => navigate("/signup")}
        >
          Register
        </span>
      </div>
    </div>
  );
};

export default Login;
