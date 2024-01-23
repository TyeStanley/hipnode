import { LargeInterviewCard } from "@/components/interview-components";
import {
  getInterviewById,
  getTagsByInterviewId,
} from "@/lib/actions/interview.actions";

interface Params {
  id: string;
}

const Page = async ({ params }: { params: Params }) => {
  const interviewId = parseInt(params.id);
  const data = await getInterviewById(interviewId);
  if (!data) return;

  const tags = await getTagsByInterviewId(interviewId);
  const tagNames = tags.map((tag) => tag.name);

  return (
    <main className="dynamic-pages-styles">
      <LargeInterviewCard interviewData={data} tags={tagNames} />
    </main>
  );
};

export default Page;
