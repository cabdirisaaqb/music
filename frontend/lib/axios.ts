import axios from "axios";

const  baseURL = process.env.NEXT_PUBLIC_API_URL;

export const Axios = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }
})
    
   

