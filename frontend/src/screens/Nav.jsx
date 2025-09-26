import React, { use, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user.context';
import axios from '../config/axios';

const Nav = () => {
    const navigateTo = useNavigate();
    // Destructure both user and setUser from the context
    const { user, setUser } = useContext(UserContext);

    function logoutHandler(e) {
        e.preventDefault();
        axios.get('/users/logout')
            .then((res) => {
                console.log(res.data);
                // Remove the token from localStorage
                localStorage.removeItem('token');
                // Set the user context to null
                setUser(null);
                // Navigate to the home page
                navigateTo('/');
            }).catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="bg-gray-900 text-white font-sans">
            {/* Floating Navigation Bar */}
            <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
                <div className="container bg-gray-900/30 backdrop-blur-lg rounded-full border border-white/10 shadow-2xl flex items-center justify-between px-6 py-3">
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 pr-8 cursor-pointer" onClick={() => navigateTo('/')}>
                        Davel AI
                    </div>
                    <div className="hidden md:flex space-x-8 items-center text-gray-300">
                        {user === null
                        ? <>
                        <a href="#" className="hover:text-purple-400 transition duration-300">Features</a>
                        <a href="#" className="hover:text-purple-400 transition duration-300">Pricing</a>
                        <a href="#" className="hover:text-purple-400 transition duration-300">About</a>
                        <a href="#" className="hover:text-purple-400 transition duration-300">Contact</a>
                        </>
                        : <>
                        <a href="#" className="hover:text-purple-400 transition duration-300" onClick={()=> navigateTo('/dashboard')}>My Project</a>
                        <a href="#" className="hover:text-purple-400 transition duration-300">Profile</a>

                        </>
                    }
                        
                    </div>
                    {/* Use conditional rendering to show the correct button */}
                    {user === null
                        ? <button
                            onClick={() => navigateTo('/login')}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l text-white font-semibold py-2 px-5 rounded-full transition-transform transform hover:scale-105 shadow-lg ml-8"
                        >
                            Sign In
                        </button>
                        : <button
                            onClick={logoutHandler}
                            className="bg-gradient-to-r from-red-500 to-pink-500 hover:bg-gradient-to-l text-white font-semibold py-2 px-5 rounded-full transition-transform transform hover:scale-105 shadow-lg ml-8"
                        >
                            Log Out
                        </button>
                    }
                </div>
            </nav>
        </div>
    );
}

export default Nav;