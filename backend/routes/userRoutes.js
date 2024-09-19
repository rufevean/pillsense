const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
    const userData =req.body;
    try {
        const user = await User.createUser(req.app.locals.client, userData);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await User.getAllUsers(req.app.locals.client);
        res.json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router; 
