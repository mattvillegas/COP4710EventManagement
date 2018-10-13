const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const pg = require('pg');

var app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/eventmanagement?username=postgres&password=postgres';

const client = new pg.Client(connectionString);
client.connect();

client.query('CREATE TABLE test (name VARCHAR(20))', (err, res) => {
    if (err) {
      console.log("error")
    } else {
      console.log("succesfully created table")
    }
  })

var server = app.listen(8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});