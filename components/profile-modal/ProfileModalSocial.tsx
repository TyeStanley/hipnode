import OutlineIcons from "@/components/icons/outline-icons";
import Link from "next/link";

const ProfileModalSocial = () => (
  <aside>
    <div className="flex flex-row items-center justify-center px-[1.25rem] pb-[1.25rem]">
      <div className="flex ">
        <div className="mr-[0.625rem]">
          <OutlineIcons.Web className="h-[0.875rem] w-[0.875rem] fill-sc-2 dark:fill-light-3" />
        </div>
        <address
          className="pr-[0.625rem] text-[0.875rem] font-semibold leading-[1.375rem] text-sc-2 dark:text-sc-6"
          style={{ display: "inline", fontStyle: "normal" }}
        >
          <Link
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
            href="http://www.uikit.to"
            passHref
          >
            www.uikit.to
          </Link>
        </address>
      </div>
      <nav className="flex gap-2.5">
        <OutlineIcons.Twitter className="fill-sc-4 dark:fill-light-3" />
        <OutlineIcons.Facebook className="fill-sc-4 dark:fill-light-3" />
        <OutlineIcons.Instagram className="fill-sc-4 dark:fill-light-3" />
      </nav>
    </div>
    <hr className="mx-auto h-[0.063rem] w-[10.625rem] bg-sc-6 dark:bg-sc-3" />
    <div className="pb-[1.875rem] pt-[1.25rem] text-[0.875rem] font-semibold leading-[1.375rem] text-sc-3 dark:text-sc-6 ">
      <p className="text-center">joined 2 years ago</p>
    </div>
  </aside>
);

export default ProfileModalSocial;
