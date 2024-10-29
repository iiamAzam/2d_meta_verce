import {io} from '../index'


export const soc=()=>{

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
}