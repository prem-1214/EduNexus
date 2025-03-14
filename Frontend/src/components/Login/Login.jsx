import React, { useState } from 'react';   
import { GoogleLogin } from "@react-oauth/google";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const LoginComponent = () => {  
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  
  
  const handleSubmit = async (e) => {  
    e.preventDefault(); // Prevent the default form submission  
  
    await axios.post('/auth/login', { email, password })
      .then((response) => {
        console.log("response in axios", response.data);
      })
      .catch((error) => {
        console.log("error in axios :", error);
      });

    console.log('Email:', email);  
    console.log('Password:', password);  
  };  

  const handleGoogleSuccess = async (response) => {  
    if (response.credential) {
      const userInfo = jwtDecode(response.credential);
      console.log("Google Credentials:", userInfo);
      console.log("Email :", userInfo.email);

    //  try {
    //   const backendResponse = await axios.post('/auth/login', {
    //      email: userInfo.email,
    //      password : u
    //     });
    //   console.log("Backend Response:", backendResponse);
    //  } catch (error) {
    //    console.error("Error in Google Login:", error);
      
    //  }

    } else {
      console.error("No valid token received from Google.");
    }
  };  

  const handleGoogleError = () => {   
    console.log("Google Login Failed...");  
  };

  return (  
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">  
      <div className="mt-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>  
        <input  
          className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-blue-700"  
          type="email"  
          value={email}  
          name="email"
          onChange={(e) => setEmail(e.target.value)}  
          required  
        />  
      </div>  

      <div className="mt-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>  
        <input  
          className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-blue-700"  
          type="password"  
          value={password}  
          name="password"
          onChange={(e) => setPassword(e.target.value)}  
          required  
        />  
      </div>  

      <div className="mt-8">  
        <button  
          type="submit"  
          className="bg-green-400 text-white font-bold py-2 px-4 w-full rounded-lg hover:bg-green-600"  
        >  
          Login  
        </button>  
      </div>  

      {/* Google Login Button */}  
      <div className="mt-4 flex justify-center">  
        <GoogleLogin  
          onSuccess={handleGoogleSuccess}  
          onError={handleGoogleError} 
          useOneTap={true} 
        />
      </div>  
    </form>  
  );  
};  

export default LoginComponent;
