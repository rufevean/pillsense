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

export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/users`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch users:', error);
        throw error;
    }
};

export const createUser = async (newUser) => {
    try {
        const response = await axios.post(`${API_URL}/users`, newUser);
        return response.data;
    } catch (error) {
        console.error('Failed to create user:', error);
        throw error;
    }
};

export const getPrescriptions = async () => {
    try {
        const response = await axios.get(`${API_URL}/prescriptions`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch prescriptions:', error);
        throw error;
    }
};

export const createPrescription = async (newPrescription) => {
    try {
        const response = await axios.post(`${API_URL}/prescriptions`, newPrescription);
        return response.data;
    } catch (error) {
        console.error('Failed to create prescription:', error);
        throw error;
    }
};

export const getDispensers = async () => {
    try {
        const response = await axios.get(`${API_URL}/dispensers`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch dispensers:', error);
        throw error;
    }
};

export const createDispenser = async (newDispenser) => {
    try {
        const response = await axios.post(`${API_URL}/dispensers`, newDispenser);
        return response.data;
    } catch (error) {
        console.error('Failed to create dispenser:', error);
        throw error;
    }
};

export const updateDispenser = async (id, updatedDispenser) => {
    try {
        const response = await axios.put(`${API_URL}/dispensers/${id}`, updatedDispenser);
        return response.data;
    } catch (error) {
        console.error('Failed to update dispenser:', error);
        throw error;
    }
};

export const deleteDispenser = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/dispensers/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to delete dispenser:', error);
        throw error;
    }
};