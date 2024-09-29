import React from 'react';
import DispenserItem from './DispenserItem';

const DispenserList = ({ dispensers, handleInputChange, handleSlotChange, handleSave, handleDeleteDispenser, handleGetRecommendations, recommendations }) => {
    return (
        <ul>
            {dispensers.map(dispenser => (
                <DispenserItem
                    key={dispenser._id}
                    dispenser={dispenser}
                    handleInputChange={handleInputChange}
                    handleSlotChange={handleSlotChange}
                    handleSave={handleSave}
                    handleDeleteDispenser={handleDeleteDispenser}
                    handleGetRecommendations={handleGetRecommendations}
                    recommendations={recommendations}
                />
            ))}
        </ul>
    );
};

export default DispenserList;