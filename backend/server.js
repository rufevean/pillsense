
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/test' , (req, res) => {
    console.log("Test route hit");
    res.send('Hello World');
});

async function run() {
    try {
        await client.connect();
        console.log('Connected to the database');

        app.locals.client = client;

       const userRoutes = require('./routes/userRoutes');
       const dispenserRoutes = require('./routes/dispenserRoutes');
       const prescriptionRoutes = require('./routes/prescriptionRoutes');

        app.use('/api/users', userRoutes);
        app.use('/api/dispensers', dispenserRoutes);
        app.use('/api/prescriptions', prescriptionRoutes);

        app.get('/', (req, res) => {
            res.json({ message: 'Welcome to the API' });
        });

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
}

run();

process.on('SIGINT', async () => {
    try {
        await client.close();
        console.log('Connection closed');
    } catch (error) {
        console.error('Error closing the connection:', error);
    } finally {
        process.exit();
    }
});
