"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './redux/slices/userSlices';
// import { logout } from '../redux/slices/userSlice';

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
      const token = document.cookie.split(';').find((c) => c.trim().startsWith('token='));
      const tokenValue = token?.split('=')[1];
      if (tokenValue) {
          setIsLoggedIn(true);
          // Fetch user info if logged in
          const getUser = async () => {
              const res = await fetch('http://localhost:3000/detailuser', {
                  headers: {
                      Authorization: `Bearer ${tokenValue}`,
                  },
              });
              if (res.ok) {
                  const data = await res.json();
                  setUser(data);
              } else {
                  console.error('Failed to fetch user data');
              }
          };
          getUser();
      }
  }, []);
//   useEffect(() => {
//     const token = document.cookie.split(';').find((c) => c.trim().startsWith('token='));
//     if (token) {
//         setIsLoggedIn(true);
//     }
// }, []);
const handleLogout = () => {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
  setIsLoggedIn(false);
  router.push('/dangnhap');
};
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const cartCount = cartItems.reduce((count, item) => count + Number(item.quantity), 0);
    // const user = useSelector((state) => state.user.currentUser); 

    // const handleLogout = () => {
    //     dispatch(logout());
    //     localStorage.removeItem('user');
    //     localStorage.removeItem('cart');
    //     window.location.href = '/';
        
    // };
    

    return (
        <header>
            <div className="header_main">
                <div className="container-fluid">
                    <div className="logo">
                        <a href="/">
                            <img src="http://localhost:3000/images/logo.png" alt="Logo" />
                        </a>
                    </div>
                    
                    <div className="menu_main">
                        <ul>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/dangky">Đăng ký</Link></li>
                            <li><Link href="/product">Watchs</Link></li>
                            <li><Link href="/dangnhap">Login</Link></li>
                            <li><Link href="/ContactUs">Contact us</Link></li>
                            <li><Link href="/sanpham">Details</Link></li>
                            {isLoggedIn && user.image ? (
                                <>
                                   <Link href={isLoggedIn ? '/info' : '/dangnhap'} >
                                        {isLoggedIn && user.image ? (
                                            <img src={`http://localhost:3000/${user.image}`} alt="Avatar" style={{width: '50px'}} />
                                        ) : (
                                            <i className="fas fa-user" />
                                        )}
                                    </Link>
                              
                                <li>
                                <button onClick={handleLogout} className="btn btn-warning text-white mt0">Đăng xuất</button>
                                </li>

                                </>
                           ) : (
                            <li>
                                <Link href={isLoggedIn ? '/info' : '/dangnhap'} >
                                    <i className="fas fa-user" />
                                </Link>
                            </li>
                        )}
                            <li className="side-menu">
                                <a href="http://localhost:3001/Giohang">
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    <span className="badge">{cartCount}</span>
                                </a>
                            </li>
                            </ul>
                            {/* <div className="modal fade" id="searchModal" aria-labelledby="exampleModalLabel" aria-hidden="true"> */}
                                <div className="modal-dialog modal-fullscreen">
                                    <div className="modal-content rounded-0">
                                        <form className="d-flex ms-4" action="/search">
                                            <input className="form-control me-2" name="keyword" placeholder="Nhập tên sản phẩm" />
                                            <button className="btn btn-outline-success" type="submit">Tìm</button>
                                        </form>
                                    </div>
                                </div>
                            {/* </div> */}
                        
                    </div>
                </div>
            </div>
        </header>
    );
}
