"use client";
import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addToCart } from '../redux/slices/cartSlice';


function Hot({ data }) {
    const [quantity] = useState(1);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    return (
        <>
            {data.map((product) => {
                const {  id, name, image, price } = product;
           
                return (
                    <div className="col-md-3" key={id}>
                    <div className="border_main">
                    <div className="image_4"><img style={{height: '200px'}} src={`http://localhost:3000/images/${image}`} alt={name}/></div>
                        <div className="card-body text-center">
                            <h5 className="card-title text-success">{name}</h5>
                            <p className="text-danger m-0">
                                <b>Giá: {price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</b>
                            </p>
                            <div className="text-center">
                                <a href={`/productTest/${id}`}  className="btn btn-warning text-white mt-2">Xem chi tiết</a>
                                <button className="btn btn-primary my-3" onClick={() =>dispatch( addToCart({ item: product, quantity: quantity }))}>
                                    Thêm vào giỏ hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                );
            })}
        </>
    );
}

export default Hot;