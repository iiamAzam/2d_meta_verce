import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { useAuth } from  '../httpconnection/Auth'
import { useNavigate } from 'react-router-dom';
const SignUpForm = () => {
  const  navigate = useNavigate()
  const  {signup} = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async(e) => {
    e.preventDefault();
    const res= await signup({username,password})
    if (res){
      navigate('/signin')
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <Camera color="#4B5563" size={48} />
          <h2 className="text-2xl font-bold ml-4">Sign Up</h2>
        </div>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

const SignInForm = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {signin}= useAuth()
  
  const handleSignIn =async (e) => {
    e.preventDefault();
     const res = await signin({username,password})
     if(res){
      navigate('/user')
     }else{
      alert('password or username not match')
     }
  };

  const clickforregister=()=>{
          navigate('/signup')
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <Camera color="#4B5563" size={48} />
          <h2 className="text-2xl font-bold ml-4">Sign In</h2>
        </div>
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Sign In
          </button>
          <p>dont have account <span onClick={clickforregister} className='text-red-400 cursor-pointer'>click here</span></p>
        </form>
      </div>
    </div>
  );
};

export { SignUpForm, SignInForm };