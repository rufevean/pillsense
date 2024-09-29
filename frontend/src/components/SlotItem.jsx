import React from 'react';

const SlotItem = ({ slot, index, handleSlotChange, dispenserId, handleGetRecommendations, recommendations }) => {
    return (
        <div>
            <label>
                Slot {index + 1} Pill Count:
                <input
                    type="number"
                    value={slot.pillCount}
                    onChange={(e) => handleSlotChange(dispenserId, index, 'pillCount', e.target.value)}
                />
            </label>
            <label>
                Slot {index + 1} Medicine Name:
                <input
                    type="text"
                    value={slot.medicineName}
                    onChange={(e) => handleSlotChange(dispenserId, index, 'medicineName', e.target.value)}
                />
            </label>
            <label>
                Slot {index + 1} Interval:
                <select
                    value={slot.interval}
                    onChange={(e) => handleSlotChange(dispenserId, index, 'interval', e.target.value)}
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
            <button onClick={() => handleGetRecommendations(slot.medicineName, `${dispenserId}-${index}`)}>Get Recommendations</button>
            {Array.isArray(recommendations[`${dispenserId}-${index}`]) && (
                <ul>
                    {recommendations[`${dispenserId}-${index}`].map((rec, recIndex) => (
                        <li key={recIndex}>{rec}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SlotItem;