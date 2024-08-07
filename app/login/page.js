// login\page.js
"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/userSlices";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    username: "",
    email: "",
    fullname: "",
    password: "",
    rePassword: "",
    image: null, // Thêm image vào formData
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const res = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        dispatch(
          login({
            id: data.id,
            username: data.username,
            email: data.email,
            fullname: data.fullname,
            image: data.image,
          })
        );
        alert("Đăng nhập thành công");
        window.location.href = "/";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
      alert("Đã xảy ra lỗi khi đăng nhập");
    }
  };

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Đăng nhập</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mt-3 review-form-box"
        id="formLogin"
      >
        <div className="form-row">
          <div className="form-group col-md-6">
            <label
              htmlFor="InputEmail"
              className="mb-0"
              style={{ color: "white" }}
            >
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="InputEmail"
              placeholder="Enter Email"
              name="email"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label
              htmlFor="InputPassword"
              className="mb-0"
              style={{ color: "white" }}
            >
              Password
            </label>
            <input
              type="password"
              onChange={handleChange}
              className="form-control"
              id="InputPassword"
              name="password"
              placeholder="Password"
            />
          </div>
        </div>
        <button type="submit" className="btn hvr-hover">
          Login
        </button>
      </form>
      <a
        href="/?m=login&amp;a=snslogin&amp;type=google"
        aria-label="google"
        data-type="gg"
        class="base-public-rlg-with-btn gg ga-click flexStart"
        data-ga-cate="Login"
        data-ga-type="frame_social"
        data-ga-label="google"
      >
        <svg class="svg-icon">
         
        </svg>
        tiếp tục với google
      </a>
    </>
  );
};

export default LoginForm;
