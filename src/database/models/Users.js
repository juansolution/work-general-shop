const mongoose = require('mongoose'); // Imports the Mongoose library, which is an ODM (Object Data Modeling) library for MongoDB and Node.js.
const { v4: uuidv4 } = require('uuid'); //Destructures the v4 property from the uuid library and renames it to uuidv4. This library is commonly used for generating unique identifiers.

const usersSchema = new mongoose.Schema({ // Creates a Mongoose schema for the "Users" collection, defining the structure and validation rules for documents in the collection.
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    documentType:{
        type: String,
        required: true
    },
    document:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'guest'
    }
});

const Users = mongoose.model('Users', usersSchema); // Creates a Mongoose model named "Users" based on the defined schema. The model represents a collection in the MongoDB database and provides an interface for interacting with it.

module.exports = Users; //Exports the "Users" model, making it available for use in other parts of the application. This allows you to perform CRUD (Create, Read, Update, Delete) operations on the "Users" collection in MongoDB.