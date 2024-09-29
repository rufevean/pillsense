import React from 'react';
import SlotItem from './SlotItem';

const DispenserForm = ({ newDispenser, handleNewDispenserChange, handleNewSlotChange, handleCreateDispenser, recommendations }) => {
    return (
        <div>
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
                    <SlotItem
                        key={index}
                        slot={slot}
                        index={index}
                        handleSlotChange={handleNewSlotChange}
                        dispenserId="new"
                        handleGetRecommendations={() => {}}
                        recommendations={recommendations}
                    />
                ))}
                <button onClick={handleCreateDispenser}>Create Dispenser</button>
            </div>
        </div>
    );
};

export default DispenserForm;