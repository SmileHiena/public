"use client";
import { useRef, useState } from "react";

export default function Register() {
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const userNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const imageRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstName', firstNameRef.current.value);
    formData.append('lastName', lastNameRef.current.value);
    formData.append('userName', userNameRef.current.value);
    formData.append('email', emailRef.current.value);
    formData.append('password', passwordRef.current.value);
    formData.append('image', imageRef.current.files[0]);

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      setSuccessMessage('Registration successful');
      setError(null); // Clear any previous errors
      // Redirect or handle successful registration here
    } catch (error) {
      console.error('Registration error:', error);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <>
      <div className="cart-box-main">
        <div className="container">
          <div className="row new-account-login">
            <div className="col-sm-6 col-lg-6 mb-3">
              <form className="mt-3 review-form-box" onSubmit={handleSubmit} id="formRegister" encType="multipart/form-data">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="InputName" className="mb-0" style={{ color: "white" }}>First Name</label>
                    <input type="text" className="form-control" id="InputName" ref={firstNameRef} placeholder="First Name" />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="InputLastname" className="mb-0" style={{ color: "white" }}>Last Name</label>
                    <input type="text" className="form-control" id="InputLastname" ref={lastNameRef} placeholder="Last Name" />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="InputuserName" className="mb-0" style={{ color: "white" }}>User Name</label>
                    <input type="text" className="form-control" id="InputuserName" ref={userNameRef} placeholder="Last Name" />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="InputEmail1" className="mb-0" style={{ color: "white" }}>Email Address</label>
                    <input type="email" className="form-control" id="InputEmail1" ref={emailRef} placeholder="Enter Email" />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="InputPassword1" className="mb-0" style={{ color: "white" }}>Password</label>
                    <input type="password" className="form-control" id="InputPassword1" ref={passwordRef} placeholder="Password" />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="InputImage" className="mb-0" style={{ color: "white" }}>Profile Picture</label>
                    <input type="file" className="form-control" id="InputImage" ref={imageRef} />
                  </div>
                </div>
                <button type="submit" className="btn hvr-hover">Register</button>
                {error && <p>{error}</p>}
                {successMessage && <p>{successMessage}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
