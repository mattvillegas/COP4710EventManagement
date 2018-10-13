const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const pg = require('pg');
const crypto = require("crypto");

var app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/eventmanagement?username=postgres&password=postgres';

const client = new pg.Client(connectionString);
client.connect();

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

var server = app.listen(8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

app.post("/api/users/student-login", function(req, res) {
    req.body.password = crypto.createHash('sha256').update(JSON.stringify(req.body.password)).digest('hex');
    var queryString = 'SELECT * FROM student S WHERE S.email = \'' + req.body.email + '\' AND S.password = \'' + req.body.password + '\'';
   client.query(queryString, (err, student) => {
    if(err)
    {
        handleError(res, "couldn't fetch from database");
    }
    else 
    {
        console.log(student.rows)
        if(student.rows.length < 1)
        {

            res.status(201).json("Student not found")
        }
        else
        {
            res.status(201).json("Success")
        }
    }
   }) 
});