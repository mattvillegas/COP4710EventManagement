
const pg = require('pg')

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/eventmanagement?username=&password=postgres';

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

client.query('CREATE TABLE event (event_name VARCHAR(200), time timestamp, location VARCHAR(300), description VARCHAR(10000), PRIMARY KEY (time, location))')
.then(res => console.log("created table!"))
.catch(e => console.log(e.stack))

client.query('CREATE TABLE rso_event (event_name VARCHAR(200), time timestamp, location VARCHAR(300), description VARCHAR(10000), name VARCHAR(100), contact_email VARCHAR(100), contact_phone VARCHAR(50), event_category VARCHAR(50), rso_id INTEGER, PRIMARY KEY (time, location), FOREIGN KEY (time, location) REFERENCES event(time, location), FOREIGN KEY (rso_id) REFERENCES rso(rso_id))')
.then(res => console.log("created table!"))
.catch(e => console.log(e.stack))

client.query('CREATE TABLE rso (name VARCHAR(20), rso_id SERIAL PRIMARY KEY, adminid INTEGER, FOREIGN KEY (adminid) REFERENCES admin(uid))')
.then(res => console.log("created table!"))
.catch(e => console.log(e.stack))


client.query('CREATE TABLE is_in (rso_id INTEGER, uid INTEGER, PRIMARY KEY (rso_id, uid), FOREIGN KEY (rso_id) REFERENCES rso(rso_id), FOREIGN KEY (uid) REFERENCES student(uid))')
.then(res => console.log("created table!"))
.catch(e => console.log(e.stack))

client.query('CREATE TABLE comments(uid INTEGER, time timestamp, location VARCHAR(300), comment VARCHAR(10000), FOREIGN KEY (time, location) REFERENCES event(time,location), FOREIGN KEY (uid) REFERENCES student(uid))')
.then(res => console.log("created table!"))
.catch(e => console.log(e.stack))

client.query('CREATE TABLE pub_event (event_name VARCHAR(200), time timestamp, location VARCHAR(300), description VARCHAR(10000), name VARCHAR(100), contact_email VARCHAR(100), contact_phone VARCHAR(50), event_category VARCHAR(50), PRIMARY KEY (time, location), FOREIGN KEY (time, location) REFERENCES event(time, location))')
.then(res => console.log("created table!"))
.catch(e => console.log(e.stack))

client.query('CREATE TABLE private_event (event_name VARCHAR(200), time timestamp, location VARCHAR(300), description VARCHAR(10000), name VARCHAR(100), contact_email VARCHAR(100), contact_phone VARCHAR(50), event_category VARCHAR(50), university VARCHAR(50), PRIMARY KEY (time, location), FOREIGN KEY (time, location) REFERENCES event(time, location))')
