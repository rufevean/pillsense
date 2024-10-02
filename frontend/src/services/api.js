import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Set up Axios interceptor to include token in headers
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getUsers = () => axios.get(`${API_URL}/users`);
export const createUser = (newUser) => axios.post(`${API_URL}/users`, newUser);

export const getPrescriptions = () => axios.get(`${API_URL}/prescriptions`);
export const createPrescription = (newPrescription) => axios.post(`${API_URL}/prescriptions`, newPrescription);

export const getDispensers = () => axios.get(`${API_URL}/dispensers`);
export const createDispenser = (newDispenser) => axios.post(`${API_URL}/dispensers`, newDispenser);
export const updateDispenser = (id, updatedDispenser) => axios.put(`${API_URL}/dispensers/${id}`, updatedDispenser);
export const deleteDispenser = (id) => axios.delete(`${API_URL}/dispensers/${id}`);
