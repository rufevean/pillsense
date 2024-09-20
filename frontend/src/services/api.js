import axios from 'axios';

const API_URL = 'http://localhost:5000/api';


export const getUsers = () => axios.get(`${API_URL}/users`);
export const createUser = (newUser) => axios.post(`${API_URL}/users`, newUser);


export const getPrescriptions = () => axios.get(`${API_URL}/prescriptions`);
export const createPrescription = (newPrescription) => axios.post(`${API_URL}/prescriptions`, newPrescription);

export const getDispensers = () => axios.get(`${API_URL}/dispensers`);
export const createDispenser = (newDispenser) => axios.post(`${API_URL}/dispensers`, newDispenser);
export const UpdateDispenser = (id, updatedDispenser) => axios.put(`${API_URL}/dispensers/${id}`, updatedDispenser); 



