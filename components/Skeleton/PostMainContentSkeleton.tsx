const PostMainContentSkeleton = () => (
  <section className="flex w-full flex-col items-center justify-center rounded-2xl bg-light dark:bg-dark-3">
    <div className="mb-[2rem] mt-[1.25rem] h-[8rem] w-[90%] animate-pulse rounded-t-2xl bg-gray-200 dark:bg-gray-700" />
    <div className="mb-[2rem] h-6 w-3/4 animate-pulse rounded-sm bg-gray-200 pb-[0.875rem] pl-[4.8rem] dark:bg-gray-700" />
    <div className="h-[6rem] w-3/4 animate-pulse rounded-sm bg-gray-200 pb-[1.875rem] pl-[4.8rem] dark:bg-gray-700" />
    <div className="flex w-full flex-row items-center justify-between p-[1.25rem]">
      <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200 px-[1.25rem] dark:bg-gray-700" />
      <div className=" mx-[1.25rem] flex h-10 w-full grow animate-pulse rounded-2xl bg-gray-200 pb-[0.875rem] dark:bg-gray-700 " />
    </div>
  </section>
);

export default PostMainContentSkeleton;
