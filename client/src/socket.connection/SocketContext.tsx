import React, { createContext, useContext, useEffect, useRef, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
  addconnection:(spaceId:string)=>void
}

export const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketContextProviderProps {
  children: ReactNode;
}

const SocketContextProvider: React.FC<SocketContextProviderProps> = ({ children }) => {
  const socketRef = useRef<Socket | null>(null);
  useEffect(() => {
    // Initialize the socket connection
    socketRef.current = io('http://localhost:3000');

    // Log when connected
    socketRef.current.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    // Clean up on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.log('Disconnected from Socket.IO server');
      }
    };
  }, []);



  return (
    <SocketContext.Provider value={{ socket: socketRef.current }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use the socket context
export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketContextProvider');
  }
  return context;
};

export default SocketContextProvider;
