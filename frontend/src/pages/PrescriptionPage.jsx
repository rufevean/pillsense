
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PrescriptionPage = () => {
    const [prescriptions, setPrescriptions] = useState([]);

    useEffect(() => {
        axios.get('/api/prescriptions')
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setPrescriptions(response.data);
                } else {
                    console.error("Response is not an array:", response.data);
                    setPrescriptions([]);
                }
            })
            .catch((error) => {
                console.error("Error fetching prescriptions:", error);
            });
    }, []);

    return (
        <div>
            <h1>Prescriptions</h1>
            {prescriptions.length > 0 ? (
                <ul>
                    {prescriptions.map((prescription) => (
                        <li key={prescription.id}>
                            {prescription.name} - {prescription.dosage}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No prescriptions available.</p>
            )}
        </div>
    );
};

export default PrescriptionPage;
