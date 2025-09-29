import React, { useState, useEffect, useContext, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "../config/axios";
import Markdown from "markdown-to-jsx";
// Import the syntax highlighter and a style
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  initializeSocket,
  disconnectSocket,
  subscribeToEvent,
  sendMessage,
  unsubscribeFromEvent,
} from "../config/socket";
import { UserContext } from "../context/user.context";
import { getWebContainer } from "../config/webContainers";
import Nav_2 from "./Nav_2";
// getWebContainer, createWebContainerFileSystem, runCommand, runDevServer
const fileSystem = {
  "index.html": {
    file: {
      contents: `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React Vite App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`,
    },
  },
  "package.json": {
    file: {
      contents: `
{
  "name": "react-vite-starter",
  "private": true,
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.0"
  }
}`,
    },
  },
  src: {
    directory: {
      "main.jsx": {
        file: {
          contents: `
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
        },
      },
      "App.jsx": {
        file: {
          contents: `
import React from 'react';

function App() {
  return (
    <h1>Hello, React! ⚛️</h1>
  );
}

export default App;`,
        },
      },
      "index.css": {
        file: {
          contents: `
body {
  font-family: sans-serif;
  display: grid;
  place-content: center;
  height: 100vh;
  margin: 0;
}`,
        },
      },
    },
  },
};

// Icons for File Explorer
const FolderIcon = ({ isOpen }) => (
  <svg
    className={`w-5 h-5 mr-2 text-purple-400 transition-transform duration-200 ${
      isOpen ? "transform rotate-90" : ""
    }`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

const FileIcon = () => (
  <svg
    className="w-5 h-5 mr-2 text-teal-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    ></path>
  </svg>
);

// Component for rendering syntax-highlighted code blocks
const CodeBlock = ({ className, children }) => {
  const language = className ? className.replace("lang-", "") : "javascript";
  return (
    <SyntaxHighlighter style={atomDark} language={language} PreTag="div">
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  );
};

// Recursive File Explorer Component - UPDATED
const FileTree = ({ items, onFileSelect, activeFile, level = 0 }) => {
  const [openFolders, setOpenFolders] = useState(["src"]); // Default open folders

  const toggleFolder = (name) => {
    setOpenFolders((prev) =>
      prev.includes(name) ? prev.filter((f) => f !== name) : [...prev, name]
    );
  };

  if (!items || typeof items !== "object") {
    return null; // Don't render if items is not a valid object
  }

  return (
    <ul className="pr-1">
      {Object.entries(items).map(([name, item]) => (
        <li key={name}>
          {/* Check for the 'directory' property to identify a folder */}
          {item.directory ? (
            <div>
              <div
                onClick={() => toggleFolder(name)}
                className="flex items-center px-2 py-1 cursor-pointer hover:bg-gray-700 rounded-md"
              >
                <FolderIcon isOpen={openFolders.includes(name)} />
                <span className="font-medium truncate">{name}</span>
              </div>
              {openFolders.includes(name) && (
                <div style={{ paddingLeft: `${(level + 1) * 15}px` }}>
                  {/* Recurse with the nested 'directory' object */}
                  <FileTree
                    items={item.directory}
                    onFileSelect={onFileSelect}
                    activeFile={activeFile}
                    level={level + 1}
                  />
                </div>
              )}
            </div>
          ) : (
            // This is a file, check for the 'file' property
            item.file && (
              <div
                // Pass a simplified object with name and contents
                onClick={() =>
                  onFileSelect({ name, contents: item.file.contents })
                }
                className={`flex items-center px-2 py-1 cursor-pointer rounded-md ${
                  activeFile === name ? "bg-purple-600/30" : "hover:bg-gray-700"
                }`}
                style={{ paddingLeft: `${(level + 1) * 15}px` }}
              >
                <FileIcon />
                <span className="truncate">{name}</span>
              </div>
            )
          )}
        </li>
      ))}
    </ul>
  );
};

export default function ContentPage() {
  const location = useLocation();
  const { project } = location.state;

  // State
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState([]);
  const [isChatVisible, setIsChatVisible] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [projectDetails, setProjectDetails] = useState(project);
  const [projectUsers, setProjectUsers] = useState([]);
  const [startCommand, setStartCommand] = useState({});
  const [serverUrl, setServerUrl] = useState("https://react.dev/");
  const [inputUrl, setInputUrl] = useState("https://react.dev/");
  const [isServerModalOpen, setIsServerModalOpen] = useState(false);
  const [buildCommand, setBuildCommand] = useState({});

  // WebContainer State
  const [webContainer, setWebContainer] = useState(null);
  const [terminalOutput, setTerminalOutput] = useState("");
  const [terminalOutput_2, setTerminalOutput_2] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const terminalRef = useRef(null);
  const [iframeUrl, setIframeUrl] = useState(null);

  const [runProcess, setRunProcess] = useState(null);

  const { user } = useContext(UserContext);

  // Manage fileSystem in state
  const [fileSystem, setFileSystem] = useState({});

  // VS Code Editor State - UPDATED
  const [openFiles, setOpenFiles] = useState([]);
  const [activeFile, setActiveFile] = useState("");
  const [editorContent, setEditorContent] = useState("");

  const saveFileSystem = async (ft) => {
    await axios
      .put("/projects/file-tree", {
        projectId: projectDetails._id,
        fileTree: ft,
      })
      .then((res) => {
        console.log("File tree updated on server");
      })
      .catch((err) => console.log(err));
  };

  const saveBuildCommand = async (bc) => {
    await axios
      .put("/projects/build-command", {
        projectId: projectDetails._id,
        buildCommand: bc,
      })
      .then((res) => {
        console.log("Build command updated on server");
      })
      .catch((err) => console.log(err));
  };
  const saveStartCommand = async (sc) => {
    await axios
      .put("/projects/start-command", {
        projectId: projectDetails._id,
        startCommand: sc,
      })
      .then((res) => {
        console.log("Start command updated on server");
      })
      .catch((err) => console.log(err));
  };
  const saveMessage = async (msg) => {
    await axios
      .put("/projects/messages", {
        projectId: projectDetails._id,
        message: msg, // Send 'message' key with the single message object
      })
      .then((res) => {
        console.log("Message saved on server");
      })
      .catch((err) => console.log(err));
  };

  // Effect to boot WebContainer on component mount
  useEffect(() => {
    getWebContainer().then((container) => {
      setWebContainer(container);

      // Listen for the server-ready event to get the preview URL
      container.on("server-ready", (port, url) => {
        console.log(`Server is ready at: ${url}`);
        setPreviewUrl(url);
      });
    });
  }, []);

  // Effect to auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  // Effect to set initial file when component mounts
  useEffect(() => {
    if (!webContainer) {
      getWebContainer().then((container) => {
        setWebContainer(container);
        console.log("container started");
      });
    }
  }, []); // Run only once on mount

  useEffect(() => {
    const currentFile = openFiles.find((f) => f.name === activeFile);
    setEditorContent(currentFile?.contents || "");
  }, [activeFile, openFiles]);

  useEffect(() => {
    initializeSocket(projectDetails._id);

    const handleNewMessage = (message) => {
      console.log("New message received:", message);

      if (message.sender._id === "_ai" && message.text.fileTree) {
        const newFileSystem = message.text.fileTree;

        setFileSystem(newFileSystem);
        saveFileSystem(newFileSystem);
        setStartCommand(message.text.startCommand);
        saveStartCommand(message.text.startCommand);
        setBuildCommand(message.text.buildCommand);
        saveBuildCommand(message.text.buildCommand);
        webContainer?.mount(message.fileTree);
        // Safely access the new file structure to open a default file
        const appFile = newFileSystem.src?.directory?.["App.jsx"];
        if (appFile && appFile.file) {
          const initialFile = {
            name: "App.jsx",
            contents: appFile.file.contents,
          };
          setOpenFiles([initialFile]);
          setActiveFile(initialFile.name);
        }
      }
      setMessages((prevMessages) => [...prevMessages, message]);
      saveMessage(message);
    };

    subscribeToEvent("project-message", handleNewMessage);

    axios
      .get(`/projects/get-project/${projectDetails._id}`)
      .then((res) => {
        const fetchedProject = res.data.project;
        setProjectDetails(fetchedProject);
        setProjectUsers(fetchedProject.users);
        if (fetchedProject.messages) setMessages(fetchedProject.messages);
        if (fetchedProject.fileTree) setFileSystem(fetchedProject.fileTree);
        if (fetchedProject.buildCommand)
          setBuildCommand(fetchedProject.buildCommand);
        if (fetchedProject.startCommand)
          setStartCommand(fetchedProject.startCommand);
      })
      .catch((err) => console.log(err));

    axios
      .get("/users/all")
      .then((res) => {
        setAllUsers(res.data.users);
      })
      .catch((err) => console.log(err));

    return () => {
      unsubscribeFromEvent("project-message");
      disconnectSocket();
    };
  }, [projectDetails._id]);

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setEditorContent(newContent);
    // Update the content using the correct property 'contents'
    const newOpenFiles = openFiles.map((file) =>
      file.name === activeFile ? { ...file, contents: newContent } : file
    );
    setFileSystem((prevFS) => {
      // Recursively update the content of the file in the fileSystem
      const updateFileContent = (fs, fileName, newContent) => {
        const updated = {};
        for (const key in fs) {
          const item = fs[key];
          if (item.file && key === fileName) {
            updated[key] = {
              ...item,
              file: {
                ...item.file,
                contents: newContent,
              },
            };
          } else if (item.directory) {
            updated[key] = {
              ...item,
              directory: updateFileContent(
                item.directory,
                fileName,
                newContent
              ),
            };
          } else {
            updated[key] = item;
          }
        }
        return updated;
      };
      return updateFileContent(prevFS, activeFile, newContent);
    });

    saveFileSystem(fileSystem);
    setOpenFiles(newOpenFiles);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && user) {
      // Only send the text. The server will add sender info.
      let messagePayload = { text: newMessage.trim() };
      sendMessage("project-message", { text: newMessage });
      setNewMessage("");
    }
  };

  function addCollaborators() {
    axios
      .put("/projects/add-user", {
        projectId: projectDetails._id,
        users: selectedUserId,
      })
      .then((res) => {
        console.log(res.data);
        // Refresh project users after adding
        setProjectUsers(res.data.users);
        setIsAddUserModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleAddUserClick = () => {
    setIsAddUserModalOpen(true);
    setSelectedUserId([]);
  };

  const colour = [
    "bg-green-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-indigo-500",
  ];

  const handleFileSelect = (file) => {
    if (!openFiles.find((f) => f.name === file.name)) {
      setOpenFiles([...openFiles, file]);
    }
    setActiveFile(file.name);
  };

  const handleCloseFile = (fileName, e) => {
    e.stopPropagation();
    const fileIndex = openFiles.findIndex((f) => f.name === fileName);
    const newOpenFiles = openFiles.filter((f) => f.name !== fileName);
    setOpenFiles(newOpenFiles);

    if (activeFile === fileName) {
      if (newOpenFiles.length === 0) {
        setActiveFile("");
      } else {
        // Activate the previous tab, or the first one if closing the first tab
        const newActiveIndex = Math.max(0, fileIndex - 1);
        setActiveFile(newOpenFiles[newActiveIndex].name);
      }
    }
  };

  const handleRun = async () => {
    // await webContainer.mount(fileSystem,startCommand)

    //                             const installProcess = await webContainer.spawn("npm", [ "install" ])

    //                             installProcess.output.pipeTo(new WritableStream({
    //                                 write(chunk) {
    //                                     console.log(chunk)
    //                                 }
    //                             }))

    //                             if (runProcess) {
    //                                 runProcess.kill()
    //                             }

    //                             let tempRunProcess = await webContainer.spawn(startCommand.mainItem, startCommand.commands);
    //                             const decoder=new TextDecoder()
    //                             tempRunProcess.output.pipeTo(new WritableStream({
    //                                 write(chunk) {
    //                                     console.log(decoder.decode(chunk))
    //                                 }
    //                             }))

    //                             setRunProcess(tempRunProcess)

    //                             webContainer.on('server-ready', (port, url) => {
    //                                 console.log(port, url)
    //                                 setIframeUrl(url)
    //                                 setServerUrl(url)
    //                                 setInputUrl(url)
    //                             })

    setIsRunning(true);
    setTerminalOutput("$ Setting up container...\n");
    setPreviewUrl(""); // Reset preview URL

    try {
      // 1. Write files
      setTerminalOutput((prev) => prev + "$ Writing files...\n");
      await webContainer.mount(fileSystem, startCommand);
      setTerminalOutput((prev) => prev + "✓ Files written successfully.\n\n");

      const handleOutput = (data) => {
        setTerminalOutput((prev) => prev + data);
      };

      // 2. Install dependencies using runCommand
      setTerminalOutput((prev) => prev + "$ npm install\n");
      const installProcess = await webContainer.spawn(
        buildCommand.mainItem,
        buildCommand.commands
      );
      installProcess.output.pipeTo(
        new WritableStream({
          write(chunk) {
            setTerminalOutput_2((prev) => {
              if (
                !(
                  chunk == "[1G" ||
                  chunk == "[2K" ||
                  chunk == "[1K" ||
                  chunk == "[90G" ||
                  chunk == "[90D" ||
                  chunk == "[1D" ||
                  chunk == "[2D" ||
                  chunk == "[0K" ||
                  chunk == "-"
                )
              ) {
                return prev + chunk;
              }
            });
            console.log(chunk);
          },
        })
      );
      if (runProcess) {
        runProcess.kill();
      }
      setTerminalOutput((prev) => prev + "\n✓ Dependencies installed.\n\n");

      // 3. Start the dev server using runDevServer
      setTerminalOutput(
        (prev) => prev + `$ npm ${startCommand.commands.join(" ")}\n`
      );
      let tempRunProcess = await webContainer.spawn(
        startCommand.mainItem,
        startCommand.commands
      );

      tempRunProcess.output.pipeTo(
        new WritableStream({
          write(chunk) {
            setTerminalOutput_2((prev) => {
              if (
                !(
                  chunk == "[1G" ||
                  chunk == "[2K" ||
                  chunk == "[1K" ||
                  chunk == "[90G" ||
                  chunk == "[90D" ||
                  chunk == "[1D" ||
                  chunk == "[2D" ||
                  chunk == "[0K" ||
                  chunk == "-"
                )
              ) {
                return prev + chunk;
              }
            });
            console.log(chunk);
          },
        })
      );

      setRunProcess(tempRunProcess);

      webContainer.on("server-ready", (port, url) => {
        console.log(port, url);
        setIframeUrl(url);
        setServerUrl(url);
        setInputUrl(url);
      });
    } catch (error) {
      console.error(error);
      setTerminalOutput((prev) => prev + `\nError: ${error.message}\n`);
      setIsRunning(false);
    }
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    setServerUrl(inputUrl);
  };

  const handleSeeServerClick = () => {
    setInputUrl(serverUrl);
    setIsServerModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white font-sans w-full pt-16">
      <style>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      <Nav_2></Nav_2>
      {/* Server Preview Modal */}
      {isServerModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-white/10 rounded-2xl p-4 w-full max-w-5xl h-[85vh] shadow-2xl flex flex-col">
            <div className="flex justify-between items-center mb-4 flex-shrink-0">
              <h3 className="text-xl font-bold">Server Preview</h3>
              <button
                onClick={() => setIsServerModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form
              onSubmit={handleUrlSubmit}
              className="flex gap-2 mb-4 flex-shrink-0"
            >
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-2 placeholder-gray-400 transition"
                placeholder="https://example.com"
              />
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg transition"
              >
                Go
              </button>
            </form>
            <div className="flex-grow bg-white rounded-lg overflow-hidden">
              <iframe
                src={serverUrl}
                className="w-full h-full border-0"
                title="Server Preview"
                sandbox="allow-scripts allow-same-origin"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add User to Project</h3>
              <button
                onClick={() => setIsAddUserModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="my-4">
              <p className="text-gray-400 text-sm mb-2">
                Select a user to add to Project Alpha.
              </p>
              <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {allUsers.map((user) => (
                  <li
                    key={user._id}
                    onClick={() =>
                      setSelectedUserId([...selectedUserId, user._id])
                    }
                    className={`flex items-center gap-4 p-3 m-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                      selectedUserId.indexOf(user._id) != -1
                        ? "bg-purple-600 ring-2 ring-purple-400"
                        : "hover:bg-gray-700"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full ${colour[3]} flex items-center justify-center font-bold text-lg`}
                    >
                      {user.email[0]}
                    </div>
                    <span className="font-medium">{user.email}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsAddUserModalOpen(false)}
                className="py-2 px-4 bg-gray-600 hover:bg-gray-500 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                disabled={!selectedUserId}
                onClick={addCollaborators}
                className="py-2 px-4 bg-purple-600 hover:bg-purple-500 rounded-lg transition disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                Add User
              </button>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        </button>
      )}

      {/* Main Page Layout */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Side: Chat Bar */}
        <aside
          className={`relative flex flex-col bg-gray-800/50 border-r border-white/10 overflow-hidden transition-all duration-300 ease-in-out ${
            isChatVisible ? "w-1/4" : "w-0 p-0 border-none"
          }`}
        >
          {/* Sliding User Panel */}
          <div
            className={`absolute top-0 left-0 right-0 bg-gray-900 p-4 transition-transform duration-300 ease-in-out z-20 ${
              isUserPanelOpen ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Project Members</h2>
              <button
                onClick={() => setIsUserPanelOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <ul className="space-y-3">
              {Array.isArray(projectUsers) && projectUsers.length > 0 ? (
                projectUsers.map((user) => (
                  <li key={user._id} className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full ${colour[2]} flex items-center justify-center font-bold text-sm`}
                    >
                      {user.email[0]}
                    </div>
                    <span>{user.email}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-400">No users in this project.</li>
              )}
            </ul>
            <button
              onClick={handleAddUserClick}
              className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l text-white font-semibold py-2 px-4 rounded-lg transition-transform transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l-2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 00-.517-3.86l-2.387-.477zM12 12a3 3 0 100-6 3 3 0 000 6z"
                />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-100">{project.name}</h1>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender.email === user.email
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-xl max-w-xs ${
                    msg.sender.email === user.email
                      ? "bg-purple-600"
                      : "bg-gray-700"
                  }`}
                >
                  <small className="text-xs text-gray-400">
                    {msg.sender.email}
                  </small>
                  {/* Use a div to avoid nested <p> tags and apply Markdown correctly */}
                  <div className="text-sm mt-1 prose prose-invert">
                    {msg.sender._id === "_ai" ? (
                      <Markdown options={{ overrides: { code: CodeBlock } }}>
                        {msg.text.text || ""}
                      </Markdown>
                    ) : (
                      <p>{msg.text}</p>
                    )}
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
              <button
                type="submit"
                className="bg-gradient-to-r from-teal-400 to-blue-500 text-white p-3 rounded-lg hover:scale-105 transition-transform"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </div>
        </aside>

        <main
          className={`h-full flex flex-col bg-[#1e1e1e] transition-all duration-300 ease-in-out ${
            isChatVisible ? "w-3/4" : "w-full"
          }`}
        >
          <div className="flex h-full">
            {/* File Explorer */}
            <div className="w-1/3 bg-[#252526] p-2 text-sm text-gray-300 flex flex-col overflow-y-auto">
              <div className="flex justify-between items-center p-2 flex-shrink-0">
                <h2 className="font-bold text-gray-200">EXPLORER</h2>
                {isChatVisible && (
                  <button
                    onClick={() => setIsChatVisible(false)}
                    className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
                    title="Hide Chat Panel"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <div className="flex-grow overflow-y-auto">
                {/* The initial call now correctly passes the object */}
                <FileTree
                  items={fileSystem}
                  onFileSelect={handleFileSelect}
                  activeFile={activeFile}
                />
              </div>
            </div>

            {/* Editor and Preview/Terminal Area */}
            <div className="w-2/3 flex flex-col">
              {/* Open Files Tabs */}
              <div className="flex bg-[#2D2D2D] overflow-x-auto border-b border-gray-700">
                {openFiles.map((file) => (
                  <div
                    key={file.name}
                    onClick={() => setActiveFile(file.name)}
                    className={`flex items-center p-2 px-4 cursor-pointer border-r border-t-2 ${
                      activeFile === file.name
                        ? "bg-[#1e1e1e] border-[#3c3c3c] border-t-purple-400 text-white"
                        : "bg-[#2D2D2D] border-transparent text-gray-400"
                    }`}
                  >
                    <span>{file.name}</span>
                    <button
                      onClick={(e) => handleCloseFile(file.name, e)}
                      className="ml-3 text-gray-500 hover:text-white rounded-full hover:bg-gray-600 p-0.5"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              {/* Editor */}
              <div className="flex-1 p-4 bg-[#1e1e1e] hide-scrollbar">
                <textarea
                  value={editorContent}
                  onChange={handleContentChange}
                  className="w-full h-full bg-transparent text-gray-300 font-mono text-sm resize-none outline-none"
                  disabled={!activeFile}
                />
              </div>

              {/* Terminal and Preview */}
              <div className="h-1/3 flex flex-col border-t-2 border-gray-700">
                <div
                  className="flex-1 bg-[#181818] p-2 font-mono text-xs text-gray-300 overflow-y-auto"
                  ref={terminalRef}
                >
                  <pre className="whitespace-pre-wrap">
                    {terminalOutput}
                    {terminalOutput_2}
                  </pre>
                </div>
                {previewUrl && (
                  <div className="flex-1 border-t-2 border-gray-700">
                    <iframe
                      src={previewUrl}
                      className="w-full h-full bg-white"
                      title="Live Preview"
                    ></iframe>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* Save and Run Buttons */}
      <div className="absolute bottom-8 right-8 flex shadow-2xl z-40 rounded-lg overflow-hidden">
        <button
          title="See Your Server"
          onClick={handleSeeServerClick}
          className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-4 flex items-center gap-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-800"
          disabled={openFiles.length === 0}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path
              fillRule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clipRule="evenodd"
            />
          </svg>
          <span>Server</span>
        </button>
        <div className="w-px bg-gray-600"></div>
        <button
          title="Run Code"
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-4 flex items-center gap-2 transition-all duration-200 transform group hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:from-purple-500 disabled:hover:to-pink-500"
          disabled={openFiles.length === 0}
          onClick={handleRun}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
          <span>Run</span>
        </button>
      </div>
    </div>
  );
}
