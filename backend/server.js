const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const authenticateToken = require('./middleware/auth');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "https://pillsense-1.onrender.com",
    credentials: true
}));
app.use(express.json());

app.post('/test', (req, res) => {
    console.log("Test route hit");
    res.send('Hello World');
});

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

async function run() {
    try {
        await client.connect();
        console.log('Connected to the database');

        app.locals.client = client;

        const userRoutes = require('./routes/userRoutes');
        const dispenserRoutes = require('./routes/dispenserRoutes');

        app.use('/api/users', authenticateToken, userRoutes);
        app.use('/api/dispensers', authenticateToken, dispenserRoutes);

        app.get('/api', (req, res) => {
            res.json({ message: 'Welcome to the API' });
        });

        // Handle client-side routing, return index.html for all other routes
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'build', 'index.html'));
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