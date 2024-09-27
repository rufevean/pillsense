const express = require('express');
const router = express.Router();
const Dispenser = require('../models/Dispenser');
const authenticateToken = require('../middleware/auth');

const getDispensersCollection = async (req, res, next) => {
    try {
        const client = req.app.locals.client;
        req.dispensersCollection = client.db().collection('dispensers');
        next();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};


router.post('/', authenticateToken, getDispensersCollection, async (req, res) => {
    const dispenserData = { ...req.body, username: req.user.username };
    try {
        const dispenser = await Dispenser.createDispenser(req.app.locals.client, dispenserData);
        res.status(201).json(dispenser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', authenticateToken, getDispensersCollection, async (req, res) => {
    try {
        const username = req.user.username;
        const dispensers = await Dispenser.getAllDispensers(req.app.locals.client, username);
        res.json(dispensers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/:id', authenticateToken, getDispensersCollection, async (req, res) => {
    const id = req.params.id;
    try {
        const username = req.user.username;
        const dispenser = await Dispenser.getDispenserById(req.app.locals.client, id, username);
        if (!dispenser) {
            return res.status(404).json({ error: 'Dispenser not found' });
        }
        res.json(dispenser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.put('/:id', authenticateToken, getDispensersCollection, async (req, res) => {
    const dispenserId = req.params.id;
    const dispenserData = req.body;
    try {
        const username = req.user.username;
        const result = await Dispenser.updateDispenser(req.app.locals.client, dispenserId, dispenserData, username);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Dispenser not found' });
        }

        res.json({ message: 'Dispenser updated successfully' });
    } catch (error) {
        console.error('Error updating dispenser:', error);
        res.status(400).json({ error: error.message });
    }
});
router.delete('/:id', authenticateToken, getDispensersCollection, async (req, res) => {
    const dispenserId = req.params.id;
    try {
        const username = req.user.username;
        const result = await Dispenser.deleteDispenser(req.app.locals.client, dispenserId, username);
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Dispenser not found' });
        }
        res.json({ message: 'Dispenser deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;