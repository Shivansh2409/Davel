import React from "react";
import Nav from "./Nav";

// Icon components for features
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
    </div>
  );
}
