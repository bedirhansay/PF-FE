export const ParentAnim = (index: number) => {
  return {
    animate: {
      opacity: [0, 1],
      transition: {
        delay: index / 5,
      },
    },
  };
};
