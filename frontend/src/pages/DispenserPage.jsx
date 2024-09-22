import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { updateDispenser, createDispenser, deleteDispenser } from '../services/api.js';

const getRecommendations = async (medicineName) => {
    try {
        const response = await axios.post('http://localhost:5001/recommend', { medicineName });
        return response.data;
    } catch (error) {
        console.error('Error fetching recommendations:', error);
        return [];
    }
};

const DispenserPage = () => {
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
        const fetchDispensers = async () => {
            try {
                const response = await axios.get('/api/dispensers');
                const dispensersWithSlots = response.data.map(dispenser => ({
                    ...dispenser,
                    slots: dispenser.slots && dispenser.slots.length >= 2 ? dispenser.slots : [
                        { pillCount: 0, medicineName: '', interval: '', nextInterval: '' },
                        { pillCount: 0, medicineName: '', interval: '', nextInterval: '' }
                    ]
                }));
                setDispensers(dispensersWithSlots);
            } catch (err) {
                setError(err);
            }
        };

        fetchDispensers();
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
            setNextInterval(dispenserId, slotIndex, value);
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
            setNextInterval('new', slotIndex, value);
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

    const setNextInterval = (dispenserId, slotIndex, interval) => {
        const now = new Date();
        let nextTime = new Date(now);

        switch (interval) {
            case '15min':
                nextTime.setMinutes(now.getMinutes() + 15);
                break;
            case '30min':
                nextTime.setMinutes(now.getMinutes() + 30);
                break;
            case '1hr':
                nextTime.setHours(now.getHours() + 1);
                break;
            case '4hrs':
                nextTime.setHours(now.getHours() + 4);
                break;
            case '6hrs':
                nextTime.setHours(now.getHours() + 6);
                break;
            case '12hrs':
                nextTime.setHours(now.getHours() + 12);
                break;
            case '1day':
                nextTime.setDate(now.getDate() + 1);
                break;
            default:
                nextTime = null;
        }

        setDispensers(prevDispensers =>
            prevDispensers.map(dispenser =>
                dispenser._id === dispenserId
                    ? {
                        ...dispenser,
                        slots: dispenser.slots.map((slot, index) =>
                            index === slotIndex ? { ...slot, nextInterval: nextTime } : slot
                        )
                    }
                    : dispenser
            )
        );

        if (nextTime) {
            const timeout = nextTime - now;
            setTimeout(() => {
                alert(`Time to take your medicine for slot ${slotIndex + 1}`);
            }, timeout);
        }
    };

    return (
        <div>
            <h1>Dispensers</h1>
            {error && <p>Error: {error.message}</p>}
            <ul>
                {dispensers.map(dispenser => (
                    <li key={dispenser._id}>
                        <h2>{dispenser.name} - {dispenser.slots ? dispenser.slots.length : 0} Slots</h2>
                        <div>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    value={dispenser.name}
                                    onChange={(e) => handleInputChange(dispenser._id, 'name', e.target.value)}
                                />
                            </label>
                            <label>
                                Status:
                                <input
                                    type="text"
                                    value={dispenser.status}
                                    onChange={(e) => handleInputChange(dispenser._id, 'status', e.target.value)}
                                />
                            </label>
                            <h3>Slots:</h3>
                            {dispenser.slots && dispenser.slots.map((slot, index) => (
                                <div key={index}>
                                    <label>
                                        Slot {index + 1} Pill Count:
                                        <input
                                            type="number"
                                            value={slot.pillCount}
                                            onChange={(e) => handleSlotChange(dispenser._id, index, 'pillCount', e.target.value)}
                                        />
                                    </label>
                                    <label>
                                        Slot {index + 1} Medicine Name:
                                        <input
                                            type="text"
                                            value={slot.medicineName}
                                            onChange={(e) => handleSlotChange(dispenser._id, index, 'medicineName', e.target.value)}
                                        />
                                    </label>
                                    <label>
                                        Slot {index + 1} Interval:
                                        <select
                                            value={slot.interval}
                                            onChange={(e) => handleSlotChange(dispenser._id, index, 'interval', e.target.value)}
                                        >
                                            <option value="">Select Interval</option>
                                            <option value="15min">15 min</option>
                                            <option value="30min">30 min</option>
                                            <option value="1hr">1 hr</option>
                                            <option value="4hrs">4 hrs</option>
                                            <option value="6hrs">6 hrs</option>
                                            <option value="12hrs">12 hrs</option>
                                            <option value="1day">1 day</option>
                                        </select>
                                    </label>
                                    {slot.nextInterval && (
                                        <p>Next interval: {new Date(slot.nextInterval).toLocaleString()}</p>
                                    )}
                                    <button onClick={() => handleGetRecommendations(slot.medicineName, `${dispenser._id}-${index}`)}>Get Recommendations</button>
                                    {Array.isArray(recommendations[`${dispenser._id}-${index}`]) && (
                                        <ul>
                                            {recommendations[`${dispenser._id}-${index}`].map((rec, recIndex) => (
                                                <li key={recIndex}>{rec}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                            <button onClick={() => handleSave(dispenser._id)}>Save</button>
                            <button onClick={() => handleDeleteDispenser(dispenser._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            <h2>Create New Dispenser</h2>
            <div>
                <label>
                    Name:
                    <input
                        type="text"
                        value={newDispenser.name}
                        onChange={(e) => handleNewDispenserChange('name', e.target.value)}
                    />
                </label>
                <label>
                    Status:
                    <input
                        type="text"
                        value={newDispenser.status}
                        onChange={(e) => handleNewDispenserChange('status', e.target.value)}
                    />
                </label>
                <h3>Slots:</h3>
                {newDispenser.slots.map((slot, index) => (
                    <div key={index}>
                        <label>
                            Slot {index + 1} Pill Count:
                            <input
                                type="number"
                                value={slot.pillCount}
                                onChange={(e) => handleNewSlotChange(index, 'pillCount', e.target.value)}
                            />
                        </label>
                        <label>
                            Slot {index + 1} Medicine Name:
                            <input
                                type="text"
                                value={slot.medicineName}
                                onChange={(e) => handleNewSlotChange(index, 'medicineName', e.target.value)}
                            />
                        </label>
                        <label>
                            Slot {index + 1} Interval:
                            <select
                                value={slot.interval}
                                onChange={(e) => handleNewSlotChange(index, 'interval', e.target.value)}
                            >
                                <option value="">Select Interval</option>
                                <option value="15min">15 min</option>
                                <option value="30min">30 min</option>
                                <option value="1hr">1 hr</option>
                                <option value="4hrs">4 hrs</option>
                                <option value="6hrs">6 hrs</option>
                                <option value="12hrs">12 hrs</option>
                                <option value="1day">1 day</option>
                            </select>
                        </label>
                        {slot.nextInterval && (
                            <p>Next interval: {new Date(slot.nextInterval).toLocaleString()}</p>
                        )}
                    </div>
                ))}
                <button onClick={handleCreateDispenser}>Create Dispenser</button>
            </div>
        </div>
    );
};

export default DispenserPage;