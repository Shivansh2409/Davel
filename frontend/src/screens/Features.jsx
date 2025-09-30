import React from "react";
import Nav from "./Nav";

// Icon components for features
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
const CodeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-purple-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  </svg>
);

const ChatIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-pink-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

const ServerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-teal-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
    />
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-blue-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const FileExplorerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-indigo-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
    />
  </svg>
);

const ResponsiveIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-rose-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    />
  </svg>
);

// Main component for the Features page
export default function Features() {
  const features = [
    {
      icon: <CodeIcon />,
      title: "Live Code Editor",
      description:
        "Experience a seamless, VS Code-like editor right in your browser. Write, edit, and manage your code with an intuitive interface and a familiar feel.",
    },
    {
      icon: <ChatIcon />,
      title: "Real-Time Collaboration",
      description:
        "Communicate with your team instantly using the integrated chat. Share code snippets, discuss ideas, and stay in sync without switching contexts.",
    },
    {
      icon: <ServerIcon />,
      title: "Instant Server Preview",
      description:
        "Instantly preview your running applications. With the built-in iframe modal, you can see your changes live and test your work in a real environment.",
    },
    {
      icon: <FileExplorerIcon />,
      title: "Integrated File Explorer",
      description:
        "Navigate your project structure with ease. The built-in file explorer allows you to manage your files and folders just like in your favorite desktop editor.",
    },
    {
      icon: <UserIcon />,
      title: "User & Team Management",
      description:
        "Easily manage your profile and team members. Add new users to projects, view member lists, and keep your team organized effortlessly.",
    },
    {
      icon: <ResponsiveIcon />,
      title: "Fully Responsive Design",
      description:
        "Work from anywhere, on any device. The entire platform is built to be fully responsive, providing a seamless experience on desktop, tablet, and mobile.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans w-full overflow-x-hidden pt-16">
      <Nav />
      <style>{`
        .animate-gradient-text {
          background-size: 200% 200%;
          animation: gradient-animation 5s ease-in-out infinite;
        }
        @keyframes gradient-animation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <div className="container mx-auto px-6 py-16">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-gradient-text">
            Features Built for Developers
          </h1>
          <p className="text-gray-400 mt-4 text-lg max-w-3xl mx-auto">
            Devel AI provides a powerful, all-in-one environment designed to
            streamline your workflow and enhance team collaboration.
          </p>
        </header>

        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-lg border border-white/10 rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10"
              >
                <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-gray-900/80 mb-6 border border-white/10">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-100 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
      <footer className="border-t border-white/10 py-8">
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
