import {
  getTopFiveTags,
  getFilteredInterviews,
} from "@/lib/actions/interview.actions";
import FormLink from "@/components/FormLink";
import Podcasts from "@/components/home-page/podcast/Podcasts";
import { getAllPodcastsWithUserInfo } from "@/lib/actions/podcast.actions";
import InterviewFilterAndContentWrapper from "@/components/interview-components/InterviewFilterAndContentWrapper";
import { interviewFormLinkProps } from "@/constants/interview";

interface SearchProps {
  interview: string[];
}

const Interviews = async ({ searchParams }: { searchParams: SearchProps }) => {
  const tags = await getTopFiveTags();

  let interviewArray;

  if (searchParams.interview) {
    const interviews = Array.isArray(searchParams.interview)
      ? searchParams.interview
      : [searchParams.interview];
    interviewArray = interviews.map(Number);
  }

  const podcasts = await getAllPodcastsWithUserInfo();
  const interviewData = await getFilteredInterviews({
    tagIds: interviewArray,
  });

  return (
    <main className="general-pages-styles pt-[2rem] lg:pt-[1.875rem]">
      <div className="mt-16 flex max-w-[85rem] flex-col gap-5 lg:sticky lg:flex-row lg:overflow-hidden xl:w-full">
        <InterviewFilterAndContentWrapper
          tags={tags}
          interviewData={interviewData}
          interviewArray={interviewArray}
        />
        <section className="flex w-full lg:max-w-[20.3125rem]">
          <div className="flex w-full flex-col gap-5 overflow-scroll">
            <FormLink {...interviewFormLinkProps} className="hidden lg:flex" />
            <Podcasts podcasts={podcasts} />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Interviews;
