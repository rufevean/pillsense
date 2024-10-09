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
        console.log('Calling getUsers API');
        const response = await axios.get(`${API_URL}/users`);
        console.log('getUsers response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch users:', error);
        throw error;
    }
};

export const createUser = async (newUser) => {
    try {
        console.log('Calling createUser API');
        const response = await axios.post(`${API_URL}/users`, newUser);
        console.log('createUser response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to create user:', error);
        throw error;
    }
};

export const getPrescriptions = async () => {
    try {
        console.log('Calling getPrescriptions API');
        const response = await axios.get(`${API_URL}/prescriptions`);
        console.log('getPrescriptions response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch prescriptions:', error);
        throw error;
    }
};

export const createPrescription = async (newPrescription) => {
    try {
        console.log('Calling createPrescription API');
        const response = await axios.post(`${API_URL}/prescriptions`, newPrescription);
        console.log('createPrescription response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to create prescription:', error);
        throw error;
    }
};

export const getDispensers = async () => {
    try {
        console.log('Calling getDispensers API');
        const response = await axios.get(`${API_URL}/dispensers`);
        console.log('getDispensers response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch dispensers:', error);
        throw error;
    }
};

export const createDispenser = async (newDispenser) => {
    try {
        console.log('Calling createDispenser API');
        const response = await axios.post(`${API_URL}/dispensers`, newDispenser);
        console.log('createDispenser response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to create dispenser:', error);
        throw error;
    }
};

export const updateDispenser = async (id, updatedDispenser) => {
    try {
        console.log('Calling updateDispenser API');
        const response = await axios.put(`${API_URL}/dispensers/${id}`, updatedDispenser);
        console.log('updateDispenser response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to update dispenser:', error);
        throw error;
    }
};

export const deleteDispenser = async (id) => {
    try {
        console.log('Calling deleteDispenser API');
        const response = await axios.delete(`${API_URL}/dispensers/${id}`);
        console.log('deleteDispenser response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to delete dispenser:', error);
        throw error;
    }
};