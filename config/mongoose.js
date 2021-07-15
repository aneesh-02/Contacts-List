const mongoose = require("mongoose");   // require the library
mongoose.connect("mongodb://localhost/contacts_list_db"); // connect to the database

const db = mongoose.connection; // aquire the connection to check if it is successfull

db.on("error",console.error.bind(console,"error connecting to db")); // error handling

db.once("open",function()  //if up and running then print the msg
{
    console.log("Connection successfull to the database");
});
 