export const fadeInAnimationVariants = (index: number) => {
  return {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 * index,
      },
    },
  };
};

export const skillsAnim = (index: number) => {
  return {
    initial: "initial",
    whileInView: "animate",
    viewport: {
      once: true,
    },
    custom: index,
  };
};
