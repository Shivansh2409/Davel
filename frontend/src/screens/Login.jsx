import React ,{useState,useContext}from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../config/axios';
import { UserContext } from '../context/user.context';

const Login = () => {
    const navigateTo=useNavigate();
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const {setUser}= useContext(UserContext)

    function summitHandler(e){
        e.preventDefault()
        axios.post('/users/login',{
            email,
            password
        }).then((res)=>{
            console.log(res.data)
            localStorage.setItem('token',res.data.token)
            setUser(res.data.user)
            navigateTo('/')
        }).catch((err)=>{
            console.log(err)
        })
    }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center font-sans p-4">
    <div className="w-full max-w-md">
    <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full transition-transform transform">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Welcome Back
        </h1>
        <p className="text-gray-400 mt-2">Sign in to continue to your account.</p>
      </div>

      <form onSubmit={summitHandler}>
        {/* Email Input */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
             <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>
          </div>
          <input
            onChange={(e)=>setEmail(e.target.value)}
            type="email"
            placeholder="your.email@example.com"
            className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block pl-10 p-3 placeholder-gray-400 transition"
            required
          />
        </div>

        {/* Password Input */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </div>
          <input
            onChange={(e)=>setPassword(e.target.value)}
            type="password"
            placeholder="••••••••••••"
            className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block pl-10 p-3 placeholder-gray-400 transition"
            required
          />
        </div>
        
        <div className="flex items-center justify-between mb-6">
            <a href="#" className="text-sm text-purple-400 hover:underline">Forgot Password?</a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 font-medium rounded-lg text-sm px-5 py-3 text-center transition-transform transform hover:scale-105"
        >
          Login
        </button>
      </form>
      
      {/* Sign Up Link */}
      <p className="text-sm text-center text-gray-400 mt-6">
        Don't have an account?{' '}
        <button
          onClick={() => navigateTo('/register')}
          className="font-medium text-purple-400 hover:underline"
        >
          Sign Up
        </button>
      </p>
    </div>
    </div>
    </div>
  )
}

export default Login