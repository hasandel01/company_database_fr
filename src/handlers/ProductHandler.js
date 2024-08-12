import React, { useEffect, useState } from "react";
import axiosInstance from "../axios/axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const ProductHandler = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const { orderId } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get(`/product/order/${orderId}`);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Failed to fetch products");
            }
        };

        fetchProducts();
    }, [orderId]);

    return (
        <div>
            <button onClick={ () => navigate(-1)} className="go-back-button">
                Go Back 
            </button>
            {error ? (
                <h2 className="error-message">{error}</h2>
            ) : products.length === 0 ? (
                <h2 className="loading-message">Loading...</h2>
            ) : (
                <div className="product-list">
                    <h1>Products for Order {orderId}</h1>
                    <ul>
                        {products.map(product => (
                            <li key={product.id}>
                                <h2>{product.name}</h2>
                                <p>Price: ${product.price.toFixed(2)}</p>
                                <p>Description: {product.description}</p>
                                <hr></hr>
                                <Link to={`/issues/${product.id}`}>List issues with the product</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProductHandler;
