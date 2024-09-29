import React from 'react';
import SlotItem from './SlotItem';

const DispenserItem = ({ dispenser, handleInputChange, handleSlotChange, handleSave, handleDeleteDispenser, handleGetRecommendations, recommendations }) => {
    return (
        <li>
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
                    <SlotItem
                        key={index}
                        slot={slot}
                        index={index}
                        handleSlotChange={handleSlotChange}
                        dispenserId={dispenser._id}
                        handleGetRecommendations={handleGetRecommendations}
                        recommendations={recommendations}
                    />
                ))}
                <button onClick={() => handleSave(dispenser._id)}>Save</button>
                <button onClick={() => handleDeleteDispenser(dispenser._id)}>Delete</button>
            </div>
        </li>
    );
};

export default DispenserItem;