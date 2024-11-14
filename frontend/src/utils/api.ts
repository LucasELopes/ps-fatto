import axios from "axios";

export const api = axios.create({
    // baseURL: `https://backend-weathered-moon-3247.fly.dev/api/`
    baseURL: `http://127.0.0.1:8000/api`
    
});