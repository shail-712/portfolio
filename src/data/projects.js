/**
 * Projects data layer
 * Schema defined in PRD v2.0
 * Each project follows: { id, title, description, techStack, githubLink, liveLink, image, category, featured }
 */

const projects = [
  {
    id: 'investment-research-assistant',
    title: 'Investment Research Assistant',
    description:
      'AI-powered research assistant that aggregates financial data, analyzes market trends, and generates investment insights using ML models and NLP.',
    techStack: ['Python', 'FastAPI', 'AWS Lambda', 'React', 'TensorFlow'],
    githubLink: 'https://github.com/shail-712/investment-research-assistant',
    liveLink: null,
    image: null,
    category: 'ML',
    featured: true,
  },
  {
    id: 'ai-truth-weaver',
    title: 'AI Truth Weaver',
    description:
      'A fact-checking platform that uses NLP and knowledge graphs to verify claims against trusted sources, providing transparency scores and evidence chains.',
    techStack: ['Python', 'PyTorch', 'Neo4j', 'FastAPI', 'React'],
    githubLink: 'https://github.com/shail-712/ai-truth-weaver',
    liveLink: null,
    image: null,
    category: 'ML',
    featured: true,
  },
  {
    id: 'echonote-ai',
    title: 'EchoNote AI',
    description:
      'A React Native mobile app that converts voice recordings into structured summaries using speech-to-text and AI summarization, with organized note management.',
    techStack: ['React Native', 'Expo', 'Redux Toolkit', 'Node.js'],
    githubLink: 'https://github.com/shail-712/echonote-ai',
    liveLink: null,
    image: null,
    category: 'Web',
    featured: true,
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    description:
      'This very portfolio — a modern, recruiter-focused site built with React + Vite, featuring dark mode, project filtering, and EmailJS contact integration.',
    techStack: ['React', 'Vite', 'Framer Motion', 'EmailJS'],
    githubLink: 'https://github.com/shail-712/portfolio',
    liveLink: null,
    image: null,
    category: 'Web',
    featured: false,
  },
  {
    id: 'captcha-system',
    title: 'Audio Captcha System',
    description:
      'A custom CAPTCHA implementation featuring audio-based verification, built with Node.js for enhanced accessibility and bot prevention.',
    techStack: ['Node.js', 'Express', 'JavaScript', 'Web Audio API'],
    githubLink: 'https://github.com/shail-712/captcha-system',
    liveLink: null,
    image: null,
    category: 'Web',
    featured: false,
  },
];

/**
 * Get all projects
 * @returns {Array} All projects
 */
export const getAllProjects = () => projects;

/**
 * Get projects filtered by category
 * @param {string} category - 'All' | 'Web' | 'ML' | 'Other'
 * @returns {Array} Filtered projects
 */
export const getProjectsByCategory = (category) => {
  if (category === 'All') return projects;
  return projects.filter((p) => p.category === category);
};

/**
 * Get featured projects (for Home page)
 * @returns {Array} Featured projects only
 */
export const getFeaturedProjects = () =>
  projects.filter((p) => p.featured);

/**
 * Get a single project by its ID
 * @param {string} id - Project slug
 * @returns {Object|undefined} The project or undefined
 */
export const getProjectById = (id) =>
  projects.find((p) => p.id === id);

/**
 * Get all unique categories
 * @returns {string[]} ['All', ...unique categories]
 */
export const getCategories = () => {
  const cats = [...new Set(projects.map((p) => p.category))];
  return ['All', ...cats];
};

export default projects;
