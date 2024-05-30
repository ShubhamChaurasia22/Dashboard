const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors module

const app = express();
const hostPort = 3001;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Shubham@221',
  database: 'new_database',
});

// Connect to MySQL
db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Define API endpoint to run query
app.get('/api/data', (req, res) => {
  // const query = 'SELECT * FROM new_database.new_table';
  const query = 'Select * from new_database.new_table';
  db.query(query, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// TableueView API
// app.get('/tableauVisualization', async (req, res) => {
//   try {
//     const response = await axios.get('https://public.tableau.com/views/WOW2023W07_JitteredBarChart/WOW2023W07_JitteredBarChart?:language=en-US&:sid=&:display_count=n&:origin=viz_share_link');
//     res.send(response.data);
//   } catch (error) {
//     console.error('Failed to fetch Tableau visualization data:', error);
//     res.status(500).json({ error: 'Failed to fetch Tableau visualization data' });
//   }
// });

// Define your API endpoints
// app.post('/api/upload', (req, res) => {
//   const dataToSend = [
//     req.body.Id,
//     req.body.County,
//     req.body.City,
//     req.body.Postal_Code,
//     req.body.Model_Year,
//     req.body.Make,
//     req.body.Model,
//     req.body.Electric_Range,
//     req.body.Legislative_District,
//     req.body.DOL_Vehicle_ID,
//     req.body.Census_Tract_2020,
//   ];

//   const sql = 'INSERT INTO tabledashboard.electric_vehical (`Id`, `County`, `City`, `Postal_Code`, Model_Year, Make, Model, Electric_Range, Logislative_District, DOL_Vehicle_ID, Census_Tract_2020) VALUES (?)';

//   db.query(sql, [dataToSend], (err, result) => {
//     if (err) {
//       console.error('Error inserting data into MySQL:', err);
//       res.status(500).json({ message: 'Internal server error' });
//     } else {
//       console.log('Form data inserted into MySQL:', result);
//       res.status(200).json({ message: 'Form data inserted successfully' });
//     }
//   });
// });

// Start server
app.listen(hostPort, () => {
  console.log(`Server is running on port ${hostPort}`);
});
