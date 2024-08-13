import React, { useState, useEffect } from "react";
import axiosInstance from "../axios/axios";
import { useParams, useNavigate } from 'react-router-dom';
import '../css/OrderHandler.css'

// Base64 encoding function
const encodeBase64 = (text) => {
    return btoa(text);
};

const OrderHandler = () => {
    const navigate = useNavigate();
    const { branchName } = useParams();
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [branchId, setBranchId] = useState(null);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const response = await axiosInstance.get("/Branch");
                const branch = response.data.find(branch => branch.name === branchName);
                if (branch) {
                    setBranchId(branch.id);
                }
            } catch (error) {
                console.error("Error happened: ", error);
                setError("Failed to fetch branches");
            }
        };

        const fetchOrders = async (branchId) => {
            try {
                const response = await axiosInstance.get(`/Order/branch/${branchId}`);
                setOrders(response.data);
            } catch (error) {
                console.error("Error happened: ", error);
                setError("Failed to fetch orders");
            }
        };

        fetchBranches();

        if (branchId) {
            fetchOrders(branchId);
        }
    }, [branchId, branchName]);

    const handleOrderClick = (orderId) => {
        navigate(`/products/${orderId}`);
    };

    return (
        <div className="order-handler">
            <button onClick={() => navigate(-1)} className="go-back-button">
                Go Back
            </button>
            {error ? (
                <h1 className="error-message">{error}</h1>
            ) : orders.length === 0 ? (
                <h1 className="loading-message">Loading...</h1>
            ) : (
                <div className="order-list">
                    <h1 className="order-header">{branchName}</h1>
                    <ul className="order-items">
                        {orders.map(order => {
                            const statusClass = order.status.toLowerCase() === 'processing' 
                                ? 'processing' 
                                : order.status.toLowerCase() === 'shipped' 
                                ? 'shipped' 
                                : 'default';
                            return (
                                <li
                                    key={order.id}
                                    className={`order-item ${statusClass}`}
                                    onClick={() => handleOrderClick(order.id)}
                                >
                                    <h2>Order: {encodeBase64(order.id.toString())}</h2>
                                    <h3>{new Date(order.orderDate).toLocaleDateString()}</h3>
                                    <p>Estimated Delivery Date: {new Date(order.deliveryDate).toLocaleDateString()}</p>
                                    <h5>${order.totalPrice.toFixed(2)}</h5>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default OrderHandler;
