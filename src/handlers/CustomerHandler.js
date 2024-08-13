import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../axios/axios";
import '../css/CustomerHandler.css';

const CustomerHandler = () => {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null); // Start with null
    const [orders, setOrders] = useState([]); // Initialize as empty array
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await axiosInstance.get(`/customer/${id}`);
                setCustomer(response.data);
            } catch (error) {
                console.error("Error fetching customer:", error);
            }
        };

        const fetchOrders = async () => {
            try {
                const response = await axiosInstance.get(`/order/customer/${id}`);
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchCustomer();
        fetchOrders();
    }, [id]);

    // Ensure customer is not null before accessing its properties
    if (!customer) {
        return <h2>No customer data available.</h2>;
    }

    return (
        <div>
            <button onClick={ () => navigate(-1)} className="go-back-button">
                Go Back 
            </button>
        <div className="container">
            <div className="icon-container">
                <img className="icon" src="/customer.jpg" alt="Customer" width={250} />
                <div className="details">
                    <h2>Name: {customer.name}</h2>
                    <h2>Address: {customer.address}</h2>
                    <h2>City: {customer.city}</h2>
                    <h2>Phone: {customer.phone}</h2>
                </div>
            </div>
            <div className="c-orders">
                <h2>Orders</h2>
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <ul>
                        {orders.map(order => (
                            <li key={order.id}>
                                <p>Order ID: {order.id}</p>
                                <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                                <p>Status: {order.status}</p>
                                <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
        </div>
        
    );
};

export default CustomerHandler;
