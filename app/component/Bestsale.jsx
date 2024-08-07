import React from 'react';

function Bestsale({ data }) {
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
                                <b>Giá: {price}</b>
                            </p>
                            <div className="text-center">
                                
                                    <a href={`/productTest/${id}`}  className="btn btn-warning text-white mt-2">Xem chi tiết</a>
                                
                            </div>
                        </div>
                    </div>
                </div>
                );
            })}
        </>
    );
}

export default Bestsale;