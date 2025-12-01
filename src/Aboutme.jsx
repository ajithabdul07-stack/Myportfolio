import React, { useState } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Code2, Database, Server, Zap } from 'lucide-react';
import tictactoe from "./assets/tictactoe.PNG"
import ecommerce from "./assets/ecommerce.PNG"
import llm from "./assets/llm.PNG"
import rs from "./assets/rs.PNG"
import hospital from "./assets/hospital.PNG"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  const startTour = () => {
    // Define tour steps
    const steps = [
      { id: 'about-section', title: 'About Me', description: 'Learn about my background, experience, and passion for full-stack development and AI integration.' },
      { id: 'projects-heading', title: 'My Projects', description: 'Explore my portfolio of projects showcasing expertise in web development, AI, and database management.' },
      { id: 'skills', title: 'Skills & Technologies', description: 'Check out the comprehensive list of technologies and tools I work with across frontend, backend, and DevOps.' },
      { id: 'contact', title: 'Contact Me', description: 'Ready to collaborate? Reach out through any of these channels to discuss opportunities and projects.' }
    ];

    let currentStep = 0;

    const showStep = (stepIndex) => {
      // Remove any existing overlay
      const existingOverlay = document.getElementById('tour-overlay');
      if (existingOverlay) existingOverlay.remove();

      if (stepIndex >= steps.length) {
        // Show thank you message
        showThankYou();
        return;
      }

      const step = steps[stepIndex];
      const element = document.getElementById(step.id);
      
      if (!element) {
        showStep(stepIndex + 1);
        return;
      }

      // Scroll to element
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });

      setTimeout(() => {
        const rect = element.getBoundingClientRect();
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'tour-overlay';
        overlay.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.75);
          z-index: 9998;
          backdrop-filter: blur(4px);
        `;

        // Create highlight
        const highlight = document.createElement('div');
        highlight.style.cssText = `
          position: fixed;
          top: ${rect.top - 10}px;
          left: ${rect.left - 10}px;
          width: ${rect.width + 20}px;
          height: ${rect.height + 20}px;
          border: 3px solid #3b82f6;
          border-radius: 12px;
          z-index: 9999;
          pointer-events: none;
          box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.75), 0 0 20px rgba(59, 130, 246, 0.5);
        `;

        // Calculate popup position - place it below element if there's space, otherwise above
        let popupTop = rect.bottom + 20;
        const popupHeight = 250; // Approximate popup height
        
        if (popupTop + popupHeight > window.innerHeight) {
          // Not enough space below, place above
          popupTop = rect.top - popupHeight - 20;
        }

        // Create popup
        const popup = document.createElement('div');
        popup.style.cssText = `
          position: fixed;
          top: ${popupTop}px;
          left: 50%;
          transform: translateX(-50%);
          width: 400px;
          max-width: calc(100vw - 40px);
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 16px;
          padding: 24px;
          z-index: 10000;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        `;

        popup.innerHTML = `
          <div style="margin-bottom: 12px; color: #1e40af; font-weight: 600; font-size: 12px;">
            Step ${stepIndex + 1} of ${steps.length}
          </div>
          <h3 style="margin: 0 0 12px 0; font-size: 24px; font-weight: bold; color: #1e293b;">${step.title}</h3>
          <p style="margin: 0 0 20px 0; font-size: 16px; color: #475569; line-height: 1.6;">${step.description}</p>
          <div style="display: flex; gap: 12px; justify-content: flex-end; flex-wrap: wrap;">
            ${stepIndex > 0 ? '<button id="tour-prev" style="padding: 10px 20px; background: #e2e8f0; color: #1e293b; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s;">Previous</button>' : ''}
            <button id="tour-skip" style="padding: 10px 20px; background: transparent; color: #64748b; border: 1px solid #cbd5e1; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s;">Skip</button>
            <button id="tour-next" style="padding: 10px 20px; background: linear-gradient(to right, #3b82f6, #1d4ed8); color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);">${stepIndex === steps.length - 1 ? 'Finish' : 'Next'}</button>
          </div>
        `;

        document.body.appendChild(overlay);
        document.body.appendChild(highlight);
        document.body.appendChild(popup);

        // Add event listeners
        const nextBtn = document.getElementById('tour-next');
        const skipBtn = document.getElementById('tour-skip');
        const prevBtn = document.getElementById('tour-prev');

        nextBtn.onclick = () => {
          overlay.remove();
          highlight.remove();
          popup.remove();
          showStep(stepIndex + 1);
        };

        skipBtn.onclick = () => {
          overlay.remove();
          highlight.remove();
          popup.remove();
        };

        if (prevBtn) {
          prevBtn.onclick = () => {
            overlay.remove();
            highlight.remove();
            popup.remove();
            showStep(stepIndex - 1);
          };
        }

        // Close on overlay click
        overlay.onclick = () => {
          overlay.remove();
          highlight.remove();
          popup.remove();
        };
      }, 500);
    };

    const showThankYou = () => {
      const popup = document.createElement('div');
      popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 400px;
        max-width: calc(100vw - 40px);
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.8);
        border-radius: 16px;
        padding: 32px;
        z-index: 10000;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        text-align: center;
      `;

      popup.innerHTML = `
        <div style="font-size: 48px; margin-bottom: 16px;"></div>
        <h3 style="margin: 0 0 12px 0; font-size: 24px; font-weight: bold; color: #1e293b;">Thanks for Visiting!</h3>
        <p style="margin: 0 0 24px 0; font-size: 16px; color: #475569; line-height: 1.6;">Feel free to explore the portfolio at your own pace. I look forward to connecting with you!</p>
        <button id="tour-close" style="padding: 12px 24px; background: linear-gradient(to right, #3b82f6, #1d4ed8); color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);">Got it!</button>
      `;

      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.75);
        z-index: 9998;
        backdrop-filter: blur(4px);
      `;

      document.body.appendChild(overlay);
      document.body.appendChild(popup);

      document.getElementById('tour-close').onclick = () => {
        overlay.remove();
        popup.remove();
      };

      overlay.onclick = () => {
        overlay.remove();
        popup.remove();
      };
    };

    showStep(0);
  };

  const projects = [
    {
      id: 1,
      title: "TIC-TAC-TOE",
      description: "A classic Tic Tac Toe game built with modern web technologies. Play against a friend and enjoy a smooth, responsive gaming experience.",
      tech: ["React js", "Vite", "Tailwind CSS"],
      link: "/tic-tac-toe",
      image: tictactoe
    },
    {
      id: 2,
      title: "Ecommerce Website",
      description: "A modern e-commerce platform for tech accessories and office equipment with real-time search, filtering, and shopping cart functionality.",
      tech: ["React js", "Express js", "MySQL", "REST Api", "Tailwind CSS"],
      link: "/ecommerce",
      image: ecommerce
    },
    {
      id: 3,
      title: "LLM Chat Bot",
      description: "Chat with our intelligent LLM bot for instant support and product information",
      tech: ["React js", "REST API", "Fast API", "Mongodb", "Tailwind CSS"],
      link: "/chatbot",
      image: llm
    },
    {
      id: 4,
      title: "AI Based Recommendation System",
      description: "An intelligent recommendation system that uses AI to personalize suggestions based on your preferences and behaviors. Whether it's products, movies, or music, enjoy tailored recommendations that improve over time.",
      tech: ["React Js", "MongoDB", "Flask", "REST Api", "Tailwind CSS"],
      link: "/recommendation-system",
      image: rs
    },
    {
      id: 5,
      title: "Hospital Patient Management System",
      description: "A streamlined system for managing patient records, appointments, and medical data. Designed to improve hospital workflows with an intuitive interface and efficient, real-time data handling.",
      tech: ["Sqlite", "Django", "Tailwind CSS"],
      link: "/patient",
      image: hospital
    },
    {
    id: 6,
    title: "Next Project",
    description: "Currently working on a new project to add to my portfolio.",
    tech: [],
    link: "#",
    image: ""
    }
  ];

  const skills = [
    {
      category: "Frontend",
      icon: Code2,
      items: ["React.js", "Next.js", "Tailwind CSS", "JavaScript", "TypeScript", "Redux"]
    },
    {
      category: "Backend",
      icon: Server,
      items: ["Node.js", "Express", "REST APIs", "Authentication", "Microservices"]
    },
    {
      category: "Database",
      icon: Database,
      items: ["MongoDB", "PostgreSQL", "Firebase", "SQL", "Redis"]
    },
    {
      category: "Tools & DevOps",
      icon: Zap,
      items: ["Git", "Docker", "AWS", "CI/CD", "GitHub Actions"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Glass Navigation */}
      <nav className="fixed w-full bg-white/40 backdrop-blur-xl border-b border-white/60 shadow-lg z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            {'<Dev />'}
          </div>
          
          <div className="hidden md:flex gap-8">
            <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="text-gray-700 hover:text-blue-600 transition-all hover:scale-105 font-medium cursor-pointer">Home</a>
            <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="text-gray-700 hover:text-blue-600 transition-all hover:scale-105 font-medium cursor-pointer">Projects</a>
            <a href="#skills" onClick={(e) => scrollToSection(e, 'skills')} className="text-gray-700 hover:text-blue-600 transition-all hover:scale-105 font-medium cursor-pointer">Skills</a>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="text-gray-700 hover:text-blue-600 transition-all hover:scale-105 font-medium cursor-pointer">Contact</a>
          </div>

          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white/30 backdrop-blur-xl border-t border-white/50">
            <div className="flex flex-col gap-4 p-4">
              <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer">Home</a>
              <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer">Projects</a>
              <a href="#skills" onClick={(e) => scrollToSection(e, 'skills')} className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer">Skills</a>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 relative">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50 animate-pulse">
              <Code2 size={64} className="text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-6 animate-fadeIn">
            Full Stack Developer
          </h1>
          <div id="about-section" className="max-w-4xl mx-auto bg-white/50 backdrop-blur-xl rounded-3xl p-8 border border-white/80 shadow-2xl mb-8 text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About Me</h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              A highly motivated Full Stack Developer with over 2+ year of hands-on experience in building and integrating
              dynamic, scalable, and user-friendly applications. Adept at both front-end and back-end development, I have
              expertise in technologies such as JavaScript, React, Node.js, and databases. I also specialize in seamlessly
              integrating AI-driven solutions into projects, enhancing functionality and user experiences. Passionate about
              exploring new technologies and pushing the boundaries of innovation, I am committed to delivering high-quality
              code and efficient, intuitive applications.
            </p>
            <div className="flex items-center gap-3">
              <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"></div>
              <p className="text-xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent font-bold">
                2+ Years of Experience
              </p>
            </div>
          </div>
          <button 
            onClick={startTour}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-4 rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-105 font-semibold text-lg"
          >
            Introduce Me
          </button>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div id="projects-heading">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4 text-center">Featured Projects</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto text-lg">
              Here are some of my recent projects showcasing my expertise in full-stack development
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-white/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/80 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/20 transition-all hover:scale-[1.02] group">
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-white/20 to-transparent backdrop-blur-[2px]"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition">{project.title}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="bg-blue-100/80 backdrop-blur-sm text-blue-700 px-3 py-1 rounded-full text-sm font-semibold border border-blue-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a href={project.link} className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105 font-semibold">
                    View Project <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4 text-center">Skills & Technologies</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto text-lg">
            Here's a comprehensive overview of my technical expertise
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, idx) => {
              const IconComponent = skill.icon;
              return (
                <div key={idx} className="bg-white/60 backdrop-blur-xl p-6 rounded-3xl border border-white/80 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/20 transition-all hover:scale-105 group">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 backdrop-blur-sm rounded-xl border border-blue-200 group-hover:border-blue-400 transition shadow-lg">
                      <IconComponent className="text-blue-600" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{skill.category}</h3>
                  </div>
                  <ul className="space-y-2">
                    {skill.items.map((item, i) => (
                      <li key={i} className="text-gray-700 flex items-center gap-2">
                        <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 relative">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-12 border border-white/80 shadow-2xl">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-6">Let's Connect</h2>
            <p className="text-gray-700 text-lg mb-12 leading-relaxed">
              I'm always open to new opportunities and interesting projects. Feel free to reach out!
            </p>
            
            <div className="flex justify-center gap-6 mb-12">
              <a href="https://github.com/NaaluZeroNaalu" className="p-4 bg-blue-100/80 backdrop-blur-sm text-blue-600 rounded-xl hover:bg-blue-200 hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:scale-110 border border-blue-200">
                <Github size={28} />
              </a>
              <a href="https://www.linkedin.com/in/ajithkumarr2000?" className="p-4 bg-blue-100/80 backdrop-blur-sm text-blue-600 rounded-xl hover:bg-blue-200 hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:scale-110 border border-blue-200">
                <Linkedin size={28} />
              </a>
              <a href="mailto:ajithruflex1210@gmail.com" className="p-4 bg-blue-100/80 backdrop-blur-sm text-blue-600 rounded-xl hover:bg-blue-200 hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:scale-110 border border-blue-200">
                <Mail size={28} />
              </a>
            </div>

            <a href="mailto:your.email@example.com" className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-4 rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-105 font-semibold text-lg">
              Send Me an Email
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/30 backdrop-blur-xl border-t border-white/60 text-gray-600 py-8 px-4 relative">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2024 Full Stack Developer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
