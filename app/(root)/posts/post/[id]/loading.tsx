import {
  MoreInformationItemSkeleton,
  PostMainContentSkeleton,
  ProfileSkeleton,
} from "@/components/Skeleton";

const Loading = () => {
  return (
    <main className="flex min-h-screen justify-center bg-light p-5 dark:bg-dark-3">
      <div className="mt-16 flex w-full max-w-[44rem] flex-col gap-5 lg:max-w-[85rem] lg:flex-row">
        <section className="flex w-full flex-col gap-5 lg:w-[20.3125rem]">
          <MoreInformationItemSkeleton />
          <MoreInformationItemSkeleton />
        </section>
        <section className="flex h-fit w-full">
          <PostMainContentSkeleton />
        </section>
        <section className="flex w-full flex-col gap-5 lg:w-[20.3125rem]">
          <ProfileSkeleton />
          <MoreInformationItemSkeleton />
        </section>
      </div>
    </main>
  );
};

export default Loading;
