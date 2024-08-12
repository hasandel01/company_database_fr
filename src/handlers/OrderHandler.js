import React, { useState, useEffect } from "react";
import axiosInstance from "../axios/axios";
import CryptoJS from 'crypto-js';
import { Link } from 'react-router-dom';

const encryptionKey = "6c8e9f6b7a7a3d8b0e9a5b9c1f7a4b8e9c5d7e3f8c1b4d7e3b9f0a7e4b5c6d7a";

const encrypt = (text) => {
    return CryptoJS.AES.encrypt(text, encryptionKey).toString();
};

const OrderHandler = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [downtownBranchId, setDowntownBranchId] = useState(null);

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const response = await axiosInstance.get("/Branch");
                const downtownBranch = response.data.find(branch => branch.name === "Downtown Branch");
                if (downtownBranch) {
                    setDowntownBranchId(downtownBranch.id);
                }
            } catch (error) {
                console.error("Error happened: ", error);
                setError("Failed to fetch branches");
            }
        };
    
        const fetchOrders = async (branchId) => {
            try {
                const response = await axiosInstance.get(`/Order/branch/${branchId}`);
                console.log(response.data); // Check the structure here
                setOrders(response.data); // Set orders state with response data
            } catch (error) {
                console.error("Error happened: ", error);
                setError("Failed to fetch orders");
            }
        };
    
        fetchBranches();
        
        if (downtownBranchId) {
            fetchOrders(downtownBranchId);
        }
    }, [downtownBranchId]);
    

    return (
        <div className="order-handler">
            {error ? (
                <h1 className="error-message">{error}</h1>
            ) : orders.length === 0 ? (
                <h1 className="loading-message">Loading...</h1>
            ) : (
                <div className="order-list">
                    <h1 className="order-header"> Downtown </h1>
                    <ul className="order-items">
                        {orders.map(order => (
                            <li key={order.id} className="order-item">
                                <h2>Order ID: {encrypt(order.id.toString())}</h2>
                                <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                                <p>Delivery Date: {new Date(order.deliveryDate).toLocaleDateString()}</p>
                                <p>Status: {order.status}</p>
                                <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
                                <Link to={`/customer/${order.customerId}`}>Customer ID: {order.customerId}</Link>
                                <hr></hr>
                                <Link to={`/products/${order.id}`}>View Products</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default OrderHandler;
