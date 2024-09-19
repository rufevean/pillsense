
const express = require('express');
const router = express.Router();

const Prescription = require('../models/Prescription');

router.post('/prescriptions', async (req, res) => {
    const prescriptionData = req.body;
    try {
        const prescription = await Prescription.createPrescription(req.app.locals.client, prescriptionData);
        res.status(201).json(prescription);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/prescriptions', async (req, res) => {
    try {
        const prescriptions = await Prescription.getAllPrescriptions(req.app.locals.client);
        res.json(prescriptions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/prescriptions/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const prescription = await Prescription.getPrescriptionById(req.app.locals.client, id);
        res.json(prescription);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/prescriptions/:id', async (req, res) => {
    const prescriptionId = req.params.id;
    const prescriptionData = req.body;
    try {
        const prescription = await Prescription.updatePrescription(req.app.locals.client, prescriptionId, prescriptionData);
        res.status(200).json(prescription);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/prescriptions/:id', async (req, res) => {
    const prescriptionId = req.params.id;
    try {
        const result = await Prescription.deletePrescription(req.app.locals.client, prescriptionId);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
