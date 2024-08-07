'use client';

import { useState, useEffect } from 'react';
import ProductCard from '../component/ProductCard';

export default function Product() {
    const [products, setProducts] = useState([]);
    const [sortOption, setSortOption] = useState('default');
    const [filterOption, setFilterOption] = useState('all');
    const [originalProducts, setOriginalProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch('http://localhost:3000/products');
                const newProducts = await res.json();
                setProducts(newProducts);
                setOriginalProducts(newProducts); // Lưu lại danh sách sản phẩm gốc
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchProducts();
    }, []);

    const handleSort = (products) => {
        if (sortOption === 'default') {
            return originalProducts;
        }
        return [...products].sort((a, b) => {
            const priceA = parseFloat(a.price);
            const priceB = parseFloat(b.price);
            if (sortOption === 'asc') {
                return priceA - priceB;
            } else {
                return priceB - priceA;
            }
        });
    };

    const handleFilter = (products) => {
        if (filterOption === 'all') {
            return products;
        } else if (filterOption === 'hot') {
            return products.filter(product => product.hot === 1);
        } else if (filterOption === 'bestseller') {
            return products.filter(product => product.bestseller === 1);
        } else {
            return products.filter(product => product.categoryId === filterOption);
        }
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterOption(e.target.value);
    };

    return (
        <>
        
        <div className="container my-3">
            <div>
                <div className="d-flex justify-content-between mx-1">
                    <div className="p-1 w-auto">
                        <h5 className="text-success">DANH SÁCH SẢN PHẨM</h5>
                    </div>
                    <div className="d-flex">
                        <select className="form-select w-auto mx-2" onChange={handleFilterChange}>
                            <option value="all">Tất cả</option>
                            <option value="1">Danh mục 1</option>
                            <option value="2">Danh mục 2</option>
                            <option value="3">Danh mục 3</option>
                            <option value="hot">Sản phẩm hot</option>
                            <option value="bestseller">Sản phẩm bán chạy</option>
                            {/* Thêm các tùy chọn danh mục khác tại đây */}
                        </select>
                        <select className="form-select w-auto" onChange={handleSortChange}>
                            <option value="default">Trở lại sắp xếp ban đầu</option>
                            <option value="asc">Giá tăng dần</option>
                            <option value="desc">Giá giảm dần</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <ProductCard data={handleSort(handleFilter(products))} />
                </div>
            </div>
        </div>
        </>
    );
}
