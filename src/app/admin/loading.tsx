const loading = () => {
  return (
    <div className="fixed left-[50%] w-full top-[50%] z-50 grid max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 bg-background p-6  duration-400 animate-grow-and-fade">
      Loading...
    </div>
  );
};

export default loading;
