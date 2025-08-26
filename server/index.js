const express = require('express');
const mongoose = require('./data/database'); 
const cors = require('cors');
const app = express();
const port = 3000;
const http = require("http");
const { Server } = require("socket.io");
const cookieParser = require('cookie-parser');

const bookRouter = require('./routes/books');
const eventRouter = require('./routes/events');
const userRouter = require('./routes/users');
const reviewRouter = require('./routes/reviews');
const forumRouter = require('./routes/forum')
const ratingsRouter = require('./routes/ratings')

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:5173", "https://bookclub-frontend1.onrender.com"],
    methods: ["GET", "POST"],
    credentials: true
  }
});
 
require("./controllers/chatContoller")(io);

app.use(express.json());
app.use(cookieParser());
//app.use(cors());

app.use(
  cors({
    origin: ["https://bookclub-frontend1.onrender.com", "http://localhost:5173", "http://localhost:3000", "http://localhost:4200"],
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
app.use('/', forumRouter);
app.use('/', ratingsRouter);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});