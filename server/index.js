// app.js

const express = require('express');
const mongoose = require('./data/database'); 
const cors = require('cors');
const app = express();
const port = 3000;

const bookRouter = require('./routes/books');
const eventRouter = require('./routes/events');
const userRouter = require('./routes/users');

// Middleware to parse JSON bodies
app.use(express.json());
//app.use(cors());

app.use(
  cors({
    origin: ["https://bookclub-frontend1.onrender.com/", "http://localhost:5173"],
    credentials: true,
  })
);

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Book Club App!');
});

app.use('/', bookRouter);
app.use('/', eventRouter);
app.use('/', userRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
