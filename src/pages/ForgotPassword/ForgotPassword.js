import React, { useState, useEffect } from "react";
import { Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import emailIcon from "../../assets/icons/sms.svg";
import { useTimer } from "react-timer-hook";
import OtpInput from "react-otp-input";
import timerIcon from "../../assets/icons/timer.svg";

const ForgotPassword = () => {
  const [state, setState] = useState({
    formSubmitted: false,
    otp: "",
    loading: false,
    email: "",
  });

  const { formSubmitted, otp, loading, email } = state;

  const onFinish = (values) => {
    setState((state) => ({
      ...state,
      formSubmitted: true,
      email: values.email,
    }));
  };

  const onInputOTP = async (otp) => {
    setState((state) => ({
      ...state,
      otp: otp,
    }));

    if (otp.length === 6) {
      setState((state) => ({
        ...state,
        loading: true,
      }));
    }
  };

  const navigate = useNavigate();

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

    restart(expiryTimestamp);
  };

  useEffect(() => {
    if (formSubmitted) {
      restart(expiryTimestamp);
    }
  }, [formSubmitted]);

  return (
    <div className="px-2 pt-5 pb-3">
      {!formSubmitted ? (
        <>
          <h1 className="fw-bold mt-3 mb-3">
            Reset your <span className="text-default">Password</span>
          </h1>
          <p className="mb-5 text-muted">
            Lorem ipsum dolor sit amet, consecturadipiscing
          </p>
          <Form onFinish={onFinish}>
            <Form.Item
              name="email"
              className="mb-8"
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
              <button className="login-button w-100 btn btn-primary btn-lg px-5 py-3 fw-bold">
                Send OTP
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
        </>
      ) : (
        <div>
          <h1 className="fw-bold mt-5 mb-3">
            Enter the <span className="text-primary">code</span>
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

          <div className="text-center mt-10">
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
    </div>
  );
};

export default ForgotPassword;
