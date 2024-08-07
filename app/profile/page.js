"use client";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { updateUser } from '../redux/slices/userSlices';

export default function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser);
    const [editable, setEditable] = useState(false);
    const [formData, setFormData] = useState({
        id: user ? user.id : '',  // Đảm bảo id được lấy từ Redux store
        fullname: user ? user.fullname : '',
        email: user ? user.email : '',
        username: user ? user.username : '',
        image: user ? user.image : null
    });

    const handleEdit = () => {
        setEditable(!editable);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { id, username, fullname, email, image } = formData;

        try {
            const formDataObj = new FormData();
            formDataObj.append('id', id);  // Đảm bảo id được gửi lên server
            formDataObj.append('username', username);
            formDataObj.append('fullname', fullname);
            formDataObj.append('email', email);
            if (image) {
                formDataObj.append('image', image);
            }

            const res = await fetch('http://localhost:3000/users/update', {
                method: 'PUT',
                body: formDataObj
            });

            const data = await res.json();
            if (res.ok) {
                dispatch(updateUser({
                    id,  // Cập nhật id trong Redux store
                    username,
                    email,
                    fullname,
                    image: data.image
                }));
                alert(data.message);
                setEditable(false);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật:', error);
            alert('Đã xảy ra lỗi khi cập nhật');
        }
    };

    return (
        <div className="container profile-container">
            <h2 className="text-white">Profile</h2>
            <div className="profile-details">
                {user ? (
                    <>
                        <img 
                            src={`http://localhost:3000/images/${user.image}`} 
                            alt={user.fullname} 
                            className="profile-image" 
                            id="profileImage"
                        />
                        {editable ? (
                            <form onSubmit={handleSubmit} id="profileForm">
                                <div className="form-group">
                                    <label htmlFor="InputId" className="text-white">Id</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="InputId" 
                                        name="id" 
                                        value={formData.id}  // Hiển thị id từ formData
                                        readOnly  // Không cho phép sửa id
                                    />
                                    <label htmlFor="InputFullname" className="text-white">Full Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="InputFullname" 
                                        name="fullname" 
                                        value={formData.fullname} 
                                        onChange={handleChange} 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="InputUsername" className="text-white">Username</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="InputUsername" 
                                        name="username" 
                                        value={formData.username} 
                                        onChange={handleChange} 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="InputEmail" className="text-white">Email</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        id="InputEmail" 
                                        name="email" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="InputImage" className="text-white">Profile Picture</label>
                                    <input 
                                        type="file" 
                                        className="form-control" 
                                        id="InputImage" 
                                        name="image" 
                                        onChange={handleChange} 
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary" id="saveButton">Save</button>
                            </form>
                        ) : (
                            <div>
                                {/* <p className="text-white">Id: {user.id}</p> */}
                                <p className="text-white">Full Name: {user.fullname}</p>
                                <p className="text-white">Username: {user.username}</p>
                                <p className="text-white">Email: {user.email}</p>
                                <button onClick={handleEdit} className="btn btn-primary" id="editButton">Edit</button>
                            </div>
                        )}
                    </>
                ) : (
                    <p className="text-white">Please login to view your profile.</p>
                )}
            </div>
        </div>
    );
}
