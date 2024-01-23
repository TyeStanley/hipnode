import { UserProfile, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

const Page = () => {
  return (
    <main
      className="mt-[-5rem] flex h-full w-full justify-center
    bg-light-2 p-4 pt-[5.5rem] dark:bg-dark-3"
    >
      <div className="flex w-full justify-center overflow-scroll pb-20">
        <section className="flex h-fit w-fit flex-col gap-2">
          <div className="flex self-end">
            <Link href="/sign-in">
              <SignOutButton>
                <p className="hover:semibold-16 cursor-pointer text-red-60 hover:text-red-80">
                  Sign Out
                </p>
              </SignOutButton>
            </Link>
          </div>
          <UserProfile
            path="/settings"
            appearance={{
              elements: {
                breadcrumbsItem: "dark:text-white",
                breadcrumbsItemDivider: "dark:text-white",
                avatarImageActionsUpload: "text-red-60",
                formButtonPrimary: "bg-red-60 dark:bg-red-80",
                formButtonReset: "text-red-60",
                formFieldLabel: "dark:text-white",
                formFieldInput: "dark:bg-dark-4 dark:text-light-2",
                userProfile: "flex h-fit",
                rootbox: "m-0 p-0 flex h-fit",
                headerTitle: "text-xl dark:text-light",
                headerSubtitle: "text-sm dark:text-light-2",
                navbarButton: "dark:text-light",
                pageScrollBox: "p-4 h-fit",
                navbar: "hidden",
                scrollBox: "h-fit overflow-scroll",
                profilePage: "gap-0",
                profileSection: "gap-0",
                card: "h-fit m-0 bg-white dark:bg-dark-2 shadow",
                page: "gap-3",
                profileSectionTitle: "h-7",
                profileSectionTitleText: "text-sm self-center dark:text-light",
                profileSectionPrimaryButton: "h-7 px-2",
                accordionTriggerButton: "h-7 px-2 outline-0 focus-none ring-0",
                accordionContent: "p-2",
                profileSectionContent: "left-0 dark:text-white",
                navbarMobileMenuButton:
                  "dark:text-white bg-light-2 dark:bg-dark-3",
                providerIcon: "dark:invert",
                formFieldInputShowPasswordIcon: "dark:invert",
              },
              variables: {
                colorPrimary: "#FF6934",
              },
            }}
          />
        </section>
      </div>
    </main>
  );
};

export default Page;
