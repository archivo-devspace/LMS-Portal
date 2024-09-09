"use client";

import React from "react";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import type { FormProps } from "antd";
import { Form, Input } from "antd";
import Cookies from "js-cookie";

import "./login.css";
import Button from "@/components/utils/Button";
import { useAuthentication } from "@/hooks/authentication/useAuthentication";
import { useMessageHandler } from "@/hooks/message/useMessageHandler";

const Login = () => {
  const { loginActions } = useAuthentication();
  const { showMessage, contextHolder } = useMessageHandler();

  type FieldType = {
    email: string;
    password: string;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Values", values);
    loginActions.login({ email: values.email, password: values.password });
  };

  const handleLoginStatus = () => {
    const key = "login_loading";

    switch (loginActions.login_status) {
      case "pending":
        showMessage({ type: "loading", key, isLoading: true });
        break;
      case "success":
        showMessage({
          type: "loading",
          conditionalType: "success",
          key,
          isLoading: false,
        });
        
        break;
      case "error":
        showMessage({
          type: "loading",
          conditionalType: "error",
          key,
          isLoading: false,
          content: loginActions.login_error?.message,
        });
        break;
      default:
        break;
    }
  };

  handleLoginStatus();

  return (
    <>
      {contextHolder}
      <div className="main">
        <div className="container">
          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel">
                <h1>Welcome Back!</h1>
                <p>Enter your personal details to use all of site features</p>
              </div>
            </div>
          </div>

          <div className="form-container">
            <Form
              name="login"
              className="w-full"
              initialValues={{ remember: true }}
              wrapperCol={{ span: 24 }}
              onFinish={onFinish}
            >
              <Form.Item>
                <h1 className="title">Log In</h1>
              </Form.Item>

              <Form.Item
                name="email"
                className=" sm:w-[75%]  w-[80%] "
                wrapperCol={{ span: 24 }}
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter valid email!" },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                className=" sm:w-[75%] w-[80%]"
                wrapperCol={{ span: 24 }}
                rules={[
                  { required: true, message: "Please input your Password!" },
                  { min: 8, message: "Password must be 8 characters!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                {/* <Button block type="primary" htmlType="submit">
                Log in
              </Button> */}
                <Button btnType="text" btnLabel="Log In" htmlType="submit" />
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <video
        src={require("../../../../public/backgroundvideos/gold.mp4")}
        autoPlay
        muted
        loop
        className="absolute top-0 -z-10 w-[100%] h-[100%] object-cover"
      />
    </>
  );
};

export default Login;
