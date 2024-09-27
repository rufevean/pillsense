const { ObjectId } = require('mongodb');

module.exports = {
    createDispenser: async (client, dispenserData) => {
        const dispensersCollection = client.db("database").collection("dispensers");
        dispenserData.slots = dispenserData.slots.map(slot => ({
            ...slot,
            medicineName: slot.medicineName || 'Unknown Medicine' 
        }));
        const result = await dispensersCollection.insertOne(dispenserData);
        return result.ops[0];
    },
    getAllDispensers: async (client, username) => {
        const dispensersCollection = client.db("database").collection("dispensers");
        const dispensers = await dispensersCollection.find({ username }).toArray();
        return dispensers;
    },
    getDispenserById: async (client, id, username) => {
        const dispensersCollection = client.db("database").collection("dispensers");
        const dispenser = await dispensersCollection.findOne({ _id: new ObjectId(id), username });
        return dispenser;
    },
    updateDispenser: async (client, dispenserId, dispenserData, username) => {
        const dispensersCollection = client.db("database").collection("dispensers");
        dispenserData.slots = dispenserData.slots.map(slot => ({
            ...slot,
            medicineName: slot.medicineName || 'Unknown Medicine' 
        }));
        const result = await dispensersCollection.updateOne(
            { _id: new ObjectId(dispenserId), username },
            { $set: dispenserData }
        );
        return result;
    },
    deleteDispenser: async (client, dispenserId, username) => {
        const dispensersCollection = client.db("database").collection("dispensers");
        const result = await dispensersCollection.deleteOne({ _id: new ObjectId(dispenserId), username });
        return result;
    },
};