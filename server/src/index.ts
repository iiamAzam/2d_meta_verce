import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Adjust if React runs on a different port
    methods: ["GET", "POST"]
  }
});

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

server.listen(3000, () => {
  console.log('Socket.IO server running at http://localhost:3000');
});
