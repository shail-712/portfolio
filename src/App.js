import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Import Components
import BackgroundWrapper from './components/BackgroundWrapper';
import Home from './pages/Home';
import Projects from './pages/Projects';
import About from './pages/About';

// Create a simple Navbar
const Navbar = () => (
    <nav className="navbar">
        <div className="nav-logo">DEV_FC</div>
        <div className="nav-links">
            <Link to="/">HOME</Link>
            <Link to="/projects">PROJECTS</Link>
            <Link to="/about">STATS</Link> {/* "Stats" fits the football theme better than "About" */}
        </div>
    </nav>
);

// We need a separate component for Routes to use 'useLocation' for animations
const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </AnimatePresence>
    );
};

function App() {
    return (
        <Router>
            <BackgroundWrapper>
                <Navbar />
                <AnimatedRoutes />
            </BackgroundWrapper>
        </Router>
    );
}

export default App;