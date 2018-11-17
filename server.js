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

app.post("/api/users/login", function(req, res) 
{
	console.log("req body = ", req.body)
    req.body.password = crypto.createHash('sha256').update(JSON.stringify(req.body.password)).digest('hex');
	var superadminQueryString = 'SELECT * FROM superadmin S WHERE S.email = \'' + req.body.email + '\' AND S.password = \'' + req.body.password + '\''
	var studentQueryString = 'SELECT * FROM student S WHERE S.email = \'' + req.body.email + '\' AND S.password = \'' + req.body.password + '\'';
    var adminQueryString = 'SELECT * FROM admin S WHERE S.email = \'' + req.body.email + '\' AND S.password = \'' + req.body.password + '\'';
	
	found = false 
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
			var resString = {uid:superadmin.rows[0].uid, accountType:superadmin}
			found = true
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
			var resString = {uid:admin.rows[0].uid, accountType:admin}
			found = true
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
			var resString = {uid:student.rows[0].uid , accountType:student}
			found = true
            res.status(201).json(resString)
        }
        else
        {
			//res.status(201).json("Student not found")
        }
    }
	
	// Only reach here if none of the account types could be found.
	if(!found) 
	{
		res.status(201).json("Account not found")
	}
	
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
	
	
	client.query(isInQueryString, (err, isIn) =>
	{
		if(err)
		{
			handleError(res, "Didn't find student in RSO")
		}
		else
		{
			console.log(isIn)
			if(isIn.rows.length >= 1)
			{
				var findRSOQueryString = 'SELECT * FROM rso_event r WHERE r.rso_id = \'' + isIn.rows[0]['rso_id'] + '\''
				client.query(findRSOQueryString, (err, events) =>
				{
					if(err)
					{
						handleError(res, err.stack)
					}
					else
					{
						if(events.rows.length >= 1)
						{
							res.status(201).json(events.rows)
						}
						else
						{
							res.status(201).json("not in an rso")
						}
					}
				})
			}
			else
			{
				res.status(201).json("not in an rso")
			}
		}
	})
});

app.post("/api/:id/create-rso", function(req, res)
{
	var queryString = "INSERT INTO rso(name, adminid) VALUES($1, $2)"
	var queryValues = [req.body.name, req.params.id]
	
	client.query(queryString, queryValues, (err, insert) =>
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

app.post("/api/:id/join-rso", function(req, res)
{
	var insertIntoIsIn = 'INSERT INTO is_in(rso_id, uid) VALUES($1, $2)'
	var queryValues = [req.body.rso_id, req.params.id]
	
	client.query(insertIntoIsIn, queryValues, (err, insert) =>
	{
		if(err)
		{
			handleError(res, "Unable to join rso")
		}
		else
		{
			res.status(201).json(insert)
		}
	})
});

app.post("/api/:id/add-comment", function(req, res)
{
	var addComment = 'INSERT INTO comments(uid, time, location, comment) VALUES($1, $2, $3, $4)'
	var queryValues = [req.params.id, req.body.time, req.body.loc, req.body.comment]
	
	client.query(addComment, queryValues, (err, comment) =>
	{
		if(err)
		{
			handleError(res, err.stack)
		}
		else
		{
			res.status(201).json(comment)
		}
	})
});

app.post("/api/:id/delete-comment", function(req, res)
{
	var deleteComment = 'DELETE FROM comments WHERE uid = \'' + req.params.id + '\' AND time = \'' + req.body.time + '\' AND location = \'' + req.body.loc + '\''
	
	client.query(deleteComment, (err, res) =>
	{
		if(err)
		{
			handleError(res, err.stack)
		}
		else
		{
			res.status(201).json(res)
		}
	})
});

app.post("/api/:id/edit-comment", function(req, res)
{
	var editComment = 'UPDATE comments SET comment = \'' + req.body.comment + '\' WHERE time = \'' + req.body.time + '\' AND location = \'' + req.body.loc + '\''
	
	client.query(editComment, (err, res) =>
	{
		if(err)
		{
			handleError(res, err.stack)
		}
		else
		{
			res.status(201).json(res)
		}
	})
});

app.get("/api/get-comments", function (req,res) {
	var find_comment = 'SELECT C.comment, E.event_name From comments C, event E WHERE C.time = E.time AND C.location = E.location';
	client.query(find_comment, (err,comments) => 
	{
		if(err)
		{
			handleError(res, "Database Error")
		}
		else
		{
			res.status(201).json(comments.rows)
		}

	})

});

app.get("/api/list-all-rso", function(req, res)
{
	var getAllRSO = 'SELECT * FROM rso'
	
	
	client.query(getAllRSO, (err, rso) =>
	{
		if(err)
		{
			handleError(res, err.stack)
		}
		else
		{
			res.status(201).json(rso.rows)
		}
	})
});

function return_call(items, res)
{
	console.log("entered return call")
	console.log(items)
	res.status(201).json(items)
}

app.post("/api/:id/leave-rso", function(req, res)
{
	//var findUser = 'SELECT * FROM is_in WHERE rso_id = \'' + req.body.rsoId + '\' AND uid = \'' + req.params.id + '\''
	var removeUser = 'DELETE FROM is_in WHERE rso_id = \'' + req.body.rsoId + '\' AND uid = \'' + req.params.id + '\''
	
	client.query(removeUser, (err, remove) =>
	{
		if(err)
		{
			handleError(res, err.stack)
		}
		else
		{
			res.status(201).json(remove)
		}
	})
});

app.get("/api/:id/get-my-rso", function(req, res)
{
	var getMyRSOs = 'SELECT rso.name FROM rso, is_in WHERE is_in.uid = \'' + req.params.id + '\' AND is_in.rso_id = rso.rso_id'
	
	client.query(getMyRSOs, (err, myRSOs) =>
	{
		if(err)
		{
			handleError(res, err.stack)
		}
		else
		{
			res.status(201).json(myRSOs.rows)
		}
	})
});

app.post("/api/:id/create-rso-event", function(req, res)
{
	console.log("made it to create")
	console.log(req.body)
	console.log(req.params.id)
	var checkMembers = 'SELECT COUNT(uid) FROM is_in WHERE rso_id = \'' + req.params.id + '\'';
	
	client.query(checkMembers, (err, insert) =>
	{
		console.log(insert)
		if(err)
		{
			handleError(res, err.stack)
		}
		else if(insert.rows[0]["count"] > 4)
		{
			var insertIntoEvent = 'INSERT INTO event (time, location, description, event_name) VALUES($1, $2, $3, $4)'
			var eventTableValues = [req.body.time, req.body.loc, req.body.desc, req.body.event_name]
			var createString = 'INSERT INTO rso_event(event_name, time, location, description, name, contact_email, contact_phone, event_category, rso_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)'
			var createValues = [req.body.event_name, req.body.time, req.body.loc, req.body.desc, req.body.contact_name, req.body.contact_email, req.body.contact_phone, req.body.event_category, req.params.id]
			
			client.query(insertIntoEvent, eventTableValues, (err, eventTable) => 
			{
				if(err)
				{
					handleError(res, err.stack)
				}
				else
				{
					client.query(createString, createValues, (err, rso) => 
					{
						if(err)
						{
							handleError(res, err.stack)
						}
						else
						{
							if(rso == null)
							{
								console.log("No rso found")
								res.status(201).json("Error")
							}
							else
							{
								console.log("succesfully added event")
								res.status(201).json("Entered into all the tables")
							}
						}
						
						
					})
					
				}
			})
			
			
		}
		else
		{
			console.log(insert.rows[0]["count"])
			res.status(201).json("Not enough members")
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
