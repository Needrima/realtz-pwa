import React, { useEffect, useState } from "react";
import "./Signup.scss";

import { Form, Input } from "antd";
import userIcon from "../../assets/icons/user.svg";
import emailIcon from "../../assets/icons/sms.svg";
import phoneIcon from "../../assets/icons/call.svg";
import passwordIcon from "../../assets/icons/password.svg";
import timerIcon from "../../assets/icons/timer.svg";

import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import {
  ALPHABET_REGEX,
  PHONE_REGEX,
  PASSWORD_SYMBOLS_REGEX,
  PASSWORD_UPPERCASE_REGEX,
  PASSWORD_LOWERCASE_REGEX,
  PASSWORD_NUM_REGEX,
} from "../../misc/regex";
import { useTimer } from "react-timer-hook";

const Signup = () => {
  // react hooks
  const navigate = useNavigate();

  const [state, setState] = useState({
    otp: "",
    signUpFormSubmitted: false,
  });
  const { otp, signUpFormSubmitted } = state;

  // external libraries hooks
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 120); // two minutes timer

  const {
    // totalSeconds,
    seconds,
    minutes,
    // hours,
    // days,
    isRunning,
    // start,
    // pause,
    // resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.log("timeout") });

  // functions
  const onInputOTP = (e) => {
    setState((state) => ({
      ...state,
      otp: e,
    }));

    if (e.length === 6) {
      console.log("verifying email");
    }
  };

  const onFinish = (values) => {
    console.log(values);
    setState((state) => ({
      ...state,
      signUpFormSubmitted: true,
    }));
  };

  // use effects
  useEffect(() => {
    if (signUpFormSubmitted) {
      restart(expiryTimestamp);
    }
  }, [signUpFormSubmitted]);

  return (
    <>
      {!signUpFormSubmitted ? (
        <div>
          <h1 className="fw-bold mt-5 mb-3">
            Create your <span className="text-default">account</span>
          </h1>

          <div className="mb-3 text-muted">
            Lorem ipsum dolor sit amet, consecturadipiscing
          </div>

          <Form onFinish={onFinish}>
            <Form.Item
              name="firstname"
              rules={[
                { required: true, message: "Firstname is required" },
                {
                  min: 3,
                  message: "Firstname should be atleast 3 characters long",
                },
                { whitespace: true, message: "Firstname cannot be empty" },
                {
                  async validator(rule, value) {
                    rule = ALPHABET_REGEX;
                    if (rule.test(value)) return Promise.resolve();
                    return Promise.reject(
                      new Error(
                        "Firstname must be alphabets with '-' as the only special character allowed"
                      )
                    );
                  },
                  validateTrigger: "onChange",
                },
              ]}
              hasFeedback
            >
              <Input
                prefix={<img src={userIcon} />}
                placeholder="Firstname"
                className="text-input"
              />
            </Form.Item>

            <Form.Item
              name="lastname"
              rules={[
                { required: true, message: "Lastname is required" },
                {
                  min: 3,
                  message: "Lastname should be atleast 3 characters long",
                },
                { whitespace: true, message: "Lastname cannot be empty" },
                {
                  async validator(rule, value) {
                    if (ALPHABET_REGEX.test(value)) return Promise.resolve();
                    return Promise.reject(
                      new Error(
                        "Firstname must be alphabets with '-' as the only special character allowed"
                      )
                    );
                  },
                  validateTrigger: "onChange",
                },
              ]}
              hasFeedback
            >
              <Input
                prefix={<img src={userIcon} />}
                placeholder="Lastname"
                className="text-input"
              />
            </Form.Item>

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
              name="phone_number"
              rules={[
                { required: true, message: "Phone number is required" },
                { whitespace: true, message: "Phone number cannot be empty" },
                {
                  async validator(rule, value) {
                    if (PHONE_REGEX.test(value)) return Promise.resolve();
                    return Promise.reject(
                      new Error(
                        "Phone number must be a nigerian phone number e.g 08012345678"
                      )
                    );
                  },
                  validateTrigger: "onChange",
                },
              ]}
              hasFeedback
            >
              <Input
                prefix={<img src={phoneIcon} />}
                placeholder="Phone number"
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

            <Form.Item
              name="confirm_password"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Confirm password is required" },
                ({ getFieldValue }) => ({
                  async validator(rule, value) {
                    if (value && getFieldValue("password") === value)
                      return Promise.resolve();
                    return Promise.reject(new Error("Passwords mismatch"));
                  },
                  validateTrigger: "onChange",
                }),
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<img src={passwordIcon} />}
                placeholder="Confirm password"
                className="text-input"
              />
            </Form.Item>

            <div className="text-center">
              <button className="btn btn-primary btn-lg px-5 py-3 fw-bold">
                Create Account
              </button>
            </div>
          </Form>

          <div className="text-center mt-5">
            Already have an account?
            <span
              className="text-primary fw-bold"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="fw-bold mt-5 mb-3">
            Enter <span className="text-primary">code</span>
          </h1>

          <div className="mb-3 mb-5 text-muted">
            Enter 6 digit OTP sent to <br />
            <span className="text-primary fw-bold">johndoe@gmail.com</span>
          </div>

          <OtpInput
            value={otp}
            onChange={onInputOTP}
            numInputs={6}
            // renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={"otp-input rounded border-0"}
          />

          <div className="text-center mt-5">
            <span className="otp-countdown p-3 rounded-4">
              <img src={timerIcon} /> {minutes}:
              {seconds.toLocaleString("en-US", {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
            </span>
          </div>

          <div className="text-center mt-3">
            Didn't receive OTP?{" "}
            <span
              className={`text-primary fw-bold ${
                isRunning ? "opacity-50 pe-none" : ""
              }`}
              onClick={() => restart(expiryTimestamp)}
            >
              Resend OTP
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
