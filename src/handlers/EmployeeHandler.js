import React, { useState, useEffect } from "react";
import axiosInstance from "../axios/axios";
import { useParams, useNavigate } from 'react-router-dom';
import '../css/EmployeeHandler.css';

const EmployeeHandler = () => {
    const { branchId } = useParams();
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        position: '',
        email: ''
    });

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axiosInstance.get(`/Employee/branch/${branchId}`);
                setEmployees(response.data);
            } catch (error) {
                console.error("Error fetching employees:", error);
                setError("Failed to fetch employees");
            }
        };

        fetchEmployees();
    }, [branchId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddEmployee = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post(`/Employee/branch/${branchId}`, newEmployee);
            // Clear form
            setNewEmployee({
                name: '',
                position: '',
                email: ''
            });
            // Fetch employees again
            const response = await axiosInstance.get(`/Employee/branch/${branchId}`);
            setEmployees(response.data);
        } catch (error) {
            console.error("Error adding employee:", error);
            setError("Failed to add employee");
        }
    };

    return (
        <div className="employee-handler">
            <button onClick={() => navigate(-1)} className="go-back-button">
                Go Back
            </button>
            {error ? (
                <h1 className="error-message">{error}</h1>
            ) : (
                <div>
                    <div className="employee-list">
                        <h1>Employees</h1>
                        {employees.length === 0 ? (
                            <h1 className="loading-message">Loading...</h1>
                        ) : (
                            <ul>
                                {employees.map(employee => (
                                    <li key={employee.id}>
                                        <h2>{employee.name}</h2>
                                        <p>Position: {employee.position}</p>
                                        <p>Email: {employee.email}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="employee-form">
                        <h2>Add New Employee</h2>
                        <form onSubmit={handleAddEmployee}>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={newEmployee.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label>
                                Position:
                                <input
                                    type="text"
                                    name="position"
                                    value={newEmployee.position}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={newEmployee.email}
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <button type="submit">Add Employee</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeHandler;
