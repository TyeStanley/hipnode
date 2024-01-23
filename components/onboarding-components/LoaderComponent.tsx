const LoaderComponent = ({
  isGlobalSearch = false,
}: {
  isGlobalSearch?: boolean;
}) => {
  const dimensions = isGlobalSearch ? "h-10 w-10" : "h-20 w-20";
  return (
    <div
      className={`${dimensions} animate-spin rounded-full border-4 border-light-2 border-r-red-80 duration-75 dark:border-dark-4 dark:border-r-red-80`}
    />
  );
};

export default LoaderComponent;
