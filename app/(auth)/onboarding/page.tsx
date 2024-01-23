import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import {
  OnboardingSideScreen,
  Questionnaire,
} from "@/components/onboarding-components";
import { onboardingSideScreenInfo } from "@/constants";
import { isLoggedInUserOnboarded } from "@/lib/actions/user.actions";

const Page = async () => {
  let user = await currentUser();

  let attempts = 0;
  while (!user && attempts < 5) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    user = await currentUser();
    attempts++;
  }

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
