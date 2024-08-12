import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../axios/axios";


const IssueHandler = () => {
    const navigate = useNavigate();
    const {productId} = useParams();
    const [issues, setIssues] = useState([]); // Initialize as an empty array
    const [error, setError] = useState(null);


    useEffect( () => {

    const fetchIssues = async () => {

            try {
                const response = await axiosInstance.get(`/issue/product/${productId}`)
                setIssues(response.data);
            }catch(error) {
                console.error("Error happened:", error)
            }
        }

        fetchIssues();

    },[productId])


    return (
        <div>
            <button onClick={ () => navigate(-1)} className="go-back-button">
                Go Back
            </button>
            {error ? (
                <h2 className="error-message">{error}</h2>
            ) : issues.length === 0 ? (
                <h2 className="loading-message">Loading...</h2>
            ) : (
                <div className="issue-list"> 
                    <h1> Issues for Product {productId} </h1>
                    <ul>
                        {issues.map(issue => (
                            <li key={issue.id}>
                                <h2>{issue.title}</h2>
                                <h2>{issue.description}</h2>
                                <h2>{issue.reporteddate}</h2>
                            </li>
                        ))}

                    </ul>
                </div>
        )}
        </div>
    )
}


export default IssueHandler;