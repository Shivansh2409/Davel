import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../config/axios';
import Markdown from 'markdown-to-jsx';
// Import the syntax highlighter and a style
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { initializeSocket, disconnectSocket, subscribeToEvent, sendMessage, unsubscribeFromEvent } from '../config/socket';
import { UserContext } from '../context/user.context';

const fileSystem = [
  {
    name: 'src',
    type: 'folder',
    children: [
      {
        name: 'components',
        type: 'folder',
        children: [
          { name: 'ChatBar.jsx', type: 'file', content: 'export default function ChatBar() { ... }' },
          { name: 'Editor.jsx', type: 'file', content: 'export default function Editor() { ... }' },
          { name: 'Modal.jsx', type: 'file', content: 'export default function Modal() { ... }' },
        ],
      },
      { name: 'App.jsx', type: 'file', content: 'import React from "react";\n\nfunction App() {\n  return <h1>Hello, World!</h1>;\n}\n\nexport default App;' },
      { name: 'index.css', type: 'file', content: 'body { margin: 0; }' },
    ],
  },
  { name: 'package.json', type: 'file', content: '{ "name": "react-app", "version": "1.0.0" }' },
  { name: 'README.md', type: 'file', content: '# React Project' },
];

// Icons for File Explorer
const FolderIcon = ({ isOpen }) => (
  <svg className={`w-5 h-5 mr-2 text-purple-400 transition-transform duration-200 ${isOpen ? 'transform rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
);

const FileIcon = () => (
    <svg className="w-5 h-5 mr-2 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
);


// Component for rendering syntax-highlighted code blocks
const CodeBlock = ({ className, children }) => {
    const language = className ? className.replace('lang-', '') : 'javascript';
    return (
        <SyntaxHighlighter style={atomDark} language={language} PreTag="div">
            {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
    );
};


// Recursive File Explorer Component
const FileTree = ({ items, onFileSelect, activeFile, level = 0 }) => {
    const [openFolders, setOpenFolders] = useState(['src', 'components']);

    const toggleFolder = (name) => {
        setOpenFolders(prev => prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]);
    };

    return (
        <ul className="pr-1">
            {items.map(item => (
                <li key={item.name}>
                    {item.type === 'folder' ? (
                        <div>
                            <div onClick={() => toggleFolder(item.name)} className="flex items-center px-2 py-1 cursor-pointer hover:bg-gray-700 rounded-md">
                                <FolderIcon isOpen={openFolders.includes(item.name)} />
                                <span className="font-medium truncate">{item.name}</span>
                            </div>
                            {openFolders.includes(item.name) && (
                                <div style={{ paddingLeft: `${(level + 1) * 15}px` }}>
                                    <FileTree items={item.children} onFileSelect={onFileSelect} activeFile={activeFile} level={level + 1} />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div 
                            onClick={() => onFileSelect(item)} 
                            className={`flex items-center px-2 py-1 cursor-pointer rounded-md ${activeFile === item.name ? 'bg-purple-600/30' : 'hover:bg-gray-700'}`} 
                            style={{ paddingLeft: `${(level + 1) * 15}px` }}>
                            <FileIcon />
                            <span className="truncate">{item.name}</span>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
};







export default function ContentPage() {

    const location = useLocation();
    const { project } = location.state;

    // Initialize messages state as an empty array
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState([]);
    const [isChatVisible, setIsChatVisible] = useState(true);

    const [allUsers, setAllUsers] = useState([]);
    const [projectDetails, setProjectDetails] = useState(project);
    const [projectUsers, setProjectUsers] = useState([]);
    const { user } = useContext(UserContext);


    // VS Code Editor State
    const [openFiles, setOpenFiles] = useState([fileSystem.find(f => f.name === 'App.jsx') || fileSystem[0].children[1]]);
    const [activeFile, setActiveFile] = useState(openFiles[0]?.name || '');
    const [editorContent, setEditorContent] = useState('');

    useEffect(() => {
        const currentFile = openFiles.find(f => f.name === activeFile);
        setEditorContent(currentFile?.content || '');
    }, [activeFile, openFiles]);

    useEffect(() => {
        // 1. Initialize the socket connection
        initializeSocket(projectDetails._id);

        // 2. Define the message handler
        const handleNewMessage = (message) => {
            console.log(message);
            console.log(message.sender);
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        // 3. Subscribe to the 'project-message' event
        subscribeToEvent('project-message', handleNewMessage);

        // Fetch initial project data (including existing messages if available)
        axios.get(`/projects/get-project/${projectDetails._id}`).then(res => {
            setProjectDetails(res.data.project);
            setProjectUsers(res.data.project.users);
            // Assuming your API returns messages for the project
            if (res.data.project.messages) {
                setMessages(res.data.project.messages);
            }
        }).catch((err) => console.log(err));

        axios.get('/users/all').then(res => {
            setAllUsers(res.data.users);
        }).catch((err) => console.log(err));

        // 4. Cleanup function: runs when the component unmounts
        return () => {
            unsubscribeFromEvent('project-message');
            disconnectSocket();
        };
    }, [projectDetails._id]); // Re-run effect if the project ID changes


    const handleContentChange = (e) => {
      const newContent = e.target.value;
      setEditorContent(newContent);
      // Update the content in the openFiles state so it's preserved on tab switch
      const newOpenFiles = openFiles.map(file => 
        file.name === activeFile ? { ...file, content: newContent } : file
      );
      setOpenFiles(newOpenFiles);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() && user) {
            // Only send the text. The server will add sender info.
            sendMessage('project-message', { text: newMessage });
            setNewMessage('');
        }
    };

    // ... (addCollaborators and other functions remain the same)
    function addCollaborators() {
        axios.put('/projects/add-user', {
            projectId: projectDetails._id,
            users: selectedUserId
        }).then(res => {
            console.log(res.data);
            // Refresh project users after adding
            setProjectUsers(res.data.users);
            setIsAddUserModalOpen(false);
        }).catch((err) => {
            console.log(err);
        });
    }

    const handleAddUserClick = () => {
        setIsAddUserModalOpen(true);
        setSelectedUserId([]);
    };



    const colour = ['bg-green-500', 'bg-red-500', 'bg-yellow-500', 'bg-indigo-500'];



    // Editor functions
    const handleFileSelect = (file) => {
      if (!openFiles.find(f => f.name === file.name)) {
        setOpenFiles([...openFiles, file]);
      }
      setActiveFile(file.name);
    };
    
    const handleCloseFile = (fileName, e) => {
      e.stopPropagation();
      const fileIndex = openFiles.findIndex(f => f.name === fileName);
      const newOpenFiles = openFiles.filter(f => f.name !== fileName);
      setOpenFiles(newOpenFiles);
      
      if (activeFile === fileName) {
          if (newOpenFiles.length === 0) {
              setActiveFile('');
          } else {
              // Activate the previous tab, or the first one if closing the first tab
              const newActiveIndex = Math.max(0, fileIndex - 1);
              setActiveFile(newOpenFiles[newActiveIndex].name);
          }
      }
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


      {/* Show Chat Button */}
      {!isChatVisible && (
        <button
          onClick={() => setIsChatVisible(true)}
          className="absolute bottom-4 left-0 z-30 p-2 bg-gray-700/80 backdrop-blur-sm hover:bg-purple-600 rounded-r-lg transition-colors"
          title="Show Chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      )}


      {/* Main Page Layout */}
      <div className="flex h-screen">
        {/* Left Side: Chat Bar */}
        <aside className={`relative flex flex-col bg-gray-800/50 border-r border-white/10 overflow-hidden transition-all duration-300 ease-in-out ${
            isChatVisible ? 'w-1/4' : 'w-0 p-0 border-none'
          }`}>
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
                  {Array.isArray(projectUsers) && projectUsers.length > 0 ? (
                  projectUsers.map(user => (
                    <li key={user._id} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${colour[2]} flex items-center justify-center font-bold text-sm`}>
                      {user.email[0]}
                    </div>
                    <span>{user.email}</span>
                    </li>
                  ))
                  ) : (
                  <li className="text-gray-400">No users in this project.</li>
                  )}
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
            <h1 className="text-xl font-bold text-gray-100">{project.name}</h1>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {messages.map((msg, index) => (
              
              <div key={index} className={`flex ${msg.sender.email === user.email ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-xl max-w-xs ${msg.sender.email === user.email ? 'bg-purple-600' : 'bg-gray-700'}`}>
                  <small className='text-xs text-gray-400'>{msg.sender.email}</small>
                  {/* Use a div to avoid nested <p> tags and apply Markdown correctly */}
                  <div className="text-sm mt-1 prose prose-invert">
                    {msg.sender._id === '_ai' ?
                        <Markdown options={{ overrides: { code: CodeBlock } }}>
                            {msg.text.text || ''}
                        </Markdown>
                        : <p>{msg.text}</p>
                    }
                  </div>
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

        <main className={`h-full flex flex-col bg-[#1e1e1e] transition-all duration-300 ease-in-out ${
            isChatVisible ? 'w-3/4' : 'w-full'
          }`}>
            <div className="flex h-full">
                {/* File Explorer */}
                <div className="w-1/3 bg-[#252526] p-2 text-sm text-gray-300 flex flex-col overflow-y-auto">
                    <div className="flex justify-between items-center p-2 flex-shrink-0">
                      <h2 className="font-bold text-gray-200">EXPLORER</h2>
                      {isChatVisible && <button
                        onClick={() => setIsChatVisible(false)}
                        className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
                        title="Hide Chat Panel"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                      </button>}
                    </div>
                    <div className="flex-grow overflow-y-auto">
                      <FileTree items={fileSystem} onFileSelect={handleFileSelect} activeFile={activeFile}/>
                    </div>
                </div>

                {/* Editor Area */}
                <div className="w-2/3 flex flex-col">
                    {/* Open Files Tabs */}
                    <div className="flex bg-[#2D2D2D] overflow-x-auto border-b border-gray-700">
                        {openFiles.map(file => (
                            <div key={file.name} onClick={() => setActiveFile(file.name)} className={`flex items-center p-2 px-4 cursor-pointer border-r border-t-2 ${activeFile === file.name ? 'bg-[#1e1e1e] border-[#3c3c3c] border-t-purple-400 text-white' : 'bg-[#2D2D2D] border-transparent text-gray-400'}`}>
                                <span>{file.name}</span>
                                <button onClick={(e) => handleCloseFile(file.name, e)} className="ml-3 text-gray-500 hover:text-white rounded-full hover:bg-gray-600 p-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                        ))}
                    </div>
                    {/* Code Content */}
                    <div className="flex-1 p-4 bg-[#1e1e1e]  hide-scrollbar">
                        <textarea
                            value={activeFile ? editorContent : 'Select a file to open.'}
                            onChange={handleContentChange}
                            className="w-full h-full bg-transparent text-gray-300 font-mono text-sm resize-none outline-none border-none placeholder-gray-500"
                            placeholder="Select a file to start editing..."
                            disabled={!activeFile}
                        />
                    </div>
                </div>
            </div>
        </main>
      </div>
    </div>
  );
}

