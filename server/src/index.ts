import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';
import authrout from './routes/auth_rout'
import cookieparser from 'cookie-parser'
import { User } from './websocket/user';
import cors from 'cors'
const app = express();
const server = http.createServer(app);

const io = new Server(server,{
  cors: {
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']}
});
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use(cookieparser())
app.use(express.json());


// mongodb://localhost:27017/ecommerce
// "mongodb://localhost:27017/3d_space"
mongoose.connect("mongodb://localhost:27017/ecommerce").then(()=>{
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
app.get('/',(req,res)=>{
              res.status(200).json({
                  message : "iam working proparly"
              })
})

server.listen(3000, () => {
  console.log('Socket.IO server running at http://localhost:3000');
});
