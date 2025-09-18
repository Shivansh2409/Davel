import React,{useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/user.context';

const Home = () => {
    const navigateTo=useNavigate();
    const {user}=useContext(UserContext)
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans w-full">
        <main className="container mx-auto flex flex-col items-center justify-center text-center px-4" style={{ height: '100vh' }}>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4 text-gray-100">
            The Future of UI is <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Here.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10">
            Experience the next generation of application design. Seamless, intuitive, and built for you with cutting-edge technology and beautiful aesthetics.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
                <button
                onClick={() => navigateTo('/register')}
                className="text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-lg px-8 py-4 text-center transition-transform transform hover:scale-105 shadow-xl"
                >
                Get Started For Free
                </button>
                <button
                    className="bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg text-lg px-8 py-4 text-center transition-transform transform hover:scale-105 shadow-xl"
                >
                    Learn More
                </button>
            </div>
      </main>
    </div>
  )
}

export default Home