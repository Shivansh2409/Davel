import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/user.context";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

const GithubIcon = () => (
  <svg
    className="w-6 h-6"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z"
      clipRule="evenodd"
    />
  </svg>
);
const TwitterIcon = () => (
  <svg
    className="w-6 h-6"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.298 1.634 4.212 3.793 4.649-.65.177-1.336.213-2.033.184-2.116-2.24-5.34-3.355-8.541-3.355-2.7 0-5.282.523-7.534 1.489 2.44 1.566 5.334 2.483 8.441 2.483 10.133 0 15.678-8.405 15.678-15.678 0-.238-.005-.476-.015-.712.947-.684 1.772-1.536 2.427-2.518z" />
  </svg>
);

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
          alert(`Try another name. This one is taken.`);
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

      <footer className="border-t border-white/10 py-8 mt-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div>
            <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-cyan-500">
              Devel AI
            </div>
            <p className="text-gray-500 mt-1 text-sm">
              &copy; 2025 Devel AI. All rights reserved.
            </p>
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <TwitterIcon />
            </a>
            <a
              href="https://github.com/Shivansh2409"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <GithubIcon />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
