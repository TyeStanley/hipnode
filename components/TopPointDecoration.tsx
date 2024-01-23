import { usePathname } from "next/navigation";

const TopPointDecoration = () => {
  const pathName = usePathname();
  const isGroupPage = pathName === "/group" ? "hidden" : "block";

  return (
    <div className={isGroupPage}>
      <div
        className={` bg-light_dark-4 absolute left-12 top-[-0.3rem] h-3 w-3 rotate-45 rounded-sm`}
      />
      <div className="bg-light_dark-4 absolute left-[3.27rem] top-[-0.45rem] h-[0.125rem] w-[0.2rem] rounded-t-full" />
      <div className="bg-light-2_dark-2 absolute left-[2.53rem] top-[-0.5rem] h-2 w-[0.75rem] rounded-b-full" />
      <div className="bg-light-2_dark-2 absolute left-[3.46rem] top-[-0.5rem] h-2 w-[0.75rem] rounded-b-full" />
    </div>
  );
};

export default TopPointDecoration;
