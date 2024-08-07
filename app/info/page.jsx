'use client';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';


export default function Info() {
    // Lấy token từ cookie ở browser
    const token = document.cookie.split(';').find((c) => c.trim().startsWith('token='));
    const tokenValue = token?.split('=')[1];
    if (!tokenValue) {
        window.location.href = '/dangnhap';
    }
    
    // Lấy thông tin user bằng token
    const [user, setUser] = useState({});
    useEffect(() => {
        const getUser = async () => {
            const res = await fetch('http://localhost:3000/detailuser', {
                headers: {
                    Authorization: `Bearer ${tokenValue}`,
                },
            });
            const data = await res.json();
            setUser(data);
        };
        getUser();
    }, [tokenValue]);
    

    return (
        <>
        <div className="container profile-container">
            <h2 className="text-white">Profile</h2>
            <div className="profile-details">
                    <>
                    {user.image && <img src={`http://localhost:3000/${user.image}`} alt="Avatar" width="100" />}
                            <div>
                                {/* <p className="text-white">Id: {user.id}</p> */}
                                <p className="text-white">Full Name: {user.fullname}</p>
                                <p className="text-white">Username: {user.username}</p>
                                <p className="text-white">Email: {user.email}</p>
                                <button className="btn btn-primary" id="editButton">Edit</button>
                            </div>
                    </>
                
            </div>
        </div>
        </>
        
        
    );
}

