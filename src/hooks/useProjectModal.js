import { useState, useCallback } from 'react';

/**
 * useProjectModal Hook
 * 
 * Manages the open/close state and selected project for
 * the project detail modal.
 * 
 * Usage:
 *   const { isOpen, selectedProject, openModal, closeModal } = useProjectModal();
 */

export function useProjectModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = useCallback((project) => {
    setSelectedProject(project);
    setIsOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Restore body scroll
    document.body.style.overflow = '';
    // Delay clearing project data for exit animation
    setTimeout(() => setSelectedProject(null), 300);
  }, []);

  return {
    isOpen,
    selectedProject,
    openModal,
    closeModal,
  };
}

export default useProjectModal;
