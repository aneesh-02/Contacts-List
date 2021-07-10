const express = require("express");
const port = 8500;
const app = express();

// setting up the server
app.listen(port, function(err)
{
    if (err)
    {
        console.log("An error occured while loading the server");
        return;
    }

    console.log("Server is successfully running on port: ",port);
    return; 
});

//returning response from the server
// app.get('/',function(req,res)
//     {
//         return res.send("Message sent from the server");
//     });    
 

// setting up ejs template engine
const path = require("path"); // reqiuiring the path
app.set("view engine", "ejs"); // to set up ejs
app.set("views" , path.join(__dirname, "views")); // to join the path of views directory with this server's path

app.get('/',function(req,res)  //.get type of request is used on "/" url to perform the function 
    {
        return res.render("home");
    });  

    
