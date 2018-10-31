const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const pg = require('pg');
const crypto = require("crypto");
const cors = require('cors');


var app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/eventmanagement?username=postgres&password=postgres';

const client = new pg.Client(connectionString);
client.connect();

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) 
{
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

var server = app.listen(8080, function () 
{
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

app.post("/api/users/student-login", function(req, res) 
{
    req.body.password = crypto.createHash('sha256').update(JSON.stringify(req.body.password)).digest('hex');
    var queryString = 'SELECT * FROM student S WHERE S.email = \'' + req.body.email + '\' AND S.password = \'' + req.body.password + '\'';
   client.query(queryString, (err, student) => {
    if(err)
    {
        handleError(res, "couldn't fetch from database");
    }
    else 
    {
        console.log(student)
        if(student.rows.length < 1)
        {

            res.status(201).json("Student not found")
        }
        else
        {
            res.status(201).json(student.rows[0].uid)
        }
    }
   }) 
});

/*
*   Endpoint for user login
*   
*   Expected JSON: 
*   { "name" : "username", "email" : "useremail", "password" : "userpassword", "university" : "useruniversity"}
*
*   Return string "Success" if student is created, "couldn't create user" otherwise
*/

app.post("/api/users/student-create", function(req,res)
{
	req.body.password = crypto.createHash('sha256').update(JSON.stringify(req.body.password)).digest('hex');
	
	
	var queryString = 'INSERT INTO student(name, email, password, university) VALUES($1, $2, $3, $4)'
	var queryValues = [req.body.name, req.body.email, req.body.password, req.body.university]
	
	client.query(queryString, queryValues, (err, student) =>
	{
		if(err)
		{
			handleError(res, "couldn't create user")
		}
		else
		{
            res.status(201).json("Success")
            console.log(student)
		}
	})
})

/*
*   Endpoint for creating a superadmin
*   
*   Expected JSON: 
*   {"name" : "username", "email" : "useremail", "password" : "userpassword", "university" : "useruniversity", "accesskey" : "accesskey"}
*
*   Return string "Success" if superadmin is created, "couldn't approve admin" otherwise
*/

app.post("/api/users/superadmin-create", function(req,res)
{
	req.body.password = crypto.createHash('sha256').update(JSON.stringify(req.body.password)).digest('hex');
	
	var checkAdmin = 'SELECT * FROM accesskeys WHERE accesskeys.accesskey = \'' + req.body.accesskey + '\' AND accesskeys.university = \'' +  req.body.university +'\'';
	var queryString = 'INSERT INTO superadmin(name, email, password, university) VALUES($1, $2, $3, $4)'
	var queryValues = [req.body.name, req.body.email, req.body.password, req.body.university]
	
	client.query(checkAdmin, (err, admin) =>
	{
		if(err)
		{
			handleError(res, "couldn't approve admin")
		}
		
		if(admin.rows.length < 1)
		{
			res.status(201).json("Admin not found")
		}
		else
		{
			client.query(queryString, queryValues, (err, student) =>
			{
				if(err)
				{
					handleError(res, "couldn't create user")
				}
				else
				{
					res.status(201).json("Success")
					console.log(student)
				}
			})
			
		}
    })
})

app.post("/api/users/admin-create", function(req,res)
{
	req.body.password = crypto.createHash('sha256').update(JSON.stringify(req.body.password)).digest('hex');
	
	//var checkAdmin = 'SELECT * FROM accesskeys WHERE accesskeys.accesskey = \'' + req.body.accesskey + '\' AND accesskeys.university = \'' +  req.body.university +'\'';
	var queryString = 'INSERT INTO admin(name, email, password, university) VALUES($1, $2, $3, $4)'
	var queryValues = [req.body.name, req.body.email, req.body.password, req.body.university]
	
	client.query(queryString, queryValues, (err, admin) =>
	{
		if(err)
		{
			handleError(res, "couldn't create admin")
		}
		else
		{
			res.status(201).json("Success")
			console.log(admin)
		}
    })
})

/*
*   Endpoint for superadmin login
*   
*   Expected JSON: 
*   {"email" : "useremail", "password" : "userpassword"}
*
*   Return string "Success" if superadmin is found, "SuperAdmin not found" otherwise
*/

app.post("/api/users/superadmin-login", function(req, res) 
{
    req.body.password = crypto.createHash('sha256').update(JSON.stringify(req.body.password)).digest('hex');
	var superadminQueryString = 'SELECT * FROM superadmin S WHERE S.email = \'' + req.body.email + '\' AND S.password = \'' + req.body.password + '\''
	var studentQueryString = 'SELECT * FROM student S WHERE S.email = \'' + req.body.email + '\' AND S.password = \'' + req.body.password + '\'';
    var adminQueryString = 'SELECT * FROM admin S WHERE S.email = \'' + req.body.email + '\' AND S.password = \'' + req.body.password + '\'';
	
	client.query(superadminQueryString, (err, superadmin) => {
    if(err)
    {
        handleError(res, "couldn't fetch from database");
    }
    else 
    {
        console.log(superadmin.rows)
        if(superadmin.rows.length > 0)
        {
			var resString = "uid:" + superadmin.rows[0].uid + "accountType:superadmin"
			res.status(201).json(resString)
        }
        else
        {
			//res.status(201).json("Logged in")
        }
    }
   })
   
   client.query(adminQueryString, (err, admin) => {
    if(err)
    {
        handleError(res, "couldn't fetch from database");
    }
    else 
    {
        console.log(admin.rows)
        if(admin.rows.length > 0)
        { 
			var resString = "uid:" + admin.rows[0].uid + " accountType:admin"
            res.status(201).json(resString)
        }
        else
        {
			//res.status(201).json("Admin not found")
        }
    }
   })
   
   client.query(studentQueryString, (err, student) => {
    if(err)
    {
        handleError(res, "couldn't fetch from database");
    }
    else 
    {
        console.log(student.rows)
        if(student.rows.length > 0)
        {
			var resString = "uid:" + student.rows[0].uid + " accountType:student"
            res.status(201).json(resString)
        }
        else
        {
			//res.status(201).json("Student not found")
        }
    }
	
	// Only reach here if none of the account types could be found.
	res.status(201).json("Account not found")
	
   })
});

/*
*   Endpoint for superadmin deletion
*   
*    
*   
*
*   Return string "Success" if superadmin is found, "SuperAdmin not found" otherwise
*/

app.post("/api/users/superadmin-delete/:id", function(req, res)
{
	var queryString = 'DELETE FROM superadmin WHERE superadmin.uid = \'' + req.params.id + '\'';
	console.log(req.params.id)
	client.query(queryString, (err, superadmin) =>
	{
		if(err)
		{
			handleError(res, "Didn't delete superadmin")
		}
		else
		{
			console.log(superadmin)
			if(superadmin.rows.length > 1)
			{
				res.status(201).json("SuperAdmin deleted")
			}
			else
			{
				res.status(201).json("Didn't delete superadmin")
			}
		}
	})
});

app.post("/api/users/student-delete/:id", function(req, res)
{
	var queryString = 'DELETE FROM student WHERE student.uid = \'' + req.params.id + '\'';
	console.log(req.params.id)
	client.query(queryString, (err, student) =>
	{
		if(err)
		{
			handleError(res, "Didn't delete student")
		}
		else
		{
			console.log(student.rows)
			if(student.rows.length < 1)
			{
				res.status(201).json("student deleted")
			}
			else
			{
				res.status(201).json("Didn't delete student")
			}
		}
	})
});

app.get("/api/:id/get-events", function(req, res)
{
	var isInQueryString = 'SELECT rso_id FROM is_in i WHERE i.uid = \'' + req.params.id + '\'';
	var findRSOQueryString = 'SELECT * FROM rso_event r WHERE r.rso_id = \'' + isIn.rows[0] + '\''
	
	client.query(isInQueryString, (err, isIn) =>
	{
		if(err)
		{
			handleError(res, "Didn't find student in RSO")
		}
		else
		{
			client.query(findRSOQueryString, (err, events) =>
			{
				if(err)
				{
					handleError(res, "Something went wrong")
				}
				else
				{
					res.status(201).json(events)
				}
			})
		}
	})
});

app.post("/api/:id/create-rso", function(req, res)
{
	var queryString = "INSERT INTO rso(name, adminid) VALUES($1, $2)"
	var queryValues = [req.body.name, req.body.id]
	
	client.query(queryString, (err, insert) =>
	{
		if(err)
		{
			handleError(res, "Couldn't create rso")
		}
		else
		{
			res.status(201).json(insert)
		}
	})
});

/*app.get("/api/users/:id/fetchevents", function(req,res)
{
	var queryString = 'SELECT RSO_EVENT.time, RSO_EVENT.description, RSO_event.name, RSO_event. FROM STUDENT, IS_IN, RSO, RSO_EVENT WHERE student.uid = \'' + req.params.id + '\' AND student.uid = is_in.uid and is_in.rso_id = rso.rso_id'
	


});
*/

app.get("/api/students", function(req,res)
{
	var queryString = "SELECT * FROM Student";
	console.log("Api was hit");
	client.query(queryString, (err, students) => 
	{
		if(err)
		{
			handleError(res, "Failed to hit database", "Failed database call")
		}
		else
		{
			console.log(students.rows)
			res.status(201).json(students.rows)
		}

	})

});
