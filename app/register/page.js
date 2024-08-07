"use client";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';  // Import thư viện uuid
import { register } from '../redux/slices/userSlices';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    id: uuidv4(),  // Tạo id ngẫu nhiên
    username: '',
    email: '',
    fullname: '',
    password: '',
    rePassword: '',
    image: null
  });
  
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const { id, username, fullname, email, password, rePassword, image } = formData;

    if (password !== rePassword) {
        alert('Mật khẩu nhập lại không khớp');
        return;
    }

    const formDataObj = new FormData();
    formDataObj.append('id', id);
    formDataObj.append('username', username);
    formDataObj.append('fullname', fullname);
    formDataObj.append('email', email);
    formDataObj.append('password', password);
    formDataObj.append('image', image);

    try {
        const res = await fetch('http://localhost:3000/users/register', {
            method: 'POST',
            body: formDataObj
        });

        const data = await res.json();
        if (res.ok) {
            dispatch(register({ id: data.id, username, email, fullname, image: data.image }));
            alert(data.message);
            window.location.href = '/login';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Lỗi khi đăng ký:', error);
        alert('Đã xảy ra lỗi khi đăng ký');
    }
  };

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Đăng ký</h1>
      </div>
      <form className="mt-3 review-form-box" onSubmit={handleRegisterSubmit} id="formRegister" encType="multipart/form-data">
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="InputFullname" className="mb-0" style={{ color: "white" }}>Full Name</label>
            <input type="text" className="form-control" id="InputFullname" name="fullname" onChange={handleChange} placeholder="Full Name" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="InputuserName" className="mb-0" style={{ color: "white" }}>User Name</label>
            <input type="text" className="form-control" id="InputuserName" name="username" onChange={handleChange} placeholder="User Name" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="InputEmail1" className="mb-0" style={{ color: "white" }}>Email Address</label>
            <input type="email" className="form-control" id="InputEmail1" name="email" onChange={handleChange} placeholder="Enter Email" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="InputPassword1" className="mb-0" style={{ color: "white" }}>Password</label>
            <input type="password" className="form-control" id="InputPassword1" name="password" onChange={handleChange} placeholder="Password" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="InputRePassword" className="mb-0" style={{ color: "white" }}>Re-Password</label>
            <input type="password" className="form-control" id="InputRePassword" name="rePassword" onChange={handleChange} placeholder="Password" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="InputImage" className="mb-0" style={{ color: "white" }}>Profile Picture</label>
            <input type="file" className="form-control" id="InputImage" name="image" onChange={handleFileChange} />
          </div>
        </div>
        <button type="submit" className="btn hvr-hover">Register</button>
      </form>
    </>
  );
};

export default RegisterForm;
