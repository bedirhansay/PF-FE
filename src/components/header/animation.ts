export const HeaderAnimations = {
  headerAnimation: {
    initial: {
      y: -100,
      opacity: 0,
      x: "-50%",
    },
    animate: {
      y: 0,
      x: "-50%",
      opacity: 1,
    },
  },

  liAnimation: {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    whileInView: "animate",
    viewport: {
      once: true,
    },
  },

  variant: {
    open: {
      opacity: [0.2, 0.5, 1],
    },
    closed: {
      opacity: [0.0, 0.5, 1],
    },
  },

  fadeInAnimationVariants: {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.09 * index,
        type: "spring",
        stiffness: 380,
        damping: 40,
        restDelta: 2,
      },
    }),
  },

  maskAnim: {
    transition: {
      type: "spring",
      stiffness: 380,
      damping: 40,
      restDelta: 2,
    },
  },

  buttonAnim: {},
};
