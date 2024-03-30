import React, { useState } from "react";
import { Form, Input, Spin, message } from "antd";
import { useNavigate } from "react-router-dom";
import emailIcon from "../../assets/icons/sms.svg";
import passwordIcon from "../../assets/icons/password.svg";
import { useDispatch } from "react-redux";
import { login } from "../../redux/Actions";
import { axiosUserInstance } from "../../api/axoios";
import CustomSpin from "../../components/UI/CustomSpin/CustomSpin";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState({
    loading: false,
  });
  const { loading } = state;

  const onFinish = async (values) => {
    setState((state) => ({
      ...state,
      loading: true,
    }));

    const reqData = {
      email: values.email,
      password: values.password,
    };

    try {
      const { data } = await axiosUserInstance.post("login", reqData);
      const loginData = {
        token: data?.token,
        user: data?.user,
      };
      dispatch(login(loginData));
      message.success(data?.message || "login successful");
      setState((state) => ({
        ...state,
        loading: false,
      }));
      navigate("/home", { replace: true });
    } catch (error) {
      message.error(error?.response?.data?.error || "login failed");
      setState((state) => ({
        ...state,
        loading: false,
      }));
    }
  };

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
          ]}
        >
          <Input
            prefix={<img src={emailIcon} alt="email icon" />}
            placeholder="Email address"
            className="text-input"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Password is required" },
            { whitespace: true, message: "Password cannot be empty" },
          ]}
        >
          <Input.Password
            prefix={<img src={passwordIcon} alt="password icon" />}
            placeholder="Password"
            className="text-input"
          />
        </Form.Item>

        <div className="d-flex justify-content-between mb-5 text-muted fw-bold">
          <div onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </div>
        </div>

        <div className="text-center">
          <button
            disabled={loading}
            className="login-button w-100 btn btn-primary btn-lg px-5 py-3 fw-bold"
          >
            {loading ? <CustomSpin color={'white'} spinning={loading} /> : "Login"}
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
