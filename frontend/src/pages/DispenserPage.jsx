
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UpdateDispenser } from '../services/api.js';

const DispenserPage = () => {
    const [dispensers, setDispensers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDispensers = async () => {
            try {
                const response = await axios.get('/api/dispensers');
                setDispensers(response.data);
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

    const handleSave = async (id) => {
        const dispenserToUpdate = dispensers.find(d => d._id === id);
        
        const { _id, ...updatedData } = dispenserToUpdate;

        try {
            await UpdateDispenser(id, updatedData);
            console.log('Dispenser updated successfully');
        } catch (error) {
            console.error('Error updating dispenser:', error);
        }
    };

    return (
        <div>
            <h1>Dispensers</h1>
            {error && <p>Error fetching dispensers: {error.message}</p>}
            <ul>
                {dispensers.map(dispenser => (
                    <li key={dispenser._id}>
                        <h2>{dispenser.name} - {dispenser.slots.length} Slots</h2>
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
                            <label>
                                Prescription ID:
                                <input
                                    type="text"
                                    value={dispenser.prescriptionId}
                                    onChange={(e) => handleInputChange(dispenser._id, 'prescriptionId', e.target.value)}
                                />
                            </label>
                            <h3>Slots:</h3>
                            {dispenser.slots.map((slot, index) => (
                                <div key={index}>
                                    <label>
                                        Slot {index + 1} Pill Count:
                                        <input
                                            type="number"
                                            value={slot.pillCount}
                                            onChange={(e) => {
                                                const newSlots = [...dispenser.slots];
                                                newSlots[index].pillCount = e.target.value;
                                                handleInputChange(dispenser._id, 'slots', newSlots);
                                            }}
                                        />
                                    </label>
                                </div>
                            ))}
                            <button onClick={() => handleSave(dispenser._id)}>Save</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DispenserPage;
