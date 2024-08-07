"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, register } from "../../redux/slices/userSlices";

export default function Login() {
    const [formData, setFormData] = useState({
        id: '',
        username: '',
        email: '',
        fullname: '',
        password: '',
        rePassword: '',
        image: null // Thêm image vào formData
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
            const res = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (res.ok) {
                dispatch(login({
                    id: data.id,
                    username: data.username,
                    email: data.email,
                    fullname: data.fullname,
                    image: data.image
                }));
                alert('Đăng nhập thành công');
                window.location.href = '/';
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Lỗi khi đăng nhập:', error);
            alert('Đã xảy ra lỗi khi đăng nhập');
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        const {id, username, fullname, email, password, rePassword, image } = formData;

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
                dispatch(register({ id: data.id, username, email, fullname,  image: data.image }));
                alert(data.message);
                // window.location.href = '/login';
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
            <div className="all-title-box">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2 style={{ color: "white" }}>Checkout</h2>
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a href="#" style={{ color: "black" }}>Shop</a>
                                </li>
                                <li className="breadcrumb-item active" style={{ color: "black" }}>Checkout</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="cart-box-main">
                <div className="container">
                    <div className="row new-account-login">
                        <div className="col-sm-6 col-lg-6 mb-3">
                            <div className="title-left">
                                <h3 style={{ color: "white" }}>Account Login</h3>
                            </div>
                            <h5>
                                <a
                                    data-toggle="collapse"
                                    href="#formLogin"
                                    role="button"
                                    aria-expanded="false"
                                    style={{ color: "white" }}
                                >
                                    Click here to Login
                                </a>
                            </h5>
                            <form onSubmit={handleSubmit} className="mt-3 collapse review-form-box" id="formLogin">
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="InputEmail" className="mb-0" style={{ color: "white" }}>Email Address</label>
                                        <input type="email" className="form-control" id="InputEmail" placeholder="Enter Email" name="email" onChange={handleChange} required />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="InputPassword" className="mb-0" style={{ color: "white" }}>Password</label>
                                        <input type="password" onChange={handleChange} className="form-control" id="InputPassword" name="password" placeholder="Password" />
                                    </div>
                                </div>
                                <button type="submit" className="btn hvr-hover">Login</button>
                            </form>
                        </div>
                        <div className="col-sm-6 col-lg-6 mb-3">
                            <div className="title-left">
                                <h3 style={{ color: "white" }}>Create New Account</h3>
                            </div>
                            <h5>
                                <a
                                    data-toggle="collapse"
                                    href="#formRegister"
                                    role="button"
                                    aria-expanded="false"
                                    style={{ color: "white" }}
                                >
                                    Click here to Register
                                </a>
                            </h5>
                            <form className="mt-3 collapse review-form-box" onSubmit={handleRegisterSubmit} id="formRegister" encType="multipart/form-data">
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
