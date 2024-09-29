import React from 'react';
import DispenserList from '../components/DispenserList';
import DispenserForm from '../components/DispenserForm';
import useDispenser from '../hooks/useDispenser';

const DispenserPage = () => {
    const {
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
    } = useDispenser();

    return (
        <div>
            <h1>Dispensers</h1>
            {error && <p>Error: {error.message}</p>}
            <DispenserList
                dispensers={dispensers}
                handleInputChange={handleInputChange}
                handleSlotChange={handleSlotChange}
                handleSave={handleSave}
                handleDeleteDispenser={handleDeleteDispenser}
                handleGetRecommendations={handleGetRecommendations}
                recommendations={recommendations}
            />
            <DispenserForm
                newDispenser={newDispenser}
                handleNewDispenserChange={handleNewDispenserChange}
                handleNewSlotChange={handleNewSlotChange}
                handleCreateDispenser={handleCreateDispenser}
                recommendations={recommendations}
            />
        </div>
    );
};

export default DispenserPage;