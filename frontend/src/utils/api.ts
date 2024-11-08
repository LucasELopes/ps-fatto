import axios from "axios";

export const api = axios.create({
    baseURL: `https://backend-weathered-moon-3247.fly.dev/api/`
});