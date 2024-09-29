import axios from 'axios';

export const getRecommendations = async (medicineName) => {
    try {
        const response = await axios.post('http://localhost:5001/recommend', { medicineName });
        return response.data;
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        return [];
    }
};

export const fetchDispensers = async () => {
    try {
        const response = await axios.get('/api/dispensers');
        const dispensersWithSlots = response.data.map(dispenser => ({
            ...dispenser,
            slots: dispenser.slots && dispenser.slots.length >= 2 ? dispenser.slots : [
                { pillCount: 0, medicineName: '', interval: '', nextInterval: '' },
                { pillCount: 0, medicineName: '', interval: '', nextInterval: '' }
            ]
        }));
        return dispensersWithSlots;
    } catch (error) {
        throw error;
    }
};