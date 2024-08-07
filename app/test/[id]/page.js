"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from 'swr';

export default function DetailPage({ params }) {
    const [Products, setProducts] = useState([]);
    const router = useRouter();
    const fetcher = (...args) => fetch(...args).then((res) => res.json());
    const { data, error, isLoading } = useSWR(
        `https://localhost:3000/products/${params.id}`,
        fetcher
    );
    if(error) return <div>Failed to load</div>
    if(isLoading) return <div>Loading...</div>
    return (
        <>
            Tên sản phẩm: {data.name}
            <br/>
            Giá: {data.price}
        </>
    );
}