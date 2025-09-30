import React from "react";
import Nav from "./Nav";

// Icons for skills
const FrontendIcon = () => (
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
const BackendIcon = () => (
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
      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
    />
  </svg>
);
const DevOpsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-teal-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
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
const LinkedinIcon = () => (
  <svg
    className="w-6 h-6"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
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
const PortfolioIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
    />
  </svg>
);

export default function AboutPage() {
  const skills = [
    {
      icon: <FrontendIcon />,
      title: "Frontend",
      techs: "React, Next.js, TailwindCSS, Vue",
    },
    {
      icon: <BackendIcon />,
      title: "Backend",
      techs: "Node.js, Python, Go, SQL, NoSQL",
    },
    {
      icon: <DevOpsIcon />,
      title: "DevOps",
      techs: "Docker, Kubernetes, AWS, GCP",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans w-full overflow-x-hidden pt-16">
      <Nav />
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.6s; }
      `}</style>
      <div className="container mx-auto px-6 py-16">
        <header className="text-center mb-16 opacity-0 fade-in-up">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            About The Creator
          </h1>
          <p className="text-gray-400 mt-4 text-lg max-w-3xl mx-auto">
            The mind and hands behind the Devel AI platform.
          </p>
        </header>

        <main className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          <div className="w-full lg:w-1/3 opacity-0 fade-in-up delay-1">
            <div className="relative mx-auto w-64 h-64 lg:w-80 lg:h-80 group">
              <div className="absolute -inset-2.5 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full blur-xl opacity-60 group-hover:opacity-80 transition duration-500"></div>
              <div className="absolute inset-0 bg-gray-800 rounded-full"></div>
              <img
                src="../public/WhatsApp Image 2025-09-29 at 19.00.20.jpeg"
                alt="Creator of Devel AI"
                className="relative rounded-full w-full h-full object-cover border-4 border-gray-700 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-0 -left-4 w-16 h-16 border-t-2 border-l-2 border-teal-500/50 rounded-tl-full opacity-50 group-hover:opacity-100 transition duration-500 transform group-hover:-rotate-12"></div>
              <div className="absolute bottom-0 -right-4 w-16 h-16 border-b-2 border-r-2 border-cyan-500/50 rounded-br-full opacity-50 group-hover:opacity-100 transition duration-500 transform group-hover:rotate-12"></div>
            </div>
          </div>
          <div className="w-full lg:w-2/3 text-center lg:text-left opacity-0 fade-in-up delay-2">
            <h2 className="text-3xl font-bold text-gray-100 mb-2">
              Hello! I'm the creator of Devel AI.
            </h2>
            <h3 className="text-xl font-medium text-purple-400 mb-4">
              A Passionate Full-Stack Developer
            </h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              As a full-stack developer, I thrive on bringing ideas to life
              through code. Devel AI was born from a desire to create a
              seamless, powerful, and beautiful environment where developers can
              collaborate and build amazing things without friction. My journey
              in tech is driven by a love for elegant solutions, clean design,
              and the endless possibilities of software.
            </p>
            <p className="text-gray-400 leading-relaxed">
              This platform is a testament to that passion, combining modern web
              technologies to create an experience that is both functional and
              enjoyable to use.
            </p>
            <div className="mt-8">
              <a
                href="https://my-portfolio-mauve-seven-88.vercel.app/"
                target="_blank"
                className="inline-flex items-center gap-3 text-lg font-semibold bg-gradient-to-r from-teal-400 to-cyan-500 text-white py-3 px-8 rounded-full shadow-lg shadow-cyan-500/20 transform hover:scale-105 hover:shadow-cyan-500/40 transition-all duration-300"
              >
                <PortfolioIcon />
                <span>View My Portfolio</span>
              </a>
            </div>
          </div>
        </main>

        <section className="text-center mb-20 opacity-0 fade-in-up delay-3">
          <h2 className="text-3xl font-bold mb-8">My Tech Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {skills.map((skill) => (
              <div
                key={skill.title}
                className="bg-gray-800/50 backdrop-blur-lg border border-white/10 rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/10"
              >
                <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-gray-900/80 mb-4 border border-white/10 mx-auto">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-100 mb-2">
                  {skill.title}
                </h3>
                <p className="text-gray-400">{skill.techs}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="text-center opacity-0 fade-in-up delay-3">
          <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Feel free to reach out. I'm always open to discussing new projects,
            creative ideas, or opportunities to be part of an ambitious vision.
          </p>
          <div className="flex justify-center items-center gap-6">
            <a
              href="https://github.com/Shivansh2409"
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              <GithubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/shivanshrathor/"
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              <LinkedinIcon />
            </a>
            <a
              href="https://my-portfolio-mauve-seven-88.vercel.app/"
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              <TwitterIcon />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
