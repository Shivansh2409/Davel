import React from "react";
import Nav from "./Nav";

// Main component for the "How to Use" page
export default function help() {
  // Data for the steps to make it easily scalable
  const steps = [
    {
      title: "Collaborate in Real-Time",
      description:
        "Use the integrated chat panel on the left to communicate instantly with your project members. Share ideas, ask questions, and stay in sync without ever leaving your workspace. Click on the project name to view and manage team members.",
      imageUrl:
        "https://placehold.co/600x400/1F2937/a78bfa?text=Real-Time+Chat",
      imageAlt: "Real-time chat collaboration interface",
    },
    {
      title: "Code in the Integrated Editor",
      description:
        "Enjoy a familiar, VS Code-like experience with the built-in editor. Navigate your project with the file explorer, open multiple files in tabs, and write or edit your code directly in the browser. The editor is designed to be intuitive and powerful.",
      imageUrl: "https://placehold.co/600x400/1F2937/f472b6?text=Code+Editor",
      imageAlt: "Integrated code editor with file explorer",
    },
    {
      title: "Preview Your Server Instantly",
      description:
        'Click the "Server" button at the bottom-right to open a live preview modal. You can enter any URL to load your development server, a staging environment, or any live website directly within the app, making it easy to test and review your work.',
      imageUrl:
        "https://placehold.co/600x400/1F2937/60a5fa?text=Server+Preview",
      imageAlt: "Modal showing a live server preview",
    },
    {
      title: "Manage Your Profile & Settings",
      description:
        "Access your user profile by clicking your avatar in the top-right corner. View your stats, edit your information, and manage your settings all from a sleek, modern modal that keeps you in control of your account.",
      imageUrl: "https://placehold.co/600x400/1F2937/818cf8?text=User+Profile",
      imageAlt: "User profile management modal",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans w-full pt-16">
      <Nav />
      <div className="container mx-auto px-6 py-12">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            How to Use Devel AI
          </h1>
          <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
            A quick guide to help you get the most out of your collaborative
            coding environment.
          </p>
        </header>

        <main className="space-y-20">
          {steps.map((step, index) => (
            <section
              key={index}
              className={`flex flex-col md:flex-row items-center gap-12 ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image Section */}
              <div className="w-full md:w-1/2">
                <img
                  src={step.imageUrl}
                  alt={step.imageAlt}
                  className="rounded-2xl shadow-2xl shadow-purple-500/10 w-full h-auto object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2">
                <span className="text-purple-400 font-bold">
                  STEP {index + 1}
                </span>
                <h2 className="text-3xl font-bold mt-2 mb-4 text-gray-100">
                  {step.title}
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}
