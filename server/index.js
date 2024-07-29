// app.js

const express = require('express');
const mongoose = require('./data/database'); 
const app = express();
const port = 3000;

const bookRouter = require('./routes/books')

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Book Club App!');
});

app.use('/books', bookRouter)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
