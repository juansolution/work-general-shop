const mongoose = require('mongoose'); // Imports the Mongoose library, as it's commonly used for interacting with MongoDB from a Node.js application.

console.log(process.env.MONGO_URI);
const connectDB = async () => { // Defines an asynchronous arrow function named connectDB. This function will be responsible for connecting to the MongoDB database.
    
    const conn = await mongoose.connect("mongodb://localhost:27017/users"); // Initiates a connection to the MongoDB database using the mongoose.connect method. It connects to the URI specified in the MONGO_URI environment variable. The await keyword is used because mongoose.connect returns a promise, and we're waiting for it to resolve.
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold); // Prints a message to the console indicating that the MongoDB connection was successful. The conn.connection.host retrieves the host information from the connection object. The .cyan.underline.bold part applies some styling to the console log using the colors library (previously imported).
}

module.exports = connectDB; // Exports the connectDB function, making it available for use in other parts of the application. This allows other modules or scripts to call connectDB to establish a connection with the MongoDB database.
