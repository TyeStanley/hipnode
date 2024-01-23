import { SignIn } from "@clerk/nextjs";

import HipnodeHeaderLogo from "@/components/icons/HipnodeHeaderLogo";
import OnboardingSideScreen from "@/components/onboarding-components/OnboardingSideScreen";

export default function Page() {
  return (
    <main className="sign-up-background">
      <OnboardingSideScreen />
      <section className="clerk-modal-background bg-white">
        <div className="clerk-modal-container">
          <SignIn
            afterSignInUrl="/"
            appearance={{
              elements: {
                rootBox: "w-full flex h-fit",
                footerAction: "flex items-center",
                formButtonPrimary: "bg-red-60 hover:bg-red-80",
                footerActionLink:
                  "text-sm sm:text-base text-red-60 hover:text-red-80",
                footerActionText: "text-xs sm:text-sm dark:text-light",
                dividerRow: "hidden",
                socialButtonsBlockButtonText: "hidden",
                socialButtonsBlockButtonArrow: "hidden",
                socialButtonsBlockButton:
                  "p-4 h-10 w-10 sm:h-14 sm:w-14 flex justify-center dark:border-dark-4",
                card: "pt-[4.5rem] w-full sm:pt-24 dark:bg-dark-2 w-fit mx-8 px-6 gap-3.5 sm:gap-4",
                form: "gap-3 sm:gap-4",
                formHeaderTitle: "dark:text-white",
                formHeaderSubtitle: "dark:text-white",
                identityPreviewEditButton: "grayscale-[100%] dark:invert",
                main: "gap-6 sm:gap-8",
                headerTitle: "text-sm sm:text-xl dark:text-light",
                headerSubtitle: "text-xs sm:text-base dark:text-sc-5",
                socialButtonsProviderIcon:
                  "h-3.5 sm:h-5 w-3.5 sm:w-5 dark:invert",
                formFieldInput:
                  "h-7 sm:h-9 dark:bg-dark-3 focus:ring-0 dark:text-white focus:border-sc-4",
                formFieldLabel: "text-xs sm:text-sm dark:text-light",
                formFieldHintText: "text-xs sm:text-sm dark:text-white",
                formFieldWarningText: "dark:text-white",
                formFieldSuccessText: "dark:text-white",
                formFieldInputShowPasswordIcon: "dark:fill-white",
                identityPreviewText: "dark:text-white",
                formResendCodeLink: "text-red-80",
                otpCodeFieldInput: "dark:border-red-80 dark:text-red-80",
                formFieldAction: "text-red-60 hover:text-red-80",
              },
            }}
          />
          <div className="clerk-modal-logo">
            <HipnodeHeaderLogo clerkForm />
          </div>
        </div>
      </section>
    </main>
  );
}
