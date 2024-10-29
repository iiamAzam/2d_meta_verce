import { io } from 'socket.io-client';
import { useMemo, useEffect, useState, useCallback } from 'react';
import './App.css';

function App() {

  const socket = useMemo(() => io('http://localhost:3000'), []);

  const [mesage,setsems]=useState('')
  

  useEffect(() => {

    socket.on('connect', () => {
      console.log('Connected to the server!');
      socket.emit('message', mesage );
    });

    // Listen for incoming chat messages
    socket.on('chatmessage', (msg) => {
      console.log('Received message:', msg);
    });

    // Handle socket disconnection
    socket.on('disconnect', () => {
      console.log('Disconnected from the server.');
    });

    // Cleanup to prevent memory leaks on unmount
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div>
      <h1>React + Socket.IO</h1>
      <p>Check the console for connection status and messages.</p>
      <input type='text' value={mesage} onChange={(e)=>setsems(e.target.value)}/>
    </div>
  );
}

export default App;
