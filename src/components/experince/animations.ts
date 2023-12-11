export const experinceAnimations = (index: number) => {
  return {
    animate: {
      opacity: [0, 1],
    },
    transition: {
      delay: index,
    },
    viewport: {
      once: true,
    },
  };
};
