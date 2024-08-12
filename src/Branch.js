import React from "react";
import axiosInstance from "./axios/axios";

const BranchHandler = async () => {
    
    try {
        const response = await axiosInstance.get("/Branch")
        console.log(response.data);
    }
    catch(error) {
        console.error("Error happened: ", error);
    }

}

export default BranchHandler;