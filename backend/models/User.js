const { ObjectId } = require('mongodb'); 

module.exports = {
    createUser : async (client , userData) => {
        const usersCollection = client.db("database").collection("users");
        const result = await usersCollection.insertOne(userData);
        return result;
    },
    getAllUsers : async (client) => {
        const usersCollection = client.db("database").collection("users");
        const users = await usersCollection.find().toArray();
        return users;
    }
};
