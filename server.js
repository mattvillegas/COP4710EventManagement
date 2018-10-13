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


/*
*   Endpoint for verifying user credentials
*   
*   Expected JSON: 
*   {"email" : "useremail", "password" : "userpassword"}
*
*   Return string "Success" if user is found, "Student not found" otherwise
*/

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

app.post("/api/users/student-create", function(req,res)
{
	req.body.password = crypto.createHash('sha256').update(JSON.stringify(req.body.password)).digest('hex');
	
	
	var queryString = 'INSERT INTO student(name, email, password, university) VALUES($1, $2, $3, $4)'
	var queryValues = [JSON.stringify(req.body.name), JSON.stringify(req.body.email), JSON.stringify(req.body.password), JSON.stringify(req.body.university)]
	
	client.query(queryString, queryValues, (err, res) =>
	{
		if(err)
		{
			handleError(res, "couldn't create user")
		}
		else
		{
			res.status(201).json("Success")
		}
	})
})