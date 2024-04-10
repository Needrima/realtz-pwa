import React, { useState, useEffect } from "react";
import { Form, Input, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import emailIcon from "../../assets/icons/sms.svg";
import passwordIcon from "../../assets/icons/password.svg";
import { useTimer } from "react-timer-hook";
import OtpInput from "react-otp-input";
import timerIcon from "../../assets/icons/timer.svg";
import { axiosUserInstance } from "../../api/axoios";
import {
  PASSWORD_SYMBOLS_REGEX,
  PASSWORD_UPPERCASE_REGEX,
  PASSWORD_LOWERCASE_REGEX,
  PASSWORD_NUM_REGEX,
} from "../../misc/regex";
import CustomSpin from "../../components/UI/CustomSpin/CustomSpin";

const ForgotPassword = () => {
  const [state, setState] = useState({
    formSubmitted: false,
    otp: "",
    loading: false,
    email: "",
    currentPage: "1",
    resetTimerFlag: false,
  });

  const navigate = useNavigate();
  const { resetTimerFlag, otp, loading, email, currentPage } = state;

  const startPasswordReset = async (values) => {
    setState((state) => ({
      ...state,
      loading: true,
    }));

    const reqData = {
      email: values.email,
    };

    try {
      const { data } = await axiosUserInstance.post(
        "start-password-recovery",
        reqData
      );

      setState((state) => ({
        ...state,
        loading: false,
        otp_verification_key: data?.otp_verification_key,
        email: values.email,
        currentPage: "2",
      }));
      message.success(data?.message || `OTP has been sent to ${email}`, parseInt(process.env.REACT_APP_POPUP_TIMEOUT));
    } catch (error) {
      message.error(error?.response?.data?.error || "OTP could not be sent to your email", parseInt(process.env.REACT_APP_POPUP_TIMEOUT));
      setState((state) => ({
        ...state,
        loading: false,
      }));
    }
  };

  const completePasswordReset = async (values) => {
    setState((state) => ({
      ...state,
      loading: true,
    }));

    const { email, otp_verification_key, otp } = state;

    const reqData = {
      email: email,
      new_password: values.new_password,
      confirm_password: values.confirm_password,
      otp: otp,
      otp_verification_key: otp_verification_key,
    };

    try {
      const { data } = await axiosUserInstance.post(
        "complete-password-recovery",
        reqData
      );
      setState((state) => ({
        ...state,
        loading: false,
      }));
      message.success(data?.message || "Password successfully reset", parseInt(process.env.REACT_APP_POPUP_TIMEOUT));
      navigate("/login", { replace: true });
    } catch (error) {
      message.error(error?.response?.data?.error || "password verification failed", parseInt(process.env.REACT_APP_POPUP_TIMEOUT));
      setState((state) => ({
        ...state,
        loading: false,
        otp: "",
        otp_verification_key: "",
        email: "",
        currentPage: "1",
      }));
    }
  };

  const onInputOTP = (otp) => {
    setState((state) => ({
      ...state,
      otp: otp,
    }));

    if (otp.length === 6) {
      setState((state) => ({
        ...state,
        currentPage: "3",
      }));
    }
  };

  // OTP timer configuration
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 180); // three minutes timer

  const { seconds, minutes, isRunning, restart } = useTimer({
    expiryTimestamp,
    onExpire: () => console.log("timeout"),
  });

  const handleResendOTP = async () => {
    setState((state) => ({
      ...state,
      loading: true,
    }));

    const { email } = state;

    const reqData = {
      channel: "email",
      email: email,
    };

    try {
      const { data } = await axiosUserInstance.post("send-otp", reqData);
      setState((state) => ({
        ...state,
        loading: false,
        otp: "",
        resetTimerFlag: !resetTimerFlag,
      }));
      message.success(data?.message || "otp sent", parseInt(process.env.REACT_APP_POPUP_TIMEOUT));
    } catch (error) {
      setState((state) => ({
        ...state,
        loading: false,
        otp: "",
      }));
      message.error(error?.response?.data?.error || "sending otp failed", parseInt(process.env.REACT_APP_POPUP_TIMEOUT));
    }
  };

  useEffect(() => {
    if (currentPage === "2") {
      restart(expiryTimestamp);
    }
  }, [currentPage, resetTimerFlag]);

  return (
    <div className="px-2 pt-5 pb-3">
      {currentPage === "1" && (
        <>
          <h1 className="fw-bold mt-3 mb-3">
            Reset your <span className="text-default">Password</span>
          </h1>
          <p className="mb-5 text-muted">
            Lorem ipsum dolor sit amet, consecturadipiscing
          </p>
          <Form onFinish={startPasswordReset}>
            <Form.Item
              name="email"
              className="mt-5 mb-3"
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
                prefix={<img src={emailIcon} alt="email icon" />}
                placeholder="Email address"
                className="text-input"
              />
            </Form.Item>

            <div className="text-center">
              <button
                disabled={loading}
                className="login-button w-100 btn btn-primary btn-lg px-5 py-3 fw-bold"
              >
                {loading ? <CustomSpin color={'white'} spinning={loading} /> : "Proceed"}
              </button>
            </div>
          </Form>
          <div className="w-max-content mx-auto mt-3">
            Don't have an account?{" "}
            <span
              className="fw-bold text-default"
              onClick={() => navigate("/signup")}
            >
              Register
            </span>
          </div>
        </>
      )}
      {currentPage === "2" && (
        <div>
          <h1 className="fw-bold mt-5 mb-3">
            Enter <span className="text-primary">OTP</span>
          </h1>

          <div className="mb-3 mb-5 text-muted">
            Enter 6 digit OTP sent to <br />
            <span className="text-primary fw-bold">{email}</span>
          </div>

          <OtpInput
            value={otp}
            onChange={onInputOTP}
            numInputs={6}
            renderInput={(props) => <input {...props} disabled={loading} />}
            inputStyle={"otp-input rounded border-0"}
          />

          <div className="text-center mt-8">
            <span className="otp-countdown p-3 rounded-4">
              <img src={timerIcon} alt="timer icon" /> {minutes}:
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
              onClick={() => handleResendOTP()}
            >
              Resend OTP
            </span>
          </div>
        </div>
      )}
      {currentPage === "3" && (
        <>
          <h1 className="fw-bold mt-3 mb-3">
            Enter your new <span className="text-default">Password</span>
          </h1>
          <p className="mb-5 text-muted">
            Lorem ipsum dolor sit amet, consecturadipiscing
          </p>
          <Form onFinish={completePasswordReset}>
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
                placeholder="Password"
                className="text-input"
              />
            </Form.Item>

            <Form.Item
              name="confirm_password"
              dependencies={["new_password"]}
              rules={[
                { required: true, message: "Confirm password is required" },
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
                className="btn btn-primary btn-lg px-5 py-3 fw-bold"
              >
                {loading ? <CustomSpin color={'white'} spinning={loading} /> : "Reset Password"}
              </button>
            </div>
          </Form>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
