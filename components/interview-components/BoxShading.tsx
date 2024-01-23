const BoxShading = () => {
  return (
    <>
      <div className="absolute hidden h-6 w-full bg-gradient-to-t from-transparent to-light-2 dark:to-dark-2 lg:flex" />
      <div className="absolute bottom-0 hidden h-6 w-full bg-gradient-to-t from-light-2 to-transparent dark:from-dark-2 lg:flex" />
    </>
  );
};

export default BoxShading;
