import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import {
  OnboardingSideScreen,
  Questionnaire,
} from "@/components/onboarding-components";
import { onboardingSideScreenInfo } from "@/constants";
import { isLoggedInUserOnboarded } from "@/lib/actions/user.actions";

const Page = async () => {
  const user = await currentUser();

  if (!user || (await isLoggedInUserOnboarded(user.id))) {
    redirect("/");
  }

  return (
    <main className="onboarding-page">
      <OnboardingSideScreen info={onboardingSideScreenInfo} />
      <Questionnaire />
    </main>
  );
};

export default Page;
