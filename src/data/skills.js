/**
 * Skills data layer
 * Organized by category as defined in PRD v2.0
 * Categories: Frontend, Backend, ML/AI, Tools
 */

const skills = {
  Frontend: [
    'React',
    'React Native',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'HTML5',
    'CSS3',
    'Tailwind CSS',
    'Framer Motion',
  ],
  Backend: [
    'Node.js',
    'Express',
    'Python',
    'FastAPI',
    'REST APIs',
    'MongoDB',
    'PostgreSQL',
    'SQLite',
  ],
  'ML / AI': [
    'PyTorch',
    'TensorFlow',
    'scikit-learn',
    'Pandas',
    'NumPy',
    'NLP',
    'Computer Vision',
  ],
  Tools: [
    'Git',
    'GitHub',
    'Docker',
    'Vercel',
    'AWS',
    'Figma',
    'VS Code',
    'Linux',
  ],
};

/**
 * Get all skill categories with their skills
 * @returns {Object} { category: string[] }
 */
export const getAllSkills = () => skills;

/**
 * Get skills for a specific category
 * @param {string} category
 * @returns {string[]} Skills in that category
 */
export const getSkillsByCategory = (category) => skills[category] || [];

/**
 * Get category names
 * @returns {string[]} Category names
 */
export const getSkillCategories = () => Object.keys(skills);

export default skills;
