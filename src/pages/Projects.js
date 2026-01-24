import React from 'react';
import { motion } from 'framer-motion';

const projects = [
    { id: 1, title: "INFLUENCER MARKETPLACE", role: "MERN STACK", status: "COMPLETED" },
    { id: 2, title: "FLOOD ALERT SYSTEM", role: "REACT / UI", status: "IN PROGRESS" },
    { id: 3, title: "SUBSCRIPTION TRACKER", role: "FLUTTER", status: "PROTOTYPING" },
];

const Projects = () => {
    return (
        <motion.div
            className="page-container"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
        >
            <h2>MATCH HISTORY (PROJECTS)</h2>

            <div className="project-grid">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        className="project-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }} // Staggered animation
                        whileHover={{ scale: 1.05, borderColor: '#00ffcc' }}
                    >
                        <h3>{project.title}</h3>
                        <div className="tech-stack">{project.role}</div>
                        <span className="status-badge">{project.status}</span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Projects;