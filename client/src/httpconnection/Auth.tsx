import axios from 'axios';
import React, { createContext, useState, useContext } from 'react';

interface User {
  username: string;
  password: string;
}

interface Auth {
  user: User | null;
  signup: (userdata: User) => Promise<void>;
  signin: (userdata: User) => Promise<void>;
  isauthenticated: boolean;
  token: string | null;
  nickname:string
  setupnickname:(nickname:string)=>void
  setspaceid1:(id:string)=>void
  spaceid:string
}

const AuthContext = createContext<Auth | undefined>(undefined);

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [nickname, setnickname] =useState<string>('') 
  const [spaceid, setspaceid]=useState<string>('')
  const signup = async (userdata: User): Promise<void> => {
    try {
      setUser(userdata);
      const response = await axios.post(`http://localhost:3000/api/v1/signup`, {
        username: userdata.username,
        password: userdata.password,
        role: 'User'
      });
      return response.data
    } catch (error) {
      console.error('Signup Error:', error);
    }
  };

  const setupnickname=(nickname1:string)=>{
    setnickname(nickname1)
  }


  const signin = async (userdata: User): Promise<void> => {
    try {
      const response = await axios.post(`http://localhost:3000/api/v1/signin`, {
        username: userdata.username,
        password: userdata.password
      });
      setUser(userdata);
      setToken(response.data.token);
      return response.data.token
    } catch (error) {
      console.error('Signin Error:', error);
    }
  };

  const isauthenticated = !!token;
  const setspaceid1=(id:string)=>{
    setspaceid(id)
  }


  return (
    <AuthContext.Provider value={{setspaceid1,spaceid,setupnickname, user, nickname, signup, signin, isauthenticated, token }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};

export default AuthContextProvider;
