'use client';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../redux/slices/cartSlice';
import { useMemo } from 'react';
import Link from 'next/link';

export default function Cart() {
    const cartItems = useSelector((state) => state.cart?.items) || [];
    const dispatch = useDispatch();

    const total = useMemo(() => cartItems.reduce((total, item) => total + item.price * item.quantity, 0), [cartItems]);

    const handleQuantityChange = (itemId, quantity) => {
        if (quantity > 0) {
            dispatch(updateCartItemQuantity({ _id: itemId, quantity }));
        } else {
            dispatch(removeFromCart(itemId));
        }
    };

    const handleRemoveItem = (itemId) => {
        dispatch(removeFromCart(itemId));
    };

    return (
        <>
            <div className="cart-box-main" style={{ padding: "70px 0px" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="table-main table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr style={{ color: "#ffffff", fontWeight: "700", fontSize: "20px" }}>
                                            <th>Images</th>
                                            <th>Product Name</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item) => (
                                            <tr key={item._id}>
                                                <td className="thumbnail-img">
                                                    <a href="#">
                                                        <img className="img-fluid" style={{ width: "100px" }} src={`http://localhost:3000/${item.img}`} alt={item.name} />
                                                    </a>
                                                </td>
                                                <td className="name-pr">
                                                    <a href="#" style={{ color: "#ffffff" }}>
                                                        {item.name}
                                                    </a>
                                                </td>
                                                <td className="price-pr">
                                                    <p style={{ color: "#ffffff" }}>{item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                                </td>
                                                <td className="quantity-box">
                                                    <input 
                                                        type="number" 
                                                        size="4" 
                                                        value={item.quantity} 
                                                        min="1" 
                                                        step="1" 
                                                        className="c-input-text qty text"
                                                        onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                                                    />
                                                </td>
                                                <td className="total-pr">
                                                    <p style={{ color: "#ffffff" }}>{(item.price * item.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                                </td>
                                                <td className="remove-pr">
                                                    <button className="btn btn-danger" onClick={() => handleRemoveItem(item._id)} style={{ color: "#ffffff" }}>
                                                        Xóa
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="row my-5">
                        <div className="col-lg-6 col-sm-6">
                            <div className="coupon-box">
                                <div className="input-group input-group-sm">
                                    <input className="form-control" placeholder="Enter your coupon code" aria-label="Coupon code" type="text" />
                                    <div className="input-group-append">
                                        <button className="Apply" type="button">Apply Coupon</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-sm-6">
                            <div className="update-box">
                                <input value="Buy Product" type="submit" />
                            </div>
                        </div>
                        
                    </div>

                    <div className="row my-5">
                        <div className="col-lg-8 col-sm-12"></div>
                        <div className="col-lg-4 col-sm-12">
                            <div className="order-box">
                                <h3 style={{ color: "#ffffff" }}>Order summary</h3>
                                <div className="d-flex">
                                    <h4 style={{ color: "#ffffff" }}>Sub Total</h4>
                                    <div className="ml-auto font-weight-bold" style={{ color: "#ffffff" }}>{total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                </div>
                                <div className="d-flex">
                                    <h4 style={{ color: "#ffffff" }}>Shipping Cost</h4>
                                    <div className="ml-auto font-weight-bold" style={{ color: "#ffffff" }}>Free</div>
                                </div>
                                <hr />
                                <div className="d-flex gr-total">
                                    <h5 style={{ color: "#ffffff" }}>Grand Total</h5>
                                    <div className="ml-auto h5" style={{ color: "#ffffff" }}>{total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div className="col-12 d-flex shopping-box">
                            <a href="#" className="ml-auto btn hvr-hover">Buy Product</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
