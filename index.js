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

app.use(express.urlencoded()); // to parse data server using middleware parser

// app.get('/',function(req,res)  //.get type of request is used on "/" url to perform the function 
//     {
//         return res.render("home");
//     });  

    
var contactList = [ // created an array of objects 
    {
        name: "Aneesh",          //each object has 2 key:value pairs
        phone : 9999444499
    },

    {
        name: "Tony",
        phone : 6868686868
    },

    {
        name: "Peter",
        phone : 100100100 
    }
]


app.get('/', function(req, res) //.get type of request is used on "/" url to perform the function
{   
    return res.render('home',{
        title: "Contact List",
        contact_list: contactList  // asigning variables the vars from ejs
    });
})
 
     
app.post('/create-contact', function(req, res)
{
    
        // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);
    // contactList.push({
        
    //     name: req.body.name,
    //     phone: req.body.phone,
    // })
    contactList.push(req.body);
    return res.redirect('/');

});