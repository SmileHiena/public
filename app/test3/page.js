"use client"
import { createContext } from 'react';
import * as Yup from "Yup";
import { useFormik } from "formik";
export default function Regisetr() {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email là bắt buộc"),
    password: Yup.string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .required("Mật khẩu là bắt buộc")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
        "Mật khẩu phải chứa ít nhất một chữ hoa, thường và số"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
      .required("Xác nhận mật khẩu là bắt buộc"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setFormValues(values);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <input type="email" name='email' placeholder="Email" onChange={formik.handleChange} value={formik.values.email}/>
        <br />
        <input type="password" name='password' placeholder="Password" onChange={formik.handleChange} value={formik.values.password}/>
        <br />
        <input type="password" name='confirmPassword' placeholder="Retype Password" onChange={formik.handleChange} value={formik.values.confirmPassword}/>
        <br />
        <button type="submit">Đăng ký</button>
      </form>
    </>
  );
}
