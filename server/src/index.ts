import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';
import authrout from './routes/auth_rout'
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"]
  }
});
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/3d_space").then(()=>{
        console.log('the db is connected')
}).catch((error)=>{
        console.log(`somthing went wrong ${error}`)
})


io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (msg) => {
    console.log('Received:', msg);
    io.emit('chatmessage', `Echo: ${msg}`);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});
app.use('/',authrout)


server.listen(3000, () => {
  console.log('Socket.IO server running at http://localhost:3000');
});
