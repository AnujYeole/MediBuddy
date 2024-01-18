const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'anuj2306',
  database: 'anujdb',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

app.use(bodyParser.json());

// Signup endpoint
app.post('/signup', (req, res) => {
  const { username, email, password, confirmpassword } = req.body;

  if (password != confirmpassword) {
    return res.status(400).json({ error: 'Password and confirm password do not match' });
  }

  const query = 'INSERT INTO users (username, email, password, confirmpassword) VALUES (?, ?, ?, ?)';
  const values = [username, email, password, confirmpassword];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Signup error: ' + err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    if (password != confirmpassword) {
      console.error('Password and confirm password do not match');
    }
    res.json({ success: true, message: 'User registered successfully' });
  });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  const values = [email, password];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Login error: ' + err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ success: true, message: 'Login successful' });
  });
});

// Admin route to add a new doctor
app.post('/addDoctor', (req, res) => {
  const { name, occupation, profilePicture } = req.body;

  const query = 'INSERT INTO doctors (name, occupation, profilePicture) VALUES (?, ?, ?)';
  db.query(query, [name, occupation, profilePicture], (err, results) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ success: true, insertedId: results.insertId });
    }
  });
});

// Client route to fetch the list of doctors
app.get('/doctors', (req, res) => {
  const query = 'SELECT * FROM doctors';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

app.get('/doctors/:id', (req, res) => {
  console.log('Request console', req);
  const doctorId = req.params.id;

  const query = `SELECT * FROM doctors WHERE id = ?`;
  db.query(query, [doctorId], (err, results) => {
    if (err) {
      console.error('Error fetching doctor details:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ error: 'Doctor not found' });
      } else {
        const doctorDetails = results[0];
        res.json(doctorDetails);
      }
    }
  });
});

function toMysqlFormat(date) {
  return date.toISOString().slice(0, 19).replace('T', ' ');
}

app.post('/book-appointment', (req, res) => {
  const { date } = req.body;

  const formattedDate = toMysqlFormat(new Date(date));

  db.query('INSERT INTO appointments (date) VALUES (?)', [formattedDate], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error booking appointment');
    } else {
      res.status(200).send('Appointment booked successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
