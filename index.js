const express = require("express");
const port = 8500;

const db = require("./config/mongoose"); // requiring the mongooose file
const Contact = require("./models/contact"); // requiring scheema

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
 
app.use(express.urlencoded()); // to parse data server using middleware parser

app.post('/create-contact', function(req, res)
{
    
        // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);
    // contactList.push({
        
    //     name: req.body.name,
    //     phone: req.body.phone,
    // })
    // contactList.push(req.body);
    Contact.create({               // now no need to push
        name : req.body.name,       // this is a create function
        phone : req.body.phone      // it takes in the parameters name and phone
    }, function(err, newContact){  // and has a function
        if(err)                     //which handles error
        {
            console.log("error in creating a contact!");
            return;
        }

        console.log("**********" ,newContact);  // and is no error is found newContact is printed
        return res.redirect("back");    // and page is returned to back
    });
 
});

app.use(express.static("assets")); // middleware to access static files, exp.static calls assets folder to get files


app.get("/delete-contact/:phone",function(req,res)  // get request on this url(we can name it anything) this url is added to the a tag in ejg
{                        // /:phone is the query param that comes from yhe /delete-contact url
    console.log(req.params);
    let phone = req.params.phone;     // to find the phone no: express reads this and asssigns it to let phone
                        // phone no will be searched for in the array and if matched will be deleted
                        // to delete from array we use splice function
    let conatactIndex = contactList.findIndex(contact => contact.phone == phone);

    // now contact.phone that is phone index in contact array is compared to phone ie. incomming req.param
    // this function is applied on contactList which is the array created where appending happens
    // findindex is a  predefined function to find index
    // so if they both are the same, contactIndex becomes true and != -1 else if not found it's -1 
    
    if(conatactIndex != -1) // if contactIndex == index then splice at that index
    {
        contactList.splice(conatactIndex,1); // remove this index and append the rest of the array in its place
    }

    return res.redirect("back"); // to go back to the home page
});