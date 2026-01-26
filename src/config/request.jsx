import axios from "axios";

const request = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const requestGet = async () => {
    const response = await request.get("/");
    return response;
};

export default request;
