
const pg = require('pg')

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/eventmanagement?username=postgres&password=postgres';

const client = new pg.Client(connectionString);
client.connect();

client.query('CREATE TABLE Student (name VARCHAR(20), uid SERIAL PRIMARY KEY, email VARCHAR(80), password VARCHAR(100), university VARCHAR(60))')
.then(res => console.log("created table!"))
.catch(e => console.log("Error! ", e.stack))

client.query('CREATE TABLE accesskeys (accesskey VARCHAR(20) PRIMARY KEY, university VARCHAR(50))')
.then(res => console.log("created table!"))
.catch(e => console.log(e.stack))

client.query('CREATE TABLE superadmin (name VARCHAR(20), uid SERIAL PRIMARY KEY, email VARCHAR(80), password VARCHAR(100), university VARCHAR(60))')
.then(res => console.log("created table!"))
.catch(e => console.log(e.stack))

client.query('CREATE TABLE admin (name VARCHAR(20), uid SERIAL PRIMARY KEY, email VARCHAR(80), password VARCHAR(100), university VARCHAR(60))')
.then(res => console.log("created table!"))
.catch(e => console.log(e.stack))

client.query('CREATE TABLE event (time timestamp, location VARCHAR(300), description VARCHAR(1000), PRIMARY KEY (time, location))')
.then(res => console.log("created table!"))
.catch(e => console.log(e.stack))

client.query('CREATE TABLE rso_event (time timestamp, location VARCHAR(300), description VARCHAR(1000), name VARCHAR(50), contact_email VARCHAR(50), contact_phone VARCHAR(30), event_category VARCHAR(50), rso_id INTEGER, PRIMARY KEY (time, location), FOREIGN KEY (time, location) REFERENCES event(time, location), FOREIGN KEY (rso_id) REFERENCES rso(id))')
.then(res => console.log("created table!"))
.catch(e => console.log(e.stack))


