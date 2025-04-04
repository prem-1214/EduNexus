import React, { useState } from 'react';   
import { GoogleLogin } from "@react-oauth/google";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext.jsx'

const Login = () => {  
  const [email, setEmail] = useState('')  
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()
  const { updateUser } = useUser()
  
  const handleSubmit = async (e) => {  
    e.preventDefault(); 
  
    console.log('Email:', email);  
    await axios.post('/auth/login', { email, password })
      .then((response) => {
        console.log("response in axios", response.data);
        localStorage.setItem('accessToken', response.data.accessToken);
        updateUser(response.data.user)

        const role = response.data.user.role
        console.log("Role:", role);

        if(role === 'student'){
          navigate('/studentDashboard')
        } else if(role === 'educator'){
          navigate('/educatorDashboard')
        }else {
          console.error("Unknown role:", role);
          setErrorMessage("Unknown role. Please contact support.");
        }

      })
      .catch((error) => {
        console.log("error in axios :", error)
        setErrorMessage("Invalid email or password. Please try again.");
      });

    console.log('Password:', password);  
  };  
 
  const handleGoogleSuccess = async (response) => {  
    if (response.credential) {
      const userInfo = jwtDecode(response.credential);
      // console.log("Google Credentials:", userInfo);
      // console.log("Email :", userInfo.email);


      await axios.post('/auth/google-login', {
        userInfo
      })
      .then((googleResponse) =>{
        console.log("Google Response:", googleResponse.data)
        localStorage.setItem('accessToken', googleResponse.data.accessToken)
        updateUser(googleResponse.data.user);

        const role = googleResponse.data.user.role;

        console.log("Role:", role)

        if(role === 'student'){
          navigate('/studentDashboard')
        } else if(role === 'educator'){
          navigate('/educatorDashboard')
        }else {
          console.error("Unknown role:", role);
          setErrorMessage("Unknown role. Please contact support.");
        }
      }).catch((error) =>{
        console.log("Error in Google Login:", error);
        setErrorMessage("Google login failed. Please try again.");
      })

    //  try {
    //   const backendResponse = await axios.post('/auth/login', {
    //      email: userInfo.email
    //     });
    //   console.log("Backend Response:", backendResponse);
    //  } catch (error) {
    //    console.error("Error in Google Login:", error);
      
    //  }

    } else {
      console.error("No valid token received from Google.");
      setErrorMessage("Google login failed. Please try again.");
    }
  };  

  const handleGoogleError = () => {   
    console.log("Google Login Failed...");  
    setErrorMessage("Google login failed. Please try again.");
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

    {/* Link to Register Page */}
    <div className="mt-4 text-center">
        <p>
          Not registered?{' '}
          <Link to="/register" className="text-blue-500 underline">
            Register here
          </Link>
        </p>
      </div>

    </>
  );  
};  

export default Login;
