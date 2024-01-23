import { getMeetupById } from "@/lib/actions/meetup.actions";
import LargeMeetupCard from "@/components/meetup-components/LargeMeetupCard";

interface Params {
  id: string;
}

const Page = async ({ params }: { params: Params }) => {
  const meetupId = parseInt(params.id);
  const data = await getMeetupById(meetupId);
  if (!data) return;

  return (
    <main className="dynamic-pages-styles">
      <LargeMeetupCard meetupData={data} />
    </main>
  );
};

export default Page;
