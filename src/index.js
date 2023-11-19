const express=require('express'); // Imports the Express.js framework, which is commonly used for building web applications and APIs in Node.js.
const swagger = require('./swagger');
const cors=require('cors'); // Imports the CORS (Cross-Origin Resource Sharing) middleware, which enables the server to handle cross-origin HTTP requests.
require('dotenv').config(); // Imports and configures the dotenv module, allowing the application to read environment variables from a .env file.

const colors=require('colors'); // Imports the colors module, which provides text coloring for the console output. It's used for adding color to console logs in this case.
const port=process.env.PORT || 5000; // Sets the port number for the server. It uses the value of the PORT environment variable if it exists; otherwise, it defaults to port 5000.
const userRouter=require('./routes/userRoutes'); // Imports the userRoutes module, which contains route handlers for user-related operations.

const connectDB=require('./database/config/db'); //Imports a function (connectDB) responsible for connecting to the database. It's in a separate file (db.js) located in the ./database/config/ directory.
const app=express(); //Creates an instance of the Express application, providing a foundation for building a web server in Node.js.

connectDB(); //Calls the connectDB function to establish a connection to the database.
app.use('/', swagger);
app.use(express.urlencoded({extended:false})); //Adds middleware to parse incoming URL-encoded requests, facilitating the handling of data sent in the body of HTTP requests
app.use(express.json()); //Adds middleware to parse incoming JSON requests, enabling the server to handle data sent in the JSON format in the body of HTTP requests.
const corsOptions = {
    allowedHeaders: ['Authorization'], // Agrega 'Authorization' a los encabezados permitidos
  };
app.use(cors(corsOptions)); //Adds CORS middleware to the Express app, enabling cross-origin resource sharing.
app.use(userRouter); //Tells the Express app to use the routes defined in userRouter.

app.listen(port,console.log(`Server working! Port: ${port}`)) //Starts the server, listening on the specified port. The callback function logs a message to the console indicating that the server is running, along with the port number.

