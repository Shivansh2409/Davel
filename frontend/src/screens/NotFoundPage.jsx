import React from "react";
import { useNavigate } from "react-router-dom";

// Icon for the button
const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans w-full flex items-center justify-center text-center overflow-hidden">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        @keyframes gradient-animation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .pulse-animation { animation: pulse 4s ease-in-out infinite; }
        .animate-gradient-text {
          background-size: 200% 200%;
          animation: gradient-animation 5s ease-in-out infinite;
        }
        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.6s; }
      `}</style>

      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 z-10">
        <div className="relative mb-8 opacity-0 fade-in-up">
          <h1 className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-400 to-sky-500 animate-gradient-text">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center pulse-animation">
            <div className="w-64 h-64 md:w-80 md:h-80 border-2 border-cyan-500/20 rounded-full"></div>
          </div>
          <div
            className="absolute inset-0 flex items-center justify-center pulse-animation"
            style={{ animationDelay: "2s" }}
          >
            <div className="w-80 h-80 md:w-96 md:h-96 border border-teal-500/10 rounded-full"></div>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mt-4 opacity-0 fade-in-up delay-1">
          Page Under Construction
        </h2>
        <p className="text-gray-400 mt-4 text-lg max-w-xl mx-auto opacity-0 fade-in-up delay-2">
          Oops! It looks like you've found a section of Devel AI that's still in
          the workshop. We're working hard to build this feature, and it will be
          available soon!
        </p>
        <div className="mt-10 opacity-0 fade-in-up delay-3">
          <a
            href="#"
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center text-lg font-semibold bg-gradient-to-r from-teal-400 to-cyan-500 text-white py-3 px-8 rounded-full shadow-lg shadow-cyan-500/20 transform hover:scale-105 hover:shadow-cyan-500/40 transition-all duration-300"
          >
            <HomeIcon />
            <span>Return to Projectpage</span>
          </a>
        </div>
      </div>
    </div>
  );
}
