'use client';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Register() {
    const formik = useFormik({
        initialValues: {
            name: '',
            username: '',
            fullname: '',
            email: '',
            password: '',
            rePassword: '',
            image: null,
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Vui lòng nhập tên người dùng'),
            username: Yup.string().required('Vui lòng nhập tên đăng nhập '),
            fullname: Yup.string().required('Vui lòng nhập họ tên đầy đủ'),
            email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
            password: Yup.string()
                .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 'Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ và số')
                .required('Vui lòng nhập mật khẩu'),
            rePassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
                .required('Vui lòng nhập lại mật khẩu'),
            image: Yup.mixed().required('Vui lòng chọn ảnh đại diện'),
        }),
        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            try {
                const formData = new FormData();
                formData.append('name', values.name);
                formData.append('username', values.username);
                formData.append('fullname', values.fullname);
                formData.append('email', values.email);
                formData.append('password', values.password);
                formData.append('image', values.image);

                const res = await fetch('http://localhost:3000/register', {
                    method: 'POST',
                    body: formData,
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    if (res.status === 400 && errorData.message === "Email đã tồn tại") {
                        setFieldError('email', 'Email đã tồn tại');
                    } else {
                        throw new Error(errorData.message || 'Đăng ký thất bại');
                    }
                }
                // Xử lý thành công
                alert('Đăng ký thành công');
                window.location.href = '/dangnhap';
            } catch (error) {
                setFieldError('general', error.message);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="container mt-3">
            <h2>Đăng ký tài khoản</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label>Tên đăng nhập</label>
                    <input
                        type="text"
                        className="form-control"
                        {...formik.getFieldProps('username')}
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <div className="text-danger">{formik.errors.username}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>Tên người dùng</label>
                    <input
                        type="text"
                        className="form-control"
                        {...formik.getFieldProps('name')}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className="text-danger">{formik.errors.name}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>Họ tên đầy đủ</label>
                    <input
                        type="text"
                        className="form-control"
                        {...formik.getFieldProps('fullname')}
                    />
                    {formik.touched.fullname && formik.errors.fullname ? (
                        <div className="text-danger">{formik.errors.fullname}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="text-danger">{formik.errors.email}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>Mật khẩu</label>
                    <input
                        type="password"
                        className="form-control"
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="text-danger">{formik.errors.password}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>Nhập lại mật khẩu</label>
                    <input
                        type="password"
                        className="form-control"
                        {...formik.getFieldProps('rePassword')}
                    />
                    {formik.touched.rePassword && formik.errors.rePassword ? (
                        <div className="text-danger">{formik.errors.rePassword}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label>Ảnh đại diện</label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={(event) => {
                            formik.setFieldValue("image", event.currentTarget.files[0]);
                        }}
                    />
                    {formik.touched.image && formik.errors.image ? (
                        <div className="text-danger">{formik.errors.image}</div>
                    ) : null}
                </div>
                <button type="submit" className="btn btn-primary my-3" disabled={formik.isSubmitting}>
                    Đăng ký
                </button>
                {formik.errors.general && (
                    <p className="my-3 text-danger">{formik.errors.general}</p>
                )}
            </form>
        </div>
    );
}
