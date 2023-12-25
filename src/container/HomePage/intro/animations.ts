export const introAnimations = {
  imageAnim: {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      type: "tween",
      duration: 0.2,
    },
  },

  handEmoAnim: {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      type: "spring",
      stiffness: 125,
      delay: 0.4,
      duration: 0.7,
    },
  },

  titleAnim: {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    transition: {
      type: "spring",
      stiffness: 125,
      delay: 0.4,
      duration: 0.3,
    },
  },

  textWraAnim: {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    transition: {
      delay: 0.1,
    },
  },
};
