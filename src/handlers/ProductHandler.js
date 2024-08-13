import React, { useEffect, useState } from "react";
import axiosInstance from "../axios/axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../css/ProductHandler.css';

const ProductHandler = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const { orderId } = useParams();
    const navigate = useNavigate();

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
        <div className="product-handler">
            <button onClick={() => navigate(-1)} className="go-back-button">
                Go Back
            </button>
            {error ? (
                <h2 className="error-message">{error}</h2>
            ) : products.length === 0 ? (
                <h2 className="loading-message">Loading...</h2>
            ) : (
                <div className="product-list">
                    <h1>Basket</h1>
                    <ul>
                        {products.map(product => (
                            <li key={product.id} className="product-item">
                                <h2>{product.name}</h2>
                                <p>Price: ${product.price.toFixed(2)}</p>
                                <p>Description: {product.description}</p>
                                <p className="note">More details available <Link to={`/issues/${product.id}`}>here</Link>.</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProductHandler;
