const { ObjectId } = require('mongodb'); 
module.exports = {
    createDispenser: async (client, dispenserData) => {
        const dispensersCollection = client.db("database").collection("dispensers");
        const result = await dispensersCollection.insertOne(dispenserData);
        return result;
    },
    getAllDispensers: async (client) => {
        const dispensersCollection = client.db("database").collection("dispensers");
        const dispensers = await dispensersCollection.find({}).toArray();
        return dispensers;
    },
    getDispenserById: async (client, id) => {
        const dispensersCollection = client.db("database").collection("dispensers");
        const dispenser = await dispensersCollection.findOne({ _id: new ObjectId(id) });
        return dispenser;
    },
    updateDispenser: async (client, dispenserId, dispenserData) => {
        const dispensersCollection = client.db("database").collection("dispensers");
        const result = await dispensersCollection.updateOne(
            { _id: new ObjectId(dispenserId) }, 
            { $set: dispenserData }
        );
        return result;
    },
    deleteDispenser: async (client, dispenserId) => {
        const dispensersCollection = client.db("database").collection("dispensers");
        const result = await dispensersCollection.deleteOne({ _id: new ObjectId(dispenserId) });
        return result;
    },
};

