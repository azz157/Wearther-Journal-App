// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Initialize project folder
app.use(express.static('website'));

const port=8000;
const hostname="127.0.0.1";

//callback to debug
const listing=function(){
    console.log("server is running");
    console.log(`server runnig at http://${hostname}:${port}/`);
}

//start server
app.listen(port, listing);


//callback function to complete get;
const getData = function(req,res){
    res.status(200).send(projectData);
}

//Get route
app.get('/all',getData)

//callback function to complete post;
const postData = function (req, res){

    projectData = req.body;
    console.log(projectData);
    res.status(200).send(projectData);
}

//post Route
app.post("/add", postData);




