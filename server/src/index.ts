import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';
import authrout from './routes/auth_rout'
import cookieparser from 'cookie-parser'
import { User } from './websocket/user';
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"]
  } 

});
app.use(cookieparser())
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/3d_space").then(()=>{
        console.log('the db is connected')
}).catch((error)=>{
        console.log(`somthing went wrong ${error}`)
})

app.use('/api/v1', authrout)

io.on('connection', (socket) => {
  const user = new User(socket)
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});



server.listen(3000, () => {
  console.log('Socket.IO server running at http://localhost:3000');
});
