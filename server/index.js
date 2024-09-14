const express = require('express');
const mongoose = require('./data/database'); 
const cors = require('cors');
const app = express();
const port = 3000;
const http = require("http");
const { Server } = require("socket.io");

const bookRouter = require('./routes/books');
const eventRouter = require('./routes/events');
const userRouter = require('./routes/users');
const reviewRouter = require('./routes/reviews');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5173", "https://bookclub-frontend1.onrender.com"],
    methods: ["GET", "POST"],
  }
});
 
require("./controllers/chatContoller")(io);

app.use(express.json());
//app.use(cors());

app.use(
  cors({
    origin: ["https://bookclub-frontend1.onrender.com", "http://localhost:5173", "htto://localhost:3000"],
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.send('Welcome to the Book Club App!');
});

app.use('/', bookRouter);
app.use('/', eventRouter);
app.use('/user', userRouter);
app.use('/', reviewRouter);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
