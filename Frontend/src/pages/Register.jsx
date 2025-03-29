import React, { useState } from 'react'
import { GoogleLogin } from "@react-oauth/google"
import axios from 'axios'
import api from '../utils/axiosInstance'
import { jwtDecode } from 'jwt-decode'
import {Link, useNavigate} from 'react-router-dom'

const Register = () => {  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {  
    e.preventDefault(); 
  
    console.log('Email:', email);  
    await axios.post('/auth/register', { email, password })
      .then((response) => {
        console.log("response in axios", response.data)
        localStorage.setItem('accessToken', response.data.accessToken)

        navigate('/login')
      })
      .catch((error) => {
        console.log("error in axios :", error)
      })

    console.log('Password:', password)  
  };  
 
  const handleGoogleSuccess = async (response) => {  
    if (response.credential) {
      const userInfo = jwtDecode(response.credential);
      console.log("Google Credentials:", userInfo);
      console.log("Email :", userInfo.email);


      await axios.post('/auth/google-login', {
        userInfo
      })
      .then((googleResponse) =>{
        console.log("Google Response:", googleResponse.data)
        localStorage.setItem('accessToken', googleResponse.data.accessToken)
        navigate('/dashboard')
        
      }).catch((error) =>{
        console.log("Error in Google Login:", error);
      })
    } else {
      console.error("No valid token received from Google.");
    }
  };  

  const handleGoogleError = () => {   
    console.log("Google Login Failed...");  
  }

  return (  
    <>
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
          Register 
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

    {/* Link to Login Page */}
      <div className="mt-4 text-center">
        <p>
          Already a user?{' '}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </div>
    </>
  );  
};  

export default Register
