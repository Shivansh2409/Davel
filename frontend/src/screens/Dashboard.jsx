import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/user.context";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [project, setProject] = useState([]);

  const { user } = useContext(UserContext);
  const navigateTo = useNavigate();

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (projectName.trim()) {
      console.log("Creating project:", projectName);

      axios
        .post("/projects/create", {
          name: projectName,
        })
        .then((res) => {
          setProject((prevProjects) => [...prevProjects, res.data]);
          setIsModalOpen(false);
          setProjectName("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    axios
      .get("/projects/all")
      .then((res) => {
        console.log("Projects fetched:", res.data.projects);
        setProject(res.data.projects);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const col = ["purple", "pink", "teal"];

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans w-full overflow-x-hidden pt-16">
      <Nav />
      <main className="container mx-auto px-4 pt-32">
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h1 className="text-4xl font-bold text-gray-100">My Projects</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-teal-400 to-blue-500 hover:bg-gradient-to-l text-white font-semibold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 shadow-lg flex items-center gap-2 w-full md:w-auto justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            New Project
          </button>
        </header>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {project.map((project, indx) => (
            <div
              onClick={() => navigateTo("/project", { state: { project } })}
              className={`bg-gray-800 p-6 rounded-2xl shadow-lg border border-white/10 hover:border-${
                col[indx % 3]
              }-500 transition-all duration-300 cursor-pointer`}
            >
              <h2
                className={`text-2xl font-bold text-${col[indx % 3]}-400 mb-2`}
              >
                {project.name}
              </h2>
              <p className="text-gray-400 mb-4">
                Web development project for a client.
              </p>
              <div className="text-sm text-gray-500">
                Number Of Participants:{project.users.length}
              </div>
            </div>
          ))}
          {/* Example project cards */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-white/10 hover:border-purple-500 transition-all duration-300 cursor-pointer">
            <h2 className="text-2xl font-bold text-purple-400 mb-2">
              Project Alpha
            </h2>
            <p className="text-gray-400 mb-4">
              Web development project for a client.
            </p>
            <div className="text-sm text-gray-500">
              Last updated: 3 hours ago
            </div>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-white/10 hover:border-pink-500 transition-all duration-300 cursor-pointer">
            <h2 className="text-2xl font-bold text-pink-400 mb-2">
              Project Beta
            </h2>
            <p className="text-gray-400 mb-4">
              Mobile app design and prototyping.
            </p>
            <div className="text-sm text-gray-500">Last updated: 1 day ago</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-white/10 hover:border-teal-500 transition-all duration-300 cursor-pointer">
            <h2 className="text-2xl font-bold text-teal-400 mb-2">
              Project Gamma
            </h2>
            <p className="text-gray-400 mb-4">
              Internal tool for data analysis.
            </p>
            <div className="text-sm text-gray-500">
              Last updated: 5 days ago
            </div>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/10 transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-100 mb-6">
              Create a New Project
            </h2>

            {/* Project Name Input */}
            <div>
              <label
                htmlFor="projectName"
                className="text-sm font-medium text-gray-400 mb-2 block"
              >
                Project Name
              </label>
              <input
                id="projectName"
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="My Awesome Project"
                className="w-full bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-3 placeholder-gray-400 transition"
                autoFocus
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                className="text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-teal-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-transform transform hover:scale-105"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
