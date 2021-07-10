const express = require("express");
const port = 8500;
const app = express();

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


