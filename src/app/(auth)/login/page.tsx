"use client";

import { useThemeContext } from "@/contexts/ThemeContext";
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import type { FormProps } from "antd";
import { Card, Checkbox, Flex, Form, Input } from "antd";
import "./login.css";
import Button from "@/components/utils/Button";

const Login = () => {
  const { theme, setTheme } = useThemeContext();

  console.log("theme", theme);

  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
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
            className="w-full bg-successColor"
            initialValues={{ remember: true }}
            wrapperCol={{ span: 24 }}
            onFinish={onFinish}
          >
            <Form.Item>
              <h1 className="title">Log In</h1>
            </Form.Item>

            <Form.Item
              name="username"
              className=" md:w-[70%]"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              className=" md:w-[70%]"
              rules={[
                { required: true, message: "Please input your Password!" },
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
              <Button btnType="primary" btnLabel="Log In" htmlType="submit" />
            </Form.Item>
          </Form>
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
