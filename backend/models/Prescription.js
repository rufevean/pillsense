const { ObjectId } = require('mongodb');

module.exports = {
    createPrescription: async (client, prescriptionData) => {
        const prescriptionsCollection = client.db("database").collection("prescriptions");
        const result = await prescriptionsCollection.insertOne(prescriptionData);
        return result;
    },
    getAllPrescriptions: async (client) => {
        const prescriptionsCollection = client.db("database").collection("prescriptions");
        const prescriptions = await prescriptionsCollection.find({}).toArray();
        return prescriptions;
    },
    getPrescriptionById: async (client, id) => {
        const prescriptionsCollection = client.db("database").collection("prescriptions");
        const prescription = await prescriptionsCollection.findOne({ _id: ObjectId(id) });
        return prescription;
    },
    updatePrescription: async (client, prescriptionId, prescriptionData) => {
        const prescriptionsCollection = client.db("database").collection("prescriptions");
        const result = await prescriptionsCollection.updateOne({ _id: ObjectId(prescriptionId) }, { $set: prescriptionData });
        return result;
    },
    deletePrescription: async (client, prescriptionId) => {
        const prescriptionsCollection = client.db("database").collection("prescriptions");
        const result = await prescriptionsCollection.deleteOne({ _id: ObjectId(prescriptionId) });
        return result;
    },

};


