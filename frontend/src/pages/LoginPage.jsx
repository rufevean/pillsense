import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(credentials);
        navigate('/dispenser'); // Redirect to the dispensers page after successful login
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" value={credentials.username} onChange={handleChange} placeholder="Username" />
            <input type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginPage;