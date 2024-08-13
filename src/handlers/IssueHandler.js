import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../axios/axios";
import '../css/IssueHandler.css';

const IssueHandler = () => {
    const navigate = useNavigate();
    const { productId } = useParams();
    const [issues, setIssues] = useState([]);
    const [error, setError] = useState(null);
    const [newIssue, setNewIssue] = useState({
        title: '',
        description: '',
        reportedDate: new Date().toISOString().split('T')[0] // Date only
    });
    const [showForm, setShowForm] = useState(false); // New state to toggle form visibility

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const response = await axiosInstance.get(`/issue/product/${productId}`);
                setIssues(response.data);
            } catch (error) {
                console.error("Error happened:", error);
                setError("Failed to fetch issues");
            }
        };

        fetchIssues();
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewIssue(prevIssue => ({
            ...prevIssue,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Submitting issue:", newIssue); // Log the payload
            const response = await axiosInstance.post(`/issue/product/add/${productId}`, newIssue);
            setIssues(prevIssues => [response.data, ...prevIssues]);
            setNewIssue({
                title: '',
                description: '',
                reportedDate: new Date().toISOString().split('T')[0]
            });
            setShowForm(false); // Hide the form after submission
        } catch (error) {
            console.error("Error happened:", error);
            setError("Failed to add issue");
        }
    };

    const handleDelete = async (issueId) => {
        try {
            await axiosInstance.delete(`/issue/${issueId}`);
            setIssues(prevIssues => prevIssues.filter(issue => issue.id !== issueId));
        } catch (error) {
            console.error("Error happened:", error);
            setError("Failed to delete issue");
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    };

    return (
        <div>
            <button onClick={() => navigate(-1)} className="go-back-button">
                Go Back
            </button>
            {error ? (
                <h2 className="error-message">{error}</h2>
            ) : (
                <>
                    <div className="issue-list">
                        <h1>Issues for Product {productId}</h1>
                        <ul>
                            {issues.length === 0 ? (
                                <h2 className="loading-message">No issues found</h2>
                            ) : (
                                issues.map(issue => (
                                    <li key={issue.id}>
                                        <h2 className="title">{issue.title}</h2>
                                        <p className="description">{issue.description}</p>
                                        <h2 className="reported-date">{formatDate(issue.reportedDate)}</h2>
                                        <button onClick={() => handleDelete(issue.id)} className="delete-button">
                                            Delete
                                        </button>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                    <button onClick={() => setShowForm(!showForm)} className="toggle-form-button">
                        {showForm ? 'Hide Form' : 'Add New Issue'}
                    </button>
                    {showForm && (
                        <div className="issue-form-container">
                            <div className="issue-form">
                                <h2>Add New Issue</h2>
                                <form onSubmit={handleSubmit}>
                                    <label>
                                        Title:
                                        <input
                                            type="text"
                                            name="title"
                                            value={newIssue.title}
                                            onChange={handleChange}
                                            required
                                        />
                                    </label>
                                    <label>
                                        Description:
                                        <textarea
                                            name="description"
                                            value={newIssue.description}
                                            onChange={handleChange}
                                            required
                                        />
                                    </label>
                                    <label>
                                        Reported Date:
                                        <input
                                            type="date"
                                            name="reportedDate"
                                            value={newIssue.reportedDate}
                                            onChange={handleChange}
                                            required
                                        />
                                    </label>
                                    <button type="submit">Add Issue</button>
                                </form>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default IssueHandler;
