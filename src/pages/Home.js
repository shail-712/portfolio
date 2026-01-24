import React from 'react';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <motion.div
            className="page-container"
            initial={{ opacity: 0, y: 20 }} // Start invisible and slightly lower
            animate={{ opacity: 1, y: 0 }}  // Fade in and slide up
            exit={{ opacity: 0, y: -20 }}   // Slide up and fade out on exit
            transition={{ duration: 0.5 }}
        >
            <h1 className="glitch-text">DEV / ANALYST</h1>
            <p className="subtitle">BUILDING SYSTEMS FOR THE BEAUTIFUL GAME</p>

            <motion.button
                className="cta-button"
                whileHover={{ scale: 1.1, textShadow: "0px 0px 8px rgb(0, 255, 204)" }}
                whileTap={{ scale: 0.9 }}
            >
                VIEW TACTICS (PROJECTS)
            </motion.button>
        </motion.div>
    );
};

export default Home;