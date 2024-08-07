import React from 'react';

function CategoryProducts({ categoryId, data }) {
    return (
        <div className="background_bg">
            <div className="watchs_section layout_padding">
                <div className="container">
                    <div className="about_section_3">
                        <div className="row">
                            <div className="watchs_taital">
                                <h1 style={{ color: 'white', textAlign: 'center' }}>{categoryId} Products</h1><br />
                            </div>
                            {data.map((product) => {
                                const { id, name, img, price,categoryId } = product;

                                return (
                                    <div className="col-md-3" key={id}>
                                        <div className="border_main">
                                            <div className="image_4">
                                                <img style={{ height: '200px' }} src={`http://localhost:3000/${img}`} alt={name} />
                                            </div>
                                            <div className="card-body text-center">
                                                <h5 className="card-title text-success">{name}</h5>
                                                <p className="text-danger m-0">
                                                    <b>Giá: {price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</b>
                                                </p>
                                                <div className="text-center">
                                                    <a href={`/productTest/${id}`} className="btn btn-warning text-white mt-2">
                                                        Xem chi tiết
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryProducts;
