const TextDescription = ({ children, className, ...props }: any) => (
  <p
    className={`text-[0.875rem] font-semibold leading-[1.375rem] text-sc-2 dark:text-sc-6 ${className}`}
    {...props}
  >
    {children}
  </p>
);

export default TextDescription;
