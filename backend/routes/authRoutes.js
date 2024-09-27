const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');

const router = express.Router();
const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

router.post('/register', async (req, res) => {
    try {
        await client.connect();
        const usersCollection = client.db().collection('users');

        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = { username, password: hashedPassword };
        await usersCollection.insertOne(newUser);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await client.close();
    }
});

router.post('/login', async (req, res) => {
    try {
        await client.connect();
        const usersCollection = client.db().collection('users');

        const { username, password } = req.body;
        const user = await usersCollection.findOne({ username });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await client.close();
    }
});

module.exports = router;