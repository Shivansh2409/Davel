import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../config/axios';
import { initializeSocket } from '../config/socket';

export default function ContentPage() {
    const location =useLocation()
    const project=location.state
    
  const [messages, setMessages] = useState([
    { id: 1, user: 'Elena', text: 'Hey team, I just pushed the latest updates to the main branch.' },
    { id: 2, user: 'You', text: 'Awesome, I\'ll pull them now and check for conflicts.' },
    { id: 3, user: 'Marcus', text: 'Thanks, Elena! The new component looks great.' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState([]);


  const [allUsers, setAllUsers] = useState([])
  const [project1,setProject1]= useState(project.project)
  const [projectUsers,setProjectUsers]=useState([])

  useEffect(()=>{
    initializeSocket()
    axios.get(`/projects/get-project/${project.project._id}`).then(res=>{
        setProject1(res.data)
        setProjectUsers(res.data.project.users)
    }).catch((err)=>{
        console.log(err)
    })

    axios.get('/users/all').then(res=>{
        setAllUsers(res.data.users)
    }).catch((err)=>{
        console.log(err)
    })
  },[])

  function addCollaborators () {

    axios.put('/projects/add-user',{
        projectId:project.project._id,
        users:selectedUserId
    }).then(res=>{
        console.log(res.data)
        setIsAddUserModalOpen(false)
    }).catch((err)=>{
        console.log(err)
    })
  }

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { id: Date.now(), user: 'You', text: newMessage }]);
      setNewMessage('');
    }
  };

//   const projectUsers = [
//     { id: 1, name: 'Elena', avatar: 'E', color: 'bg-pink-500' },
//     { id: 2, name: 'Marcus', avatar: 'M', color: 'bg-blue-500' },
//     { id: 3, name: 'Aisha', avatar: 'A', color: 'bg-teal-500' },
//     { id: 4, name: 'You', avatar: 'Y', color: 'bg-purple-600' },
//   ];
//   const allUsers = [
//     { id: 101, name: 'David Chen', avatar: 'D', color: 'bg-red-500' },
//     { id: 102, name: 'Sophia Lee', avatar: 'S', color: 'bg-green-500' },
//     { id: 103, name: 'Leo Kim', avatar: 'L', color: 'bg-yellow-500' },
//     { id: 104, name: 'Olivia Garcia', avatar: 'O', color: 'bg-indigo-500' },
//   ];
  const colour=['bg-green-500','bg-red-500','bg-yellow-500','bg-indigo-500']
  let co;
  const handleAddUserClick = () => {
    setIsAddUserModalOpen(true);
    setSelectedUserId([]); 
  };
  

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans w-full">
      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add User to Project</h3>
              <button onClick={() => setIsAddUserModalOpen(false)} className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="my-4">
              <p className="text-gray-400 text-sm mb-2">Select a user to add to Project Alpha.</p>
              <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {allUsers.map(user => (
                    
                  <li 
                    key={user._id}
                    onClick={() => setSelectedUserId([...selectedUserId,user._id])}
                    className={`flex items-center gap-4 p-3 m-2 rounded-lg cursor-pointer transition-colors duration-200 ${selectedUserId.indexOf(user._id) !=-1  ? 'bg-purple-600 ring-2 ring-purple-400' : 'hover:bg-gray-700'}`}
                  >
                    <div className={`w-10 h-10 rounded-full ${colour[3]} flex items-center justify-center font-bold text-lg`}>
                      {user.email[0]}
                    </div>
                    <span className="font-medium">{user.email}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setIsAddUserModalOpen(false)} className="py-2 px-4 bg-gray-600 hover:bg-gray-500 rounded-lg transition">Cancel</button>
              <button disabled={!selectedUserId} onClick={addCollaborators} className="py-2 px-4 bg-purple-600 hover:bg-purple-500 rounded-lg transition disabled:bg-gray-500 disabled:cursor-not-allowed">Add User</button>
            </div>
          </div>
        </div>
      )}
      {/* Main Page Layout */}
      <div className="flex h-screen">
        {/* Left Side: Chat Bar */}
        <aside className="relative w-1/3 h-full flex flex-col bg-gray-800/50 border-r border-white/10 overflow-hidden">
          {/* Sliding User Panel */}
          <div
            className={`absolute top-0 left-0 right-0 bg-gray-900 p-4 transition-transform duration-300 ease-in-out z-20 ${
              isUserPanelOpen ? 'translate-y-0' : '-translate-y-full'
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Project Members</h2>
              <button
                onClick={() => setIsUserPanelOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ul className="space-y-3">
              {projectUsers.map(user => (
                <li key={user._id} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${colour[2]} flex items-center justify-center font-bold text-sm`}>
                    {user.email[0]}
                  </div>
                  <span>{user.email}</span>
                </li>
              ))}
            </ul>
            <button onClick={handleAddUserClick} className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l text-white font-semibold py-2 px-4 rounded-lg transition-transform transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add New User
            </button>
          </div>
          
          {/* Project Header */}
          <div
            onClick={() => setIsUserPanelOpen(true)}
            className="p-4 border-b border-white/10 flex items-center gap-4 cursor-pointer hover:bg-gray-700/50 transition z-10"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 00-.517-3.86l-2.387-.477zM12 12a3 3 0 100-6 3 3 0 000 6z" />
                </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-100">{project.project.name}</h1>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.user === 'You' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-xl max-w-xs ${msg.user === 'You' ? 'bg-purple-600' : 'bg-gray-700'}`}>
                  <small className='text-xs text-gray-400'>@{msg.user}</small>
                  <p className="text-sm mt-1">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-white/10">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-3 placeholder-gray-400 transition"
              />
              <button type="submit" className="bg-gradient-to-r from-teal-400 to-blue-500 text-white p-3 rounded-lg hover:scale-105 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </div>
        </aside>

        {/* Right Side: Main Content */}
        <main className="w-2/3 h-full p-8 overflow-y-auto">
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-white/10 h-full">
                <h2 className="text-3xl font-bold text-gray-200 mb-6">Main Content Area</h2>
                <p className="text-gray-400">
                    This area can hold any content you need, such as project details, documentation, Kanban boards, or analytics dashboards. It is designed to be flexible and adapt to your project's requirements.
                </p>
            </div>
        </main>
      </div>
    </div>
  );
}

