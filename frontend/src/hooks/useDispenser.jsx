import { useState, useEffect } from 'react';
import { updateDispenser, createDispenser, deleteDispenser } from '../services/api.js';
import { getRecommendations, fetchDispensers } from '../utils/apiHelpers';
import { setNextInterval } from '../utils/intervalHelpers';

const useDispenser = () => {
    const [dispensers, setDispensers] = useState([]);
    const [error, setError] = useState(null);
    const [newDispenser, setNewDispenser] = useState({
        name: '',
        status: '',
        slots: [
            { pillCount: 0, medicineName: '', interval: '', nextInterval: '' },
            { pillCount: 0, medicineName: '', interval: '', nextInterval: '' }
        ]
    });
    const [recommendations, setRecommendations] = useState({});
    const [nextIntervals, setNextIntervals] = useState({});

    useEffect(() => {
        const loadDispensers = async () => {
            try {
                const dispensersWithSlots = await fetchDispensers();
                setDispensers(dispensersWithSlots);
            } catch (err) {
                setError(err);
            }
        };

        loadDispensers();
    }, []);

    const handleInputChange = (id, field, value) => {
        setDispensers(prevDispensers =>
            prevDispensers.map(dispenser =>
                dispenser._id === id ? { ...dispenser, [field]: value } : dispenser
            )
        );
    };

    const handleSlotChange = (dispenserId, slotIndex, field, value) => {
        setDispensers(prevDispensers =>
            prevDispensers.map(dispenser =>
                dispenser._id === dispenserId
                    ? {
                        ...dispenser,
                        slots: dispenser.slots ? dispenser.slots.map((slot, index) =>
                            index === slotIndex ? { ...slot, [field]: value } : slot
                        ) : [
                            { pillCount: 0, medicineName: '', interval: '', nextInterval: '' },
                            { pillCount: 0, medicineName: '', interval: '', nextInterval: '' }
                        ]
                    }
                    : dispenser
            )
        );
        if (field === 'interval') {
            setNextInterval(dispenserId, slotIndex, value, setDispensers);
        }
    };

    const handleNewDispenserChange = (field, value) => {
        setNewDispenser(prevNewDispenser => ({
            ...prevNewDispenser,
            [field]: value
        }));
    };

    const handleNewSlotChange = (slotIndex, field, value) => {
        setNewDispenser(prevNewDispenser => ({
            ...prevNewDispenser,
            slots: prevNewDispenser.slots.map((slot, index) =>
                index === slotIndex ? { ...slot, [field]: value } : slot
            )
        }));
        if (field === 'interval') {
            setNextInterval('new', slotIndex, value, setDispensers);
        }
    };

    const handleSave = async (id) => {
        const dispenserToUpdate = dispensers.find(d => d._id === id);

        const { _id, ...updatedData } = dispenserToUpdate;

        try {
            await updateDispenser(id, updatedData);
            console.log('Dispenser updated successfully');
        } catch (error) {
            console.error('Error updating dispenser:', error);
        }
    };

    const handleCreateDispenser = async () => {
        try {
            const response = await createDispenser(newDispenser);
            const createdDispenser = {
                ...response.data,
                slots: response.data.slots && response.data.slots.length >= 2 ? response.data.slots : [
                    { pillCount: 0, medicineName: '', interval: '', nextInterval: '' },
                    { pillCount: 0, medicineName: '', interval: '', nextInterval: '' }
                ]
            };
            setDispensers([...dispensers, createdDispenser]);
            setNewDispenser({
                name: '',
                status: '',
                slots: [
                    { pillCount: 0, medicineName: '', interval: '', nextInterval: '' },
                    { pillCount: 0, medicineName: '', interval: '', nextInterval: '' }
                ]
            });
            console.log('Dispenser created successfully');
        } catch (error) {
            console.error('Error creating dispenser:', error);
            setError(error);
        }
    };

    const handleDeleteDispenser = async (id) => {
        try {
            await deleteDispenser(id);
            setDispensers(dispensers.filter(dispenser => dispenser._id !== id));
            console.log('Dispenser deleted successfully');
        } catch (error) {
            console.error('Error deleting dispenser:', error);
            setError(error);
        }
    };

    const handleGetRecommendations = async (medicineName, slotIndex) => {
        const recs = await getRecommendations(medicineName);
        const recsString = Array.isArray(recs) ? recs.join(', ') : String(recs);  // Ensure recs is a string
        alert(`Recommendations for ${medicineName} (slot ${slotIndex}): ${recsString}`);  // Show recommendations in an alert
        setRecommendations(prevRecs => ({
            ...prevRecs,
            [slotIndex]: Array.isArray(recs) ? recs : []  // Ensure recs is an array
        }));
    };

    return {
        dispensers,
        error,
        newDispenser,
        recommendations,
        handleInputChange,
        handleSlotChange,
        handleNewDispenserChange,
        handleNewSlotChange,
        handleSave,
        handleCreateDispenser,
        handleDeleteDispenser,
        handleGetRecommendations
    };
};

export default useDispenser;