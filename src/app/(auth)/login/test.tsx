"use client";

import React, { useState } from "react";

import "./login.css";

const Login = () => {
  return (
    <div className={`container `}>
      <div className="form-container sign-in">
        <form>
          <h1 className=" text-2xl pb-10 ">Log In</h1>

          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a>Forget Your Password?</a>
          <button type="button">Log In</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>
              Register with your personal details to use all of the site's
              features
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
