import React, { createContext, useContext, useEffect, useRef, ReactNode, useState } from 'react';
import { io, Socket } from 'socket.io-client';
interface User{
    id : string,
    userid:string,
    spceID:string,
    nickname:string,
    x:number,
    y:number,
}

interface joinedsata{
    x:number ,
    y:number,
    users:User[]
}



interface SocketContextType {
  socket: Socket | null;
  isconnected:boolean,
  allusers:(data:joinedsata)=>void
  data1:joinedsata|null
}

export const SocketContext = createContext<SocketContextType | undefined>(undefined);

interface SocketContextProviderProps {
  children: ReactNode;
}

const SocketContextProvider: React.FC<SocketContextProviderProps> = ({ children }) => {
  const socketRef = useRef<Socket | null>(null);
  const [isconnected,setisconnected] =useState<boolean>(false)
  const [data1,setdata]=useState<joinedsata|null>(null)
  useEffect(() => {
    // Initialize the socket connection
    socketRef.current = io('http://localhost:3000');

    // Log when connected
    socketRef.current.on('connect', () => {
        setisconnected(true)
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
  const allusers=(data:joinedsata)=>{
          setdata(data)
  }




  return (
    <SocketContext.Provider value={{ socket: socketRef.current,isconnected,allusers, data1 }}>
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
