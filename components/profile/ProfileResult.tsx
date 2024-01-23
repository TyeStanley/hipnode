import { ExtendedPrismaPost } from "@/types/posts";
import { ProfileResultType } from "@/types/profile.index";
import { PostCardList } from "../home-page/post-card";
import MeetupsList from "./MeetupsList";
import PodcastsList from "./PodcastsList";
import InterviewsList from "./InterviewsList";
import HistoryList from "./HistoryList";
import {
  ProfileHistoryResponse,
  ProfileInterviewsResponse,
  ProfileMeetupResponse,
  ProfilePodcastResponse,
} from "@/lib/actions/profile.actions";

const ProfileResult = ({
  result,
  isEmpty,
  paramId,
  searchParam,
  authorId,
}: ProfileResultType) => {
  if (isEmpty)
    <div className="flex justify-center text-base text-sc-1 dark:text-light md:text-lg">
      No {searchParam}
    </div>;

  if (searchParam === "posts" && Array.isArray(result) && result.length !== 0)
    <PostCardList posts={result as ExtendedPrismaPost[]} authorId={authorId} />;

  if (searchParam === "meetups" && "data" in result && result.data.length !== 0)
    <MeetupsList
      data={result as ProfileMeetupResponse}
      authorId={paramId}
      resultType={searchParam}
    />;

  if (
    searchParam === "podcasts" &&
    "data" in result &&
    result.data.length !== 0
  )
    <PodcastsList
      data={result as ProfilePodcastResponse}
      authorId={paramId}
      resultType={searchParam}
    />;

  if (
    searchParam === "interviews" &&
    "data" in result &&
    result.data.length !== 0
  )
    <div className="relative flex w-full flex-1 overflow-auto">
      <InterviewsList
        data={result as ProfileInterviewsResponse}
        authorId={paramId}
        resultType={searchParam}
      />
    </div>;

  if (searchParam === "history" && "data" in result && result.data.length !== 0)
    <HistoryList data={result as ProfileHistoryResponse} authorId={paramId} />;

  return null;
};

export default ProfileResult;
