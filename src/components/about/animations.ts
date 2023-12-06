export const aboutAnimations = {
  wrapperAnim: {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.175 },
  },
};

export const pAnim = ({ delay }: { delay: number }) => {
  return {
    initial: { opacity: 0, y: 800 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: delay },
  };
};
