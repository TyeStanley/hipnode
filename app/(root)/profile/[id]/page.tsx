import Performance from "@/components/profile/Performance";
import ProfileFilter from "@/components/profile/ProfileFilter";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfileResult from "@/components/profile/ProfileResult";
import FormLink from "@/components/FormLink";
import NotFound from "@/components/NotFound";
import {
  getPerformanceData,
  getProfileData,
  getProfileHistory,
  getProfileInterviews,
  getProfileMeetups,
  getProfilePodcasts,
} from "@/lib/actions/profile.actions";
import {
  getAllPostsByUserId,
  isFollowingUser,
} from "@/lib/actions/post.action";
import { interviewFormLinkProps } from "@/constants/interview";
import { ResultType } from "@/types/profile.index";

export const dynamic = "force-dynamic";

const ProfilePage = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { search: string };
}) => {
  const user = await getProfileData(params.id);

  if (!user?.username) {
    return <NotFound isProfilePage />;
  }

  let result: ResultType = [];

  switch (searchParams.search) {
    case "posts":
      result = await getAllPostsByUserId({
        numberToSkip: 0,
        authorId: params.id,
      });
      break;
    case "meetups":
      result = await getProfileMeetups(params.id);
      break;
    case "podcasts":
      result = await getProfilePodcasts(params.id);
      break;
    case "interviews":
      result = await getProfileInterviews(params.id);
      break;
    case "history":
      result = await getProfileHistory(params.id);
      break;
    default:
      break;
  }

  const performanceData = await getPerformanceData(params.id);

  const isFollowing = await isFollowingUser(user.id);

  if (!result) return;

  const isEmpty = Array.isArray(result)
    ? result.length === 0
    : !result.data || result.data.length === 0;

  const extendedUser = {
    ...user,
    isFollowing,
  };

  return (
    <div className="mx-auto mt-[-5rem] flex min-h-screen w-full flex-col justify-center gap-5 bg-light-2 p-5 pb-20 pt-[6.25rem] dark:bg-dark-2 md:sticky md:h-screen md:flex-row md:overflow-hidden md:pb-0 lg:max-w-[90rem] lg:px-10">
      <section>
        <ProfileInfo user={extendedUser} />
      </section>

      <section className="flex flex-1 flex-col gap-5">
        <ProfileFilter />

        <ProfileResult
          result={result}
          isEmpty={isEmpty}
          paramId={params.id}
          searchParam={searchParams?.search}
          authorId={user.id}
        />
      </section>

      <section className="hidden w-[20.3125rem] shrink-0 flex-col gap-5 xl:flex">
        <FormLink {...interviewFormLinkProps} className="hidden lg:flex" />
        <Performance data={performanceData} />
      </section>
    </div>
  );
};

export default ProfilePage;
