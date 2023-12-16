export const ProjectsAnim = (activeProject: any) => {
  return {
    animate: {
      opacity: [0, 0.4, 0.8, 1],
    },
    whileInView: "true",
    transition: {
      delay: 0.3,
    },
  };
};
