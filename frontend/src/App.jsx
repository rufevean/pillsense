import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import DispenserPage from './pages/DispenserPage';
import PrescriptionPage from './pages/PrescriptionPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './AuthContext';
import RequireAuth from './RequireAuth';

function App() {
    return (

            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                        path="/user"
                        element={
                            <RequireAuth>
                                <UserPage />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/dispenser"
                        element={
                            <RequireAuth>
                                <DispenserPage />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/prescription"
                        element={
                            <RequireAuth>
                                <PrescriptionPage />
                            </RequireAuth>
                        }
                    />
                </Routes>
            </Router>
 
    );
}

export default App;