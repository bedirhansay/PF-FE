export const ProjectsAnim = (activeProject: any) => {
  return {
    animate: {
      opacity: [0, 0.4, 0.8, 1],
      scale: [0.8, 1.2, 1],
    },

    transition: {
      delay: 0.3,
      ease: "easeInOut",
      duration: 0.5,
    },
  };
};
