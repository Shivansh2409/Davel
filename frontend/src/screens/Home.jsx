import React from "react";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";

// Icons for the page
const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 ml-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
);
const PlayIcon = () => (
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
      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// Feature Icons
const CodeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-teal-300"
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
    className="h-8 w-8 text-sky-400"
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
const DeployIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-cyan-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
    />
  </svg>
);

// Social Media Icons
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

export default function Home() {
  const codeSnippet = `
import { createServer } from 'vixeny';

const app = createServer({
  // Your server configuration...
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
  `.trim();
  const navigate = useNavigate();

  const features = [
    {
      icon: <CodeIcon />,
      title: "Intuitive Editor",
      description:
        "A VS Code-like editor that feels familiar and powerful right from the start.",
    },
    {
      icon: <ChatIcon />,
      title: "Seamless Chat",
      description:
        "Collaborate in real-time with integrated chat, keeping conversations in context.",
    },
    {
      icon: <DeployIcon />,
      title: "One-Click Previews",
      description:
        "Instantly preview your servers and applications without ever leaving your workspace.",
    },
  ];

  return (
    <div className="bg-gray-900 text-white font-sans w-full overflow-x-hidden">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes gradient-animation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .floating-editor { animation: float 6s ease-in-out infinite; }
        .animate-gradient-text {
          background-size: 200% 200%;
          animation: gradient-animation 5s ease-in-out infinite;
        }
        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.6s; }
      `}</style>

      {/* Header */}
      <Nav />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-grid-gray-800/20 [mask-image:linear-gradient(to_bottom,white_5%,transparent_80%)]"></div>
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto text-center px-6 z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-400 to-sky-500 animate-gradient-text opacity-0 fade-in-up">
            Build, Collaborate, Deploy.
          </h1>
          <p className="text-gray-400 mt-6 text-lg md:text-xl max-w-3xl mx-auto opacity-0 fade-in-up delay-1">
            The ultimate collaborative coding environment that brings your
            team's workflow into a single, seamless platform. Write code, chat
            in real-time, and deploy your projects faster than ever before.
          </p>
          <div className="mt-10 flex justify-center gap-4 opacity-0 fade-in-up delay-2">
            <a
              href="#"
              onClick={() => navigate("/register")}
              className="inline-flex items-center text-lg font-semibold bg-gradient-to-r from-teal-400 to-cyan-500 text-white py-3 px-8 rounded-full shadow-lg shadow-cyan-500/20 transform hover:scale-105 hover:shadow-cyan-500/40 transition-all duration-300"
            >
              <span>Start Building</span>
              <ArrowRightIcon />
            </a>
            <a
              href="#"
              onClick={() => navigate("/about")}
              className="inline-flex items-center gap-3 text-lg font-semibold bg-gray-800/80 backdrop-blur-sm border border-white/10 text-white py-3 px-8 rounded-full shadow-lg transform hover:scale-105 hover:border-white/20 transition-all duration-300"
            >
              <PlayIcon />
              <span>About</span>
            </a>
          </div>

          <div className="relative mt-20 lg:mt-24 w-full max-w-4xl mx-auto opacity-0 fade-in-up delay-3">
            <div className="absolute -inset-2.5 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-2xl blur-xl opacity-20 floating-editor"></div>
            <div className="relative bg-[#1A2238]/80 backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl p-4 floating-editor">
              <div className="flex items-center mb-3">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 text-center text-sm text-gray-500">
                  <span>/src/server.js</span>
                </div>
              </div>
              <div className="text-left bg-transparent rounded-md text-sm">
                <pre>
                  <code className="language-javascript text-gray-300">
                    {codeSnippet}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">A Workflow You'll Love</h2>
            <p className="text-gray-400 mt-2">
              Everything you need, all in one place.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-xl bg-gray-900/80 mb-6 border border-white/10">
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-white/10 rounded-2xl text-center p-12">
            <h2 className="text-4xl font-bold">
              Ready to Revolutionize Your Workflow?
            </h2>
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
              Join today and experience the future of collaborative development.
              It's free to get started.
            </p>
            <div className="mt-8">
              <a
                href="#"
                className="inline-flex items-center text-lg font-semibold bg-gradient-to-r from-teal-400 to-cyan-500 text-white py-3 px-8 rounded-full shadow-lg shadow-cyan-500/20 transform hover:scale-105 hover:shadow-cyan-500/40 transition-all duration-300"
              >
                <span>Get Started for Free</span>
                <ArrowRightIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
