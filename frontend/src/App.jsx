import React from 'react';
import { BrowserRouter as Router, Route , Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import DispenserPage from './pages/DispenserPage';
import PrescriptionPage from './pages/PrescriptionPage'; 



function App() {
    return (
        <Router>
            <Routes>
                <Route path="/"  element={<HomePage/>} />
                <Route path="/user" element={<UserPage/>} />
                <Route path="/dispenser" element={<DispenserPage/>} />
                <Route path="/prescription" element={<PrescriptionPage/>} />
            </Routes>
        </Router>
    );
};


export default App;
