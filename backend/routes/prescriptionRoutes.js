const express = require('express');
const multer = require('multer');
const router = express.Router();
const Prescription = require('../models/Prescription'); // Adjust the path as necessary

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });

router.get('/:id', async (req, res) => {  
    const id = req.params.id;
    try {
        const prescription = await Prescription.getPrescriptionById(req.app.locals.client, id);
        res.json(prescription);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {  
    const prescriptionId = req.params.id;
    const prescriptionData = req.body;
    try {
        const prescription = await Prescription.updatePrescription(req.app.locals.client, prescriptionId, prescriptionData);
        res.status(200).json(prescription);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {  
    const prescriptionId = req.params.id;
    try {
        const result = await Prescription.deletePrescription(req.app.locals.client, prescriptionId);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// New route to handle PDF upload
router.post('/:id/upload', upload.single('pdf'), async (req, res) => {
    const prescriptionId = req.params.id;
    const pdfPath = req.file.path;
    try {
        const updatedPrescription = await Prescription.updatePrescription(req.app.locals.client, prescriptionId, { pdfPath });
        res.status(200).json(updatedPrescription);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;