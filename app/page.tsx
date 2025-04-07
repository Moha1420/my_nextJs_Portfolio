'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaArrowRight } from 'react-icons/fa';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  url: string;
  github?: string;
}

interface Skill {
  name: string;
  level: number;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-featured e-commerce solution with payment integration.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    tags: ["React", "Node.js", "MongoDB"],
    url: "https://example.com/ecommerce",
    github: "https://github.com/username/ecommerce"
  },
  {
    id: 2,
    title: "Healthcare Management",
    description: "Solution for managing patient records and appointments.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    tags: ["TypeScript", "Next.js", "PostgreSQL"],
    url: "https://example.com/healthcare"
  },
  {
    id: 3,
    title: "AI Content Generator",
    description: "ML application for generating marketing copy.",
    image: "https://images.unsplash.com/photo-1677442135136-760c813170d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    tags: ["Python", "TensorFlow", "React"],
    url: "https://example.com/ai-content",
    github: "https://github.com/username/ai-content"
  }
];

const SKILLS: Skill[] = [
  { name: "Frontend Development", level: 95 },
  { name: "Backend Development", level: 85 },
  { name: "UI/UX Design", level: 80 },
  { name: "DevOps & Deployment", level: 75 },
];

const SECTIONS = ["home", "projects", "about", "contact"];

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const handleScroll = () => {
      let current = "";
      
      for (const section of SECTIONS) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 200) {
          current = section;
        }
      }
      
      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, isMounted]);

  if (!isMounted) {
    return null; 
  }

  const NavLink = ({ name, isActive }: { name: string, isActive: boolean }) => (
    <a
      href={`#${name.toLowerCase()}`}
      onClick={() => setIsMenuOpen(false)}
      className={`relative font-bold text-lg transition-colors duration-300 hover:text-blue-600 dark:hover:text-blue-400 ${
        isActive ? "text-blue-600 dark:text-blue-400" : ""
      }`}
      style={{
        textShadow: isActive ? "0 0 8px rgba(96, 165, 250, 0.5)" : "none",
      }}
    >
      {name}
      {isActive && (
        <motion.span 
          layoutId="activeSection"
          className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-violet-600 to-indigo-600"
        />
      )}
    </a>
  );

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 text-gray-800 dark:text-gray-200">
      <header className="fixed w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#home" className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform">
            John Doe
          </a>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-blue-600 dark:text-blue-400"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
          
          <nav className="hidden md:flex space-x-10">
            {SECTIONS.map((section) => {
              const displayName = section.charAt(0).toUpperCase() + section.slice(1);
              return (
                <NavLink 
                  key={section} 
                  name={displayName} 
                  isActive={activeSection === section} 
                />
              );
            })}
          </nav>
        </div>
        
        <motion.nav 
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-white dark:bg-gray-900 shadow-lg"
        >
          <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            {SECTIONS.map((section) => {
              const displayName = section.charAt(0).toUpperCase() + section.slice(1);
              return (
                <NavLink 
                  key={section} 
                  name={displayName} 
                  isActive={activeSection === section} 
                />
              );
            })}
          </div>
        </motion.nav>
      </header>

      <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 right-20 w-80 h-80 bg-indigo-400/30 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-40 left-10 w-64 h-64 bg-violet-400/20 rounded-full filter blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block p-1 px-4 mb-6 border border-indigo-500 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium">
              Available for Freelance Projects
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Hi, I'm <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">John Doe</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-gray-600 dark:text-gray-400 leading-relaxed">
              Full-Stack Developer creating beautiful, functional web applications
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.a 
                href="#contact" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg shadow-lg hover:shadow-violet-500/30 transition-all duration-300 flex items-center justify-center font-medium"
              >
                <span>Get in Touch</span>
                <FaArrowRight className="ml-2" />
              </motion.a>
              <motion.a 
                href="#projects" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50 transition-all duration-300 font-medium"
              >
                <span>View My Work</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="projects" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <SectionHeader title="Featured Projects" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROJECTS.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="flex space-x-2">
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-white rounded-full text-gray-900 hover:bg-blue-500 hover:text-white transition-colors duration-300"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                      </a>
                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 bg-white rounded-full text-gray-900 hover:bg-gray-800 hover:text-white transition-colors duration-300"
                        >
                          <FaGithub size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200 text-xs rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/30 dark:bg-blue-700/10 rounded-full filter blur-3xl"></div>
        <div className="container mx-auto px-6 relative">
          <SectionHeader title="About Me" />
          
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-1/3 mb-10 lg:mb-0 lg:pr-10"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl blur opacity-30 animate-pulse"></div>
                <img 
                  src="https://randomuser.me/api/portraits/men/41.jpg" 
                  alt="John Doe" 
                  className="relative rounded-xl w-64 h-64 mx-auto lg:mx-0 object-cover shadow-xl z-10"
                />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-2/3"
            >
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                With over 8 years of experience in web development, I've helped businesses bring their digital visions to life. My approach combines technical expertise with creative problem-solving to deliver exceptional user experiences.
              </p>
              
              <h3 className="text-2xl font-bold mb-4">My Skills</h3>
              <div className="space-y-4 mb-6">
                {SKILLS.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-gray-500 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        className="h-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-white dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-200/30 dark:bg-purple-700/10 rounded-full filter blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative">
          <SectionHeader title="Get In Touch" />
          
          <div className="flex flex-col lg:flex-row bg-gray-50 dark:bg-gray-700 rounded-2xl shadow-xl overflow-hidden">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-2/5 bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-8"
            >
              <h3 className="text-2xl font-bold mb-6">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaEnvelope className="mr-3" size={18} />
                  <a href="mailto:johndoe@example.com" className="hover:text-blue-200 transition-colors">johndoe@example.com</a>
                </div>
                <div className="flex items-center">
                  <FaPhone className="mr-3" size={18} />
                  <a href="tel:+15551234567" className="hover:text-blue-200 transition-colors">+1 (555) 123-4567</a>
                </div>
                <div className="flex items-center">
                  <FaLinkedin className="mr-3" size={18} />
                  <a href="https://linkedin.com/in/johndoe" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors">linkedin.com/in/johndoe</a>
                </div>
                <div className="flex items-center">
                  <FaGithub className="mr-3" size={18} />
                  <a href="https://github.com/johndoe" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors">github.com/johndoe</a>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:w-3/5 p-8"
            >
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium">Message</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-600"
                    required
                  ></textarea>
                </div>
                <motion.button 
                  type="submit" 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-blue-400">John Doe</h2>
              <p className="text-gray-400">Full-Stack Developer</p>
            </div>
            <div className="flex space-x-4">
              <a href="https://github.com/johndoe" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-blue-400 hover:scale-110 transition-all">
                <FaGithub size={20} />
              </a>
              <a href="https://linkedin.com/in/johndoe" target="_blank" rel="noopener noreferrer" className="p-2 hover:text-blue-400 hover:scale-110 transition-all">
                <FaLinkedin size={20} />
              </a>
              <a href="mailto:johndoe@example.com" className="p-2 hover:text-blue-400 hover:scale-110 transition-all">
                <FaEnvelope size={20} />
              </a>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} John Doe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
const SectionHeader = ({ title }: { title: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-center mb-16"
  >
    <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{title}</h2>
    <div className="w-24 h-1 bg-gradient-to-r from-violet-600 to-indigo-600 mx-auto"></div>
  </motion.div>
);