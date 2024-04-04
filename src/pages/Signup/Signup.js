import React, { useEffect, useState } from 'react'
import './Signup.scss'
import {Checkbox, Form, Input, Spin, message} from 'antd'
import userIcon from '../../assets/icons/user.svg'
import emailIcon from '../../assets/icons/sms.svg'
import phoneIcon from '../../assets/icons/call.svg'
import passwordIcon from '../../assets/icons/password.svg'
import { useNavigate } from 'react-router-dom'
import OtpInput from 'react-otp-input';
import { NAME_REGEX, USERNAME_REGEX, PHONE_REGEX, PASSWORD_SYMBOLS_REGEX, PASSWORD_UPPERCASE_REGEX, PASSWORD_LOWERCASE_REGEX, PASSWORD_NUM_REGEX } from '../../misc/regex'
import timerIcon from '../../assets/icons/timer.svg'
import { useTimer } from 'react-timer-hook';
import {axiosUserInstance} from '../../api/axoios'
import CustomSpin from '../../components/UI/CustomSpin/CustomSpin'

const Signup = () => {
  // react hooks
  const navigate = useNavigate();

  const [state, setState] = useState({
    otp: "",
    signUpFormSubmitted: false,
    loading: false,
    otp_verification_key: "",
    email: "",
  });
  const { otp, signUpFormSubmitted, loading, email } = state;

  // external libraries hooks
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 180); // three minutes timer

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

      const { otp_verification_key, email } = state;
      const reqData = {
        otp: otp,
        otp_verification_key: otp_verification_key,
        email: email,
      };

      try {
        const { data } = await axiosUserInstance.post("verify-email", reqData);

        setState((state) => ({
          ...state,
          loading: false,
        }));
        message.success(data?.message || "email verified", parseInt(process.env.REACT_APP_POPUP_TIMEOUT));
        navigate("/login", { replace: true });
      } catch (error) {
        setState((state) => ({
          ...state,
          loading: false,
        }));
        message.error(error?.response?.data?.error || "email verification failed", parseInt(process.env.REACT_APP_POPUP_TIMEOUT));
      }
    }
  };

  const onFinish = async (values) => {
    setState((state) => ({
      ...state,
      loading: true,
    }));

    const reqData = {
      user_type: "user",
      firstname: values.firstname,
      username: values.username,
      lastname: values.lastname,
      email: values.email,
      phone_number: values.phone_number,
      password: values.password,
      confirm_password: values.confirm_password,
      agreement: values.agreement,
    };

    try {
      const { data } = await axiosUserInstance.post("signup", reqData);

      setState((state) => ({
        ...state,
        loading: false,
        otp_verification_key: data?.otp_verification_key,
        signUpFormSubmitted: true,
        email: values.email,
      }));
      message.success(data?.message || "signup successful", parseInt(process.env.REACT_APP_POPUP_TIMEOUT));
    } catch (error) {
      message.error(error?.response?.data?.error || "signup failed", parseInt(process.env.REACT_APP_POPUP_TIMEOUT));
      setState((state) => ({
        ...state,
        loading: false,
      }));
    }
  };

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
      }));
      message.success(data?.message || "otp sent", parseInt(process.env.REACT_APP_POPUP_TIMEOUT));
      restart(expiryTimestamp);
    } catch (error) {
      setState((state) => ({
        ...state,
        loading: false,
        otp: "",
      }));
      message.error(error?.response?.data?.error || "sending otp failed", parseInt(process.env.REACT_APP_POPUP_TIMEOUT));
    }
  };

  // useeffects
  useEffect(() => {
    if (signUpFormSubmitted) {
      restart(expiryTimestamp);
    }
  }, [signUpFormSubmitted]);

  return (
    <div className="px-2 pt-5 pb-3">
      {!signUpFormSubmitted ? (
        <div>
          <h1 className="fw-bold mt-5 mb-3">
            Create your <span className="text-default">account</span>
          </h1>

          <div className="mb-3 text-muted">
            Lorem ipsum dolor sit amet, consecturadipiscing
          </div>

          <Form onFinish={onFinish} autoComplete="off">
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
                    if (NAME_REGEX.test(value)) return Promise.resolve();
                    return Promise.reject(new Error("Firstname must be alphabets with '-' as the only special character allowed"));
                  },
                  validateTrigger: "onChange",
                },
              ]}
              hasFeedback
            >
              <Input
                prefix={<img src={userIcon} alt="user-icon" />}
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
                    if (NAME_REGEX.test(value)) return Promise.resolve();
                    return Promise.reject(new Error("Firstname must be alphabets with '-' as the only special character allowed"));
                  },
                  validateTrigger: "onChange",
                },
              ]}
              hasFeedback
            >
              <Input
                prefix={<img src={userIcon} alt="user icon" />}
                placeholder="Lastname"
                className="text-input"
              />
            </Form.Item>

            <Form.Item
              name='username'
              rules={[
                {required: true, message: 'Username is required'},
                {min: 3, message: "Username should be atleast 3 characters long"},
                {whitespace: true, message: "Username cannot be empty"},
                {
                  async validator(rule, value) {
                    if (USERNAME_REGEX.test(value)) return Promise.resolve();
                    return Promise.reject(new Error("Username must be alphanumeric with '_' as the only special character allowed"));
                  },
                  validateTrigger: "onChange",
                },
                
              ]}
              hasFeedback
            >
              <Input
                prefix={<img src={userIcon} alt='user icon' />}
                placeholder='Username'
                className='text-input'
              />
            </Form.Item>

            <Form.Item
              name='email'
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
                prefix={<img src={phoneIcon} alt="phone icon" />}
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
                prefix={<img src={passwordIcon} alt="password icon" />}
                placeholder="Confirm password"
                className="text-input"
              />
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {required: true, message: "You have not accepted our terms and condtions"},
              ]}
            >
              <Checkbox>
                Agree to our{" "}
                <a href="/terms" className="text-primary text-decoration-none">
                  Terms and Conditions
                </a>
              </Checkbox>
            </Form.Item>

            <div className="text-center">
              <button
                disabled={loading}
                className="btn btn-primary btn-lg px-5 py-3 fw-bold"
              >
                {" "}
                {loading ? <CustomSpin color={'white'} spinning={loading} /> : "Create Account"}
              </button>
            </div>
          </Form>

          <div className="text-center mt-5">
            Already have an account?{" "}
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
            Enter 6 digit OTP sent to <br />{" "}
            <span className="text-primary fw-bold">{email}</span>
          </div>

          <OtpInput
            value={otp}
            onChange={onInputOTP}
            numInputs={6}
            // renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} disabled={loading} />}
            inputStyle={"otp-input rounded border-0"}
          />

          <div className="text-center mt-5">
            <span className="otp-countdown p-3 rounded-4">
              <img src={timerIcon} alt="timer icon" /> {minutes}:{seconds}
            </span>
          </div>

          <div className="text-center mt-3">
            Didn't receive OTP?{" "}
            <span
              className={`text-primary fw-bold ${
                isRunning || loading ? "opacity-50 pe-none" : ""
              }`}
              onClick={handleResendOTP}
            >
              Resend OTP
            </span>
          </div>

          <div className="text-center">
            Proceed to{" "}
            <a
              href="/login"
              className="text-primary fw-bold text-decoration-none"
            >
              Login
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
