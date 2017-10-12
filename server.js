// server.js

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var driver   = require("./database_client/driver.js");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.SERVER_PORT;
var router = express.Router();

// get data from the database
router.get('/get_data/:list_name', function(req, res) {
    var lname = req.params.list_name; // query db for this list
    driver.findDocument({"name": lname}, function(resp) {
        res.json(resp);
    });
});

// post data to the database
router.post('/post_data/', function(req, res) {
    var data = req.body

    // error handle
    if (data.name === undefined) {
        res.json({"Error": "invalid data format"});
    }
    else {
        // add to db
        driver.insertDocument(data, function(resp) {
            res.json(resp);
        });
    }
})

app.use('/api', router);

// START THE SERVER
app.listen(port);
console.log(`Server is listening on port ${port}`);
