
const express = require('express');
const router = express.Router();
const Dispenser = require('../models/Dispenser');

router.post('/', async (req, res) => {
    const dispenserData = req.body;
    try {
        const dispenser = await Dispenser.createDispenser(req.app.locals.client, dispenserData);
        res.status(201).json(dispenser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const dispensers = await Dispenser.getAllDispensers(req.app.locals.client);
        res.json(dispensers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const dispenser = await Dispenser.getDispenserById(req.app.locals.client, id);
        if (!dispenser) {
            return res.status(404).json({ error: 'Dispenser not found' });
        }
        res.json(dispenser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const dispenserId = req.params.id; 
    const dispenserData = req.body; 
    try {
        const result = await Dispenser.updateDispenser(req.app.locals.client, dispenserId, dispenserData);

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Dispenser not found' });
        }

        res.json({ message: 'Dispenser updated successfully' });
    } catch (error) {
        console.error('Error updating dispenser:', error); 
        res.status(400).json({ error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    const dispenserId = req.params.id;
    try {
        const result = await Dispenser.deleteDispenser(req.app.locals.client, dispenserId);
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Dispenser not found' });
        }
        res.json({ message: 'Dispenser deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



module.exports = router;
